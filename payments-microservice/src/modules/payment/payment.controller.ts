import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'findAllPayments' })
  findAll() {
    return this.paymentService.findAll();
  }

  @MessagePattern({ cmd: 'createPayment' })
  async createPayment(data: { orderId: number, amount: number, creditCardNumber: string}) {
    const { orderId, amount, creditCardNumber } = data;
    return this.paymentService.createPayment(orderId, amount, creditCardNumber);
  }

  @MessagePattern({ cmd: 'findPaymentById' })
  async findPaymentById(id: number) {
    return this.paymentService.findPaymentById(id);
  }

  @MessagePattern({ cmd: 'simulatePayment' })
  async simulatePayment(data: { orderId: number, amount: number }) {
    const { orderId, amount } = data;
    return this.paymentService.simulatePayment(orderId, amount);
  }
}
