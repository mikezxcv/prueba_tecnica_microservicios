import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';


@Entity({ name: 'orders'})
export class Order extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column('numeric', { precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  @JoinColumn({name: 'order_id'})
  orderDetails: OrderDetail[];
}
