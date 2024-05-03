import { Injectable, NotFoundException } from '@nestjs/common';
import { ExternalProductService } from './products.external.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly externalProductService: ExternalProductService,
  ) {}

  async getProducts() {
    return this.externalProductService.getProducts();
  }

  async getOne(id: number) {
    const product = await this.externalProductService.getOneProduct(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product
  }
}
