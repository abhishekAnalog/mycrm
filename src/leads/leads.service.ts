import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<Lead>) {}

  create(lead: Partial<Lead>): Promise<Lead> {
    const newLead = new this.leadModel(lead);
    return newLead.save();
  }

  findAll(): Promise<Lead[]> {
    return this.leadModel.find().exec();
  }

  findOne(id: string): Promise<Lead> {
    return this.leadModel.findById(id).exec();
  }

  update(id: string, lead: Partial<Lead>): Promise<Lead> {
    return this.leadModel.findByIdAndUpdate(id, lead, { new: true }).exec();
  }

  remove(id: string): Promise<any> {
    return this.leadModel.findByIdAndDelete(id).exec();
  }
}
