import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async findAll() {
    console.log('findAll');
    const data = await this.paymentRepository.find();
    console.log('data', data);
    return data;
  }
  // Método para crear un nuevo pago
  async createPayment(orderId: number, amount: number, creditCardNumber: string) {
    const newPayment = this.paymentRepository.create({ orderId, amount, creditCardNumber, date: new Date()});
    return await this.paymentRepository.save(newPayment);
  }

  // Método para obtener un pago por su ID
  async findPaymentById(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  // Método para simular un pago
  async simulatePayment(orderId: number, amount: number) {
    const simulatedPayment = {
      // Aquí podrías realizar alguna lógica de simulación si es necesario
      simulatedPaymentDetails: `Simulated payment for order ${orderId} with amount ${amount}`,
    };
    return { message: 'Payment simulation successful', simulatedPayment };
  }
}
