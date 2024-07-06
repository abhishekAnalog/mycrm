import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        'mongodb+srv://aryan_analog:UMMp41nqrYFRer9J@nestjs.l7nkikk.mongodb.net/nestjs-crm',
    ),
    LeadsModule,
    MetaModule,
    CampaignsModule,
  ],
})
export class AppModule {}
