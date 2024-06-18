import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Lead } from './schemas/lead.schema';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() lead: Partial<Lead>): Promise<Lead> {
    return this.leadsService.create(lead);
  }

  // @Get('mulitest')
  // async multiple(): Promise<void> {
  //   let i = 0;
  //   let lead = {};
  //   for (i = 0; i < 1000; i++) {
  //     lead = {
  //       name: `Test${i}`,
  //       email: `test${i}@test.in`,
  //       phone: `122332434${i}`,
  //       source: 'facebook',
  //     };
  //     await this.leadsService.create(lead);
  //   }
  // }

  @Get()
  findAll(): Promise<Lead[]> {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lead> {
    return this.leadsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() lead: Partial<Lead>): Promise<Lead> {
    return this.leadsService.update(id, lead);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.leadsService.remove(id);
  }
}
