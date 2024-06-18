import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadsService } from '../leads/leads.service';
import { Lead, LeadSchema } from '../leads/schemas/lead.schema';
import { HttpModule } from '@nestjs/axios';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
  ],
  controllers: [MetaController],
  providers: [MetaService, LeadsService],
})
export class MetaModule {}
