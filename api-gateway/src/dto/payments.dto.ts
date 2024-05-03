import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  creditCardNumber: string;
}

