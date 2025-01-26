export interface Payment {
    email: string;
    productIds: string[];
    amount: number;
    transactionId?: string;
}
