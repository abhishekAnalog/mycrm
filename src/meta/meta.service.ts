import { Injectable } from '@nestjs/common';
import { LeadsService } from '../leads/leads.service';
import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MetaService {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly httpService: HttpService,
  ) {}

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

  public hashEmail(email: any): string {
    console.log(email.user_data.em, 'email');
    return crypto.createHash('sha256').update(email.user_data.em).digest('hex');
  }

  async sendEvent(event: any): Promise<any> {
    console.log(event.user_data.em, 'event');

    const url = `https://graph.facebook.com/v20.0/3343257409270389/events`;
    console.log(url, 'ur');
    const requestData = {
      // em: hashedEmail,
      event_name: 'Purchase',
      event_time: 1718794208, // Current timestamp in UNIX format
      user_data: {
        em: crypto
          .createHash('sha256')
          .update(event.user_data.em)
          .digest('hex'), // Replace with hashed email
      },
      custom_data: {
        currency: 'USD',
        value: 99.99,
        content_name: 'Product Name',
      },
    };
    const data = {
      data: [requestData],
      access_token:
        'EAAXzG49u7ZC0BO1ZBknNrj9Os2E24T6qHXbhMNu7N6vIZAwidZBEbvxB9kcLA6ozBAVZCSnyhVtp4AZB5rzIoba7lSPhSEdytEXhPVXvYXMZC1ZBNlAtNqOLw2ZAzmkWiQBsoJxX7lU6gI8CGp30yZAmq68avK20QqVFsb95AME3wptPPhVhklZCMAKkhLbZBHA0GEl63p4ykzTSZCR7ylxePsZBPsCg2GJ3CbJn1EFgZDZD',
    };
    console.log(data);
    try {
      return this.httpService.post(url, data);
    } catch (error) {
      if (error.response) {
        // Log only necessary parts of the error response
        console.log(
          {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data,
          },
          'error response',
        );
        throw new Error(
          `Facebook API Error: ${error.response.data.error.message}`,
        );
      } else {
        console.log(error.message, 'error message');
        throw new Error(`Request Error: ${error.message}`);
      }
    }
  }
}
