import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class RootController {
  @Get()
  async root(@Req() req: Request) {
    const url = `${req.protocol}://${req.get('Host')}`;

    return {
      health: `${url}/health`,
      memo: `${url}/memo`,
      memo_append: `${url}/memo/:id/append`,
    };
  }
}
