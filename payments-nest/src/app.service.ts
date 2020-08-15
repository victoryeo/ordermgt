import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOrderResult(): string {
    let result: number = Math.random() * (10 - 1) + 1
    console.log(result)
    // send status to order
    if (result > 5 && result <= 10)
      return "confirmed";
    else
      return "declined";
  }

  getHello(): string {
    return 'Hello World!';
  }
}
