import { Controller, Get, Req } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Request } from 'express';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async check(@Req() req: Request) {
    const url = `${req.protocol}://${req.get('Host')}`;

    return this.health.check([
      async () => this.http.pingCheck('service', url),
      async () => this.db.pingCheck('database'),
      // The used disk storage should not exceed 50% of the full disk size
      async () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      // The used disk storage should not exceed 200 GB
      async () => this.disk.checkStorage('disk health', { threshold: 200 * 1024 * 1024 * 1024, path: '/' }),
      // The process should not use more than 150MB memory
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      // The process should not have more than 150MB allocated
      async () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
