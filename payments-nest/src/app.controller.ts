import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('Breakfast')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage: Record<string, any> = context.getMessage();
    console.log('data', data);
    console.log('origin', orginalMessage)
    //random payment result
    let result: string = this.appService.getOrderResult();
    channel.ack(result)
  }
}
