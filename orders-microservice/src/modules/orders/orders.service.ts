import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderI } from './interfaces/orders.interfaces';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async createOrder(request: CreateOrderI) {
    const { customerId, products } = request;
    const totalOrder = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
    const order = this.orderRepository.create({
      customerId,
      total: totalOrder,
    });
    const createdOrder = await this.orderRepository.save(order);

    const orderDetails = products.map((product) => {
      return this.orderDetailsRepository.create({
        orderId: createdOrder.id,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        productName: product.name,
      });
    });
    return await this.orderDetailsRepository.save(orderDetails);
  }

  async findOrderById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderDetailsRepository.delete(
      order.orderDetails.map((od) => od.id),
    );
    await this.orderRepository.delete(id);
    return { message: 'Order deleted successfully' };
  }
}
