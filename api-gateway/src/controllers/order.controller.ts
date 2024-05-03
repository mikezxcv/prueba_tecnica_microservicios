import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard as CustomAuthGuard } from 'common/security/auth.guard';
import { CreateOrderDto } from 'src/dto/orders.dto';

@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
@ApiTags('Order Service')
@Controller('/order')
export class OrderController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  findPaymentByOrderId(@Param('id') orderId: number) {
    return this.appService.findOneOrder(orderId);
  }

  @Post('/')
  createOrder(@Body() order: CreateOrderDto) {
    return this.appService.createOrder(order);
  }

  @Delete('/:id')
  deleteOrder(@Param('id') orderId: number) {
    return this.appService.deleteOrder(orderId);
  }
}
