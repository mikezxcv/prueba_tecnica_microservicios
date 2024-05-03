import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard as CustomAuthGuard } from 'common/security/auth.guard';

@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
@ApiTags('Product Service')
@Controller('/product')
export class ProductController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  findAllProducts() {
    return this.appService.findAllProducts();
  }

  @Get('/:id')
  findOneProduct(@Param('id') productId: number) {
    return this.appService.findOneProduct(productId);
  }
}
