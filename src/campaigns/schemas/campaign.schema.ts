import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Campaign extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  objective: string;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  spend: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
