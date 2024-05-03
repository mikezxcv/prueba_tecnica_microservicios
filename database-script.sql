create table customers
(
    id          serial
        constraint "PK_133ec679a801fab5e070f73d3ea"
            primary key,
    user_id     integer                 not null,
    name        varchar                 not null,
    last_name   varchar                 not null,
    phone       varchar                 not null,
    address     varchar                 not null,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null
);

alter table customers
    owner to cuscatlan;

INSERT INTO public.customers (id, user_id, name, last_name, phone, address, "createdAt", "updatedAt") VALUES (3, 2, 'smith', 'smith', '22', 'address', '2024-05-03 17:49:38.807095', '2024-05-03 17:49:38.807095');
INSERT INTO public.customers (id, user_id, name, last_name, phone, address, "createdAt", "updatedAt") VALUES (1, 1, 'john', 'john', '11', 'address', '2024-05-03 17:49:22.042739', '2024-05-03 17:49:22.042739');
INSERT INTO public.customers (id, user_id, name, last_name, phone, address, "createdAt", "updatedAt") VALUES (2, 3, 'mike', 'mike', '33', 'address', '2024-05-03 17:49:54.521444', '2024-05-03 17:49:54.521444');

create table orders
(
    id          serial
        primary key,
    customer_id integer                 not null
        constraint orders_customers_id_fk
            references customers,
    total       numeric(10, 2)          not null,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null
);

alter table orders
    owner to cuscatlan;

INSERT INTO public.orders (id, customer_id, total, "createdAt", "updatedAt") VALUES (1, 1, 2000.00, '2024-05-02 21:01:45.115841', '2024-05-02 21:01:45.115841');
INSERT INTO public.orders (id, customer_id, total, "createdAt", "updatedAt") VALUES (2, 2, 999.99, '2024-05-02 21:01:45.115841', '2024-05-02 21:01:45.115841');
INSERT INTO public.orders (id, customer_id, total, "createdAt", "updatedAt") VALUES (3, 3, 599.98, '2024-05-02 21:01:45.115841', '2024-05-02 21:01:45.115841');
INSERT INTO public.orders (id, customer_id, total, "createdAt", "updatedAt") VALUES (5, 1, 10.00, '2024-05-02 22:14:03.001622', '2024-05-02 22:14:03.001622');
INSERT INTO public.orders (id, customer_id, total, "createdAt", "updatedAt") VALUES (6, 1, 11.50, '2024-05-02 22:15:21.035915', '2024-05-02 22:15:21.035915');


create table order_details
(
    id           serial
        primary key,
    order_id     integer        not null
        references orders,
    product_id   integer        not null,
    quantity     integer        not null,
    price        numeric(10, 2) not null,
    product_name varchar(250)
);

alter table order_details
    owner to cuscatlan;

INSERT INTO public.order_details (id, order_id, product_id, quantity, price, product_name) VALUES (5, 3, 3, 1, 199.99, 'MOUSE');
INSERT INTO public.order_details (id, order_id, product_id, quantity, price, product_name) VALUES (3, 2, 2, 1, 799.99, 'LAPTOP');
INSERT INTO public.order_details (id, order_id, product_id, quantity, price, product_name) VALUES (1, 1, 1, 1, 1200.00, 'PC');
INSERT INTO public.order_details (id, order_id, product_id, quantity, price, product_name) VALUES (2, 1, 3, 2, 400.00, 'SMARTPHONE');
INSERT INTO public.order_details (id, order_id, product_id, quantity, price, product_name) VALUES (4, 3, 1, 1, 1200.00, 'HEADPHONE');
INSERT INTO public.order_details (id, order_id, product_id, quantity, price, product_name) VALUES (6, 5, 1, 10, 1.00, 'string');




create table payments
(
    id                 serial
        primary key,
    order_id           integer                 not null,
    amount             numeric(10, 2)          not null,
    date               date                    not null,
    "createdAt"        timestamp default now() not null,
    "updatedAt"        timestamp default now() not null,
    credit_card_number varchar                 not null
);

alter table payments
    owner to cuscatlan;

INSERT INTO public.payments (id, order_id, amount, date, "createdAt", "updatedAt", credit_card_number) VALUES (3, 3, 599.98, '2024-04-03', '2024-05-02 17:40:16.421308', '2024-05-02 17:40:16.421308', '667788');
INSERT INTO public.payments (id, order_id, amount, date, "createdAt", "updatedAt", credit_card_number) VALUES (2, 2, 999.99, '2024-04-02', '2024-05-02 17:40:16.421308', '2024-05-02 17:40:16.421308', '112255');
INSERT INTO public.payments (id, order_id, amount, date, "createdAt", "updatedAt", credit_card_number) VALUES (1, 1, 2000.00, '2024-04-01', '2024-05-02 17:40:16.421308', '2024-05-02 17:40:16.421308', '223344');
INSERT INTO public.payments (id, order_id, amount, date, "createdAt", "updatedAt", credit_card_number) VALUES (6, 1, 20.00, '2024-05-02', '2024-05-02 20:16:37.027215', '2024-05-02 20:16:37.027215', '11233');

create table products
(
    id          serial
        primary key,
    name        varchar(100)   not null,
    description text,
    price       numeric(10, 2) not null,
    image       varchar(200)
);

alter table products
    owner to cuscatlan;

INSERT INTO public.products (id, name, description, price, image) VALUES (1, 'Laptop', 'High performance laptop with Intel Core i7 processor', 1200.00, 'laptop.jpg');
INSERT INTO public.products (id, name, description, price, image) VALUES (2, 'Smartphone', 'Latest smartphone model with 6.5" display', 799.99, 'smartphone.jpg');
INSERT INTO public.products (id, name, description, price, image) VALUES (3, 'Headphones', 'Wireless headphones with noise-cancelling feature', 199.99, 'headphones.jpg');


create table users
(
    id       serial
        primary key,
    name     varchar(100) not null,
    email    varchar(100) not null
        unique,
    password varchar(100) not null,
    username varchar(50)
);

alter table users
    owner to cuscatlan;

INSERT INTO public.users (id, name, email, password, username) VALUES (2, 'Jane Smith', 'jane@example.com', '$2b$10$4N62X.HJ5mWvk6klTDhFz.SZ/g/7id/QTEg.pevlVQ78WGL1Xk3Oe', 'jane');
INSERT INTO public.users (id, name, email, password, username) VALUES (1, 'John Doe', 'john@example.com', '$2b$10$4N62X.HJ5mWvk6klTDhFz.SZ/g/7id/QTEg.pevlVQ78WGL1Xk3Oe', 'john');
INSERT INTO public.users (id, name, email, password, username) VALUES (3, 'Michael Johnson', 'michael@example.com', '$2b$10$4N62X.HJ5mWvk6klTDhFz.SZ/g/7id/QTEg.pevlVQ78WGL1Xk3Oe', 'mike');
