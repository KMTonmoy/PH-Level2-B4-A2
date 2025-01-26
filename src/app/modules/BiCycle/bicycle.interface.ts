export type BicycleType = 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';

export type Bicycle = {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    model: string;
    type: BicycleType;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
};
