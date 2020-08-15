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
    const orginalMessage = context.getMessage();
    console.log('data', data);
    //random payment result
    let result = Math.random() * (10 - 1) + 1
    console.log(result)
    // send status to order
    if (result > 5 && result <= 10)
      channel.ack("confirmed");
    else
      channel.ack("declined");
  }
}
