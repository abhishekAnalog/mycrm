import { Injectable } from '@nestjs/common';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class MetaService {
  constructor(private readonly leadsService: LeadsService) {}

  async processLeadgenData(leadgenData: any): Promise<void> {
    const lead = {
      name: leadgenData.field_data.find((field) => field.name === 'name')
        .values[0],
      email: leadgenData.field_data.find((field) => field.name === 'email')
        .values[0],
      phone: leadgenData.field_data.find((field) => field.name === 'phone')
        .values[0],
      source: 'Facebook Lead Ads',
    };
    await this.leadsService.create(lead);
  }
}
