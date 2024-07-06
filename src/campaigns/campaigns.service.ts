import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './schemas/campaign.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    private httpService: HttpService,
  ) {}

  create(campaign: Partial<Campaign>): Promise<Campaign> {
    const newCampaign = new this.campaignModel(campaign);
    return newCampaign.save();
  }

  findAll(): Promise<Campaign[]> {
    return this.campaignModel.find().exec();
  }

  findOne(id: string): Promise<Campaign> {
    return this.campaignModel.findById(id).exec();
  }

  update(id: string, campaign: Partial<Campaign>): Promise<Campaign> {
    return this.campaignModel
      .findByIdAndUpdate(id, campaign, { new: true })
      .exec();
  }

  remove(id: string): Promise<any> {
    return this.campaignModel.findByIdAndDelete(id).exec();
  }

  async getCampaignPerformance(campaignId: string): Promise<any> {
    const accessToken =
      process.env.META_ACCESS_TOKEN ??
      'EAAXzG49u7ZC0BO87DELqEr6WrOZAOLSPtuV1NViRb4pe7XlUbQAs1YuziZBOY4FKZBGx4CS6n9WjQwIIIfnvGHxK7wB5CW9EbLY8Bh8Miz47cKTqRJt9I5zZChJ6qnS2QaAfYAoroQ2lzw5l8XDbcPurfLquU8iIPr8dtBCSmOeUthGrE41I12xRupgR0Qopyvg7BCcdXCcdSCGO7VdbsQN5YPGNTV8m71nYb7hkZD';
    const url = `https://graph.facebook.com/v11.0/${campaignId}/insights?access_token=${accessToken}`;
    const response = await this.httpService.get(url).toPromise();
    return response.data.data;
  }
}
