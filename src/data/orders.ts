import { Order, OrderStatus } from '../types';
import { products } from './products';

export const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+1 234 567 8900',
        customerAddress: '123 Main Street, New York, NY 10001',
        items: [
            {
                product: products[0],
                size: 'M',
                quantity: 2,
                price: products[0].price,
            },
            {
                product: products[1],
                size: 'L',
                quantity: 1,
                price: products[1].price,
            },
        ],
        total: 119.97,
        status: OrderStatus.DELIVERED,
        date: '2024-12-20',
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        customerPhone: '+1 234 567 8901',
        customerAddress: '456 Oak Avenue, Los Angeles, CA 90001',
        items: [
            {
                product: products[2],
                size: 'L',
                quantity: 1,
                price: products[2].price,
            },
        ],
        total: 79.99,
        status: OrderStatus.SHIPPED,
        date: '2024-12-22',
    },
    {
        id: 'ORD-003',
        customerName: 'Mike Johnson',
        customerEmail: 'mike.j@example.com',
        customerPhone: '+1 234 567 8902',
        customerAddress: '789 Pine Road, Chicago, IL 60601',
        items: [
            {
                product: products[3],
                size: 'M',
                quantity: 1,
                price: products[3].price,
            },
            {
                product: products[4],
                size: 'M',
                quantity: 3,
                price: products[4].price,
            },
        ],
        total: 144.96,
        status: OrderStatus.PACKED,
        date: '2024-12-24',
    },
    {
        id: 'ORD-004',
        customerName: 'Sarah Williams',
        customerEmail: 'sarah.w@example.com',
        customerPhone: '+1 234 567 8903',
        customerAddress: '321 Maple Drive, Houston, TX 77001',
        items: [
            {
                product: products[5],
                size: 'XL',
                quantity: 1,
                price: products[5].price,
            },
            {
                product: products[6],
                size: 'L',
                quantity: 1,
                price: products[6].price,
            },
        ],
        total: 154.98,
        status: OrderStatus.PLACED,
        date: '2024-12-26',
    },
    {
        id: 'ORD-005',
        customerName: 'David Brown',
        customerEmail: 'david.b@example.com',
        customerPhone: '+1 234 567 8904',
        customerAddress: '654 Elm Street, Phoenix, AZ 85001',
        items: [
            {
                product: products[7],
                size: 'M',
                quantity: 2,
                price: products[7].price,
            },
        ],
        total: 99.98,
        status: OrderStatus.DELIVERED,
        date: '2024-12-18',
    },
];
