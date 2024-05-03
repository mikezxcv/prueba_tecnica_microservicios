import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Order } from './order.entity'; // Asegúrate de importar la entidad Order si existe

@Entity({name: 'order_details'})
export class OrderDetail extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'order_id'})
  orderId: number;

  @ManyToOne(() => Order, { nullable: false })
  @JoinColumn({name: 'order_id'})
  order: Order;

  @Column({name: 'product_id'})
  productId: number;

  @Column({name: 'product_name', nullable: true})
  productName: string;

  @Column()
  quantity: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;
}
