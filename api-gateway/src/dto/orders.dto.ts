import { ApiProperty } from '@nestjs/swagger';

class ProductsDto {
    @ApiProperty()
    productId: number;
  
    @ApiProperty()
    quantity: number;
  
    @ApiProperty()
    price: number;
  
    @ApiProperty()
    name: string;
  }

  
export class CreateOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty(
    {
      type: [ProductsDto]
    },
  )
  products: ProductsDto[];
}

