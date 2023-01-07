import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { HttpConfigService } from './http-config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
