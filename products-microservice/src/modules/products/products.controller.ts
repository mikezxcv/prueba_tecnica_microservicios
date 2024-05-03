import { Controller } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get_all_products' })
  async getProducts() {
    return this.productsService.getProducts();
  }

  @MessagePattern({ cmd: 'get_one_product' })
  async getProduct(id: number) {
    return this.productsService.getOne(id);
  }
}
