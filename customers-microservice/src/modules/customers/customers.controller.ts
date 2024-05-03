import { Controller } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCustomerI } from './interfaces/customers.interfaces';

@Controller()
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @MessagePattern({ cmd: 'findOneCustomer' })
  async findCustomerById(id: number) {
    return this.customerService.findCustomerById(id);
  }

  @MessagePattern({ cmd: 'createCustomer' })
  async createCustomer(data: CreateCustomerI) {
    return this.customerService.createCustomer(data);
  }

  @MessagePattern({ cmd: 'deleteCustomer' })
  async deleteCustomer(id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
