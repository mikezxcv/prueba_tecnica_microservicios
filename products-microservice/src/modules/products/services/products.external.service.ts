import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ProductsI } from '../interfaces/product.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalProductService {
  private readonly baseUrl =
    process.env.API_FAKE_STORE_URL || 'https://fakestoreapi.com.';
  constructor(private readonly httpService: HttpService) {}

  async getProducts() {
    const urlRequest = this.baseUrl + '/products';
    console.log(urlRequest);
    const data = this.httpService
      .get(urlRequest)
      .pipe(map((response) => response.data as ProductsI[]));
    return firstValueFrom(data);
  }

  async getOneProduct(id: number) {
    const urlRequest = this.baseUrl + '/products/' + id;
    const data = this.httpService
      .get(urlRequest)
      .pipe(map((response) => response.data as ProductsI));
    return firstValueFrom(data);
  }
}
