import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from '../dto/payments.dto';
import { AuthGuard as CustomAuthGuard } from 'common/security/auth.guard';

@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
@ApiTags('Payment Service')
@Controller('/payment')
export class PaymentController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  findAllPayments() {
    return this.appService.findAllPayments();
  }

  @Get('/:id')
  findPayment(@Param('id') id: number) {
    return this.appService.findOnePayment(id);
  }

  @Post('/')
  createPayment(@Body() payment: CreatePaymentDto) {
    return this.appService.createPayment(payment);
  }
}
