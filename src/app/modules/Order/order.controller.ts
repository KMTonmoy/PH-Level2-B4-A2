import { Request, Response } from 'express';
import { BicycleServices } from '../BiCycle/bicycle.service';
import { OrderServices } from './order.service';
import { OrderModel } from './order.model';

const orderBicycle = async (req: Request, res: Response) => {
    try {
        const { email, product, quantity, totalPrice } = req.body;

        const bicycle = await BicycleServices.getSingleBicycleFromDB(product);
        if (!bicycle) {
            return res.status(404).json({
                success: false,
                message: 'Bicycle not found',
            });
        }

        if (bicycle.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock',
            });
        }

        const updatedBicycle = await BicycleServices.updateBicycleInDB(product, {
            quantity: bicycle.quantity - quantity,
            inStock: bicycle.quantity - quantity === 0 ? false : bicycle.inStock,
        });

        const orderData = {
            email,
            product,
            quantity,
            totalPrice,
        };

        const result = await OrderServices.createOrderIntoDB(orderData);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to place order',
        });
    }
};

const calculateTotalRevenue = async (req: Request, res: Response) => {
    try {
        const totalRevenue = await OrderModel.aggregate([
            {
                $lookup: {
                    from: 'bicycles',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'bicycle'
                }
            },
            {
                $unwind: '$bicycle'
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: {
                        $multiply: ['$bicycle.price', '$quantity']
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' }
                }
            }
        ]);

        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue: totalRevenue[0] ? totalRevenue[0].totalRevenue : 0
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error calculating revenue', error: err });
    }
};

export const orderControllers = {
    orderBicycle,
    calculateTotalRevenue,
};
