import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './schemas/campaign.schema';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() campaign: Partial<Campaign>): Promise<Campaign> {
    return this.campaignsService.create(campaign);
  }

  @Get('mulitest')
  async multiple(): Promise<void> {
    let campaign = {};
    for (let i = 0; i < 1000; i++) {
      campaign = {
        name: `Test${i}`,
        status: 'Closed Won',
        objective: `create objective${i}`,
        source: 'facebook',
        budget: i,
        spend: i * 10,
      };
      this.campaignsService.create(campaign);
    }
  }
  @Get()
  findAll(): Promise<Campaign[]> {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Campaign> {
    return this.campaignsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() campaign: Partial<Campaign>,
  ): Promise<Campaign> {
    return this.campaignsService.update(id, campaign);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.campaignsService.remove(id);
  }

  @Get(':id/performance')
  getPerformance(@Param('id') id: string): Promise<any> {
    return this.campaignsService.getCampaignPerformance(id);
  }
}
