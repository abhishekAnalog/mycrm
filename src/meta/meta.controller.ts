import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MetaService } from './meta.service';

@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('webhook')
  verifyWebhook(
    @Query('verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
  ) {
    console.log('verifyToken', verifyToken);
    if (
      verifyToken ===
      'EAAXzG49u7ZC0BO87DELqEr6WrOZAOLSPtuV1NViRb4pe7XlUbQAs1YuziZBOY4FKZBGx4CS6n9WjQwIIIfnvGHxK7wB5CW9EbLY8Bh8Miz47cKTqRJt9I5zZChJ6qnS2QaAfYAoroQ2lzw5l8XDbcPurfLquU8iIPr8dtBCSmOeUthGrE41I12xRupgR0Qopyvg7BCcdXCcdSCGO7VdbsQN5YPGNTV8m71nYb7hkZD'
    ) {
      return challenge;
    } else {
      return 'Verification token mismatch';
    }
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    const leadgenData = body.entry[0].changes[0].value;
    await this.metaService.processLeadgenData(leadgenData);
    return 'EVENT_RECEIVED';
  }

  @Post('event')
  async sendEvent(@Body() event: any) {
    return this.metaService.sendEvent(event);
  }
}
