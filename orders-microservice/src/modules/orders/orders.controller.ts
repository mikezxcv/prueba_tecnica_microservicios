import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderI } from './interfaces/orders.interfaces';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'findOrderById' })
  async findOrderById(id: number) {
    return this.ordersService.findOrderById(id);
  }

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(data: CreateOrderI) {
    return this.ordersService.createOrder(data);
  }

  @MessagePattern({ cmd: 'deleteOrder' })
  async deleteOrder(id: number) {
    return this.ordersService.deleteOrder(id);
  }
}
