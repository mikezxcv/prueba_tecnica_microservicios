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
import { CreateCustomerDto } from 'src/dto/customers.dto';
import { AuthGuard as CustomAuthGuard } from 'common/security/auth.guard';

@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
@ApiTags('Customer Service')
@Controller('/customer')
export class CustomerController {
  constructor(private readonly appService: AppService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get('/customer/:id')
  findOneCustomer(@Param('id') orderId: number) {
    return this.appService.findOneCustomer(orderId);
  }

  @Post('/')
  createCustomer(@Body() customer: CreateCustomerDto) {
    return this.appService.createCustomer(customer);
  }

  @Delete('/:id')
  deleteCustomer(@Param('id') customerId: number) {
    return this.appService.deleteCustomer(customerId);
  }
}
