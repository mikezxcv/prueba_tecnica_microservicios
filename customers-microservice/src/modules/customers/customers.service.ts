import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerI } from './interfaces/customers.interfaces';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findCustomerById(id: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        id,
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer Not Found');
    }

    return customer;
  }

  async createCustomer(request: CreateCustomerI) {
    const createCustomer = this.customerRepository.create(request);
    return await this.customerRepository.save(createCustomer);
  }

  async deleteCustomer(id: number) {
    const order = await this.customerRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException('Customer not found');
    }
    await this.customerRepository.delete(id);
    return { message: 'Customer deleted successfully' };
  }
}
