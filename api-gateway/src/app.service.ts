import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { PaymentDto } from './interfaces/payments.interface';
import { CreatePaymentDto } from './dto/payments.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/orders.dto';
import { CreateCustomerI } from './interfaces/customers.interface';
import { CreateCustomerDto } from './dto/customers.dto';
import {
  LoginDto,
  SignupDto,
  ValidateTokenDto,
} from './dto/authentication.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('SERVICE_ORDER') private readonly clientOrderApp: ClientProxy,
    @Inject('SERVICE_PAYMENT')
    private readonly clientPaymentService: ClientProxy,
    @Inject('SERVICE_CUSTOMER')
    private readonly clientCustomerService: ClientProxy,
    @Inject('AUTHENTICATION_SERVICE')
    private readonly clientAuthenticationService: ClientProxy,
    @Inject('SERVICE_PRODUCT')
    private readonly clientProductService: ClientProxy,
  ) {}

  async findAllPayments(): Promise<SuccessResponse<PaymentDto>> {
    const pattern = { cmd: 'findAllPayments' };
    const payload = {
      test: 'test',
    };
    const data = this.clientPaymentService.send<PaymentDto>(pattern, payload);
    return firstValueFrom(data).then((data) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data,
    }));
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const pattern = { cmd: 'createPayment' };
    const { orderId, amount, creditCardNumber } = createPaymentDto;
    const payment = this.clientPaymentService.send<string>(pattern, {
      orderId,
      amount,
      creditCardNumber,
    });

    const simulatePayment = this.clientPaymentService.send<string>(
      { cmd: 'simulatePayment' },
      { orderId, amount },
    );

    return firstValueFrom(payment).then((message) => {
      return firstValueFrom(simulatePayment).then((simulateMessage) => {
        return {
          success: true,
          timestamp: new Date().toISOString(),
          message: pattern.cmd,
          data: {
            payment: message,
            simulateMessage,
          },
        };
      });
    });
  }

  async findOnePayment(id: number): Promise<SuccessResponse<PaymentDto>> {
    const pattern = { cmd: 'findPaymentById' };
    const data = this.clientPaymentService.send<PaymentDto>(pattern, id);
    return firstValueFrom(data).then((data) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data,
    }));
  }

  async findOneOrder(id: number): Promise<SuccessResponse<PaymentDto>> {
    const pattern = { cmd: 'findOrderById' };
    const data = this.clientOrderApp.send<PaymentDto>(pattern, id);
    return firstValueFrom(data).then((data) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data,
    }));
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const pattern = { cmd: 'createOrder' };
    const data = this.clientOrderApp.send<string>(pattern, createOrderDto);
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  async deleteOrder(id: number) {
    const pattern = { cmd: 'deleteOrder' };
    const data = this.clientOrderApp.send<string>(pattern, id);
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  async findOneCustomer(id: number): Promise<SuccessResponse<PaymentDto>> {
    const pattern = { cmd: 'findOneCustomer' };
    const data = this.clientCustomerService.send<PaymentDto>(pattern, id);
    return firstValueFrom(data).then((data) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data,
    }));
  }

  async createCustomer(request: CreateCustomerDto) {
    const pattern = { cmd: 'createCustomer' };
    const data = this.clientCustomerService.send<string>(pattern, request);
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  async deleteCustomer(id: number) {
    const pattern = { cmd: 'deleteCustomer' };
    const data = this.clientCustomerService.send<string>(pattern, id);
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  // PRODUCTS SERVICE
  async findAllProducts() {
    try {
      const pattern = { cmd: 'get_all_products' };
      const data = this.clientProductService.send<string>(pattern, {});
      return firstValueFrom(data).then((message) => ({
        success: true,
        timestamp: new Date().toISOString(),
        message: pattern.cmd,
        data: message,
      }));
    } catch (error) {
      console.log('error', error.message);
      throw new HttpException(
        {
          status: error.status || 500,
          error: 'Internal Server Error',
          message: error.message || 'Error fetching products',
        },
        500,
      );
    }
  }

  async findOneProduct(id: number) {
    try {
      const pattern = { cmd: 'get_one_product' };
      const data = this.clientProductService.send<string>(pattern, id);
      return firstValueFrom(data).then((message) => ({
        success: true,
        timestamp: new Date().toISOString(),
        message: pattern.cmd,
        data: message,
      }));
    } catch (error) {
      console.log('error', error.message);
      throw new HttpException(
        {
          status: error.status || 500,
          error: 'Internal Server Error',
          message: error.message || 'Error fetching products',
        },
        500,
      );
    }
  }

  // AUTHENTICATION SERVICE
  async login(request: LoginDto) {
    const pattern = { cmd: 'login' };
    const data = this.clientAuthenticationService.send<string>(
      pattern,
      request,
    );
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  async signup(request: SignupDto) {
    const pattern = { cmd: 'signup' };
    const data = this.clientAuthenticationService.send<string>(
      pattern,
      request,
    );
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  async validateToken(request: ValidateTokenDto) {
    const pattern = { cmd: 'validate_token' };
    const data = this.clientAuthenticationService.send<string>(
      pattern,
      request,
    );
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }

  async findAllUsers() {
    const pattern = { cmd: 'get_all_users' };
    const data = this.clientAuthenticationService.send<string>(pattern, {});
    return firstValueFrom(data).then((message) => ({
      success: true,
      timestamp: new Date().toISOString(),
      message: pattern.cmd,
      data: message,
    }));
  }
}
