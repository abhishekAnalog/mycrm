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
    if (verifyToken === process.env.META_VERIFY_TOKEN) {
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
}
