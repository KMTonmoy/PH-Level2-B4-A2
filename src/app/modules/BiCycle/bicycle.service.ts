import { Bicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';

const createBicycleIntoDB = async (bicycle: Bicycle) => {
  try {
    const result = await BicycleModel.create(bicycle);
    return result;
  } catch (err) {
    console.error('Error creating bicycle:', err);
    throw new Error('Failed to create bicycle');
  }
};

const getAllBicyclesFromDB = async () => {
  try {
    const result = await BicycleModel.find();
    return result;
  } catch (err) {
    console.error('Error retrieving bicycles:', err);
    throw new Error('Failed to retrieve bicycles');
  }
};

const getSingleBicycleFromDB = async (id: string) => {
  try {
    const result = await BicycleModel.findOne({ _id: id });
    if (!result) {
      throw new Error('Bicycle not found');
    }
    return result;
  } catch (err) {
    console.error(`Error retrieving bicycle with id ${id}:`, err);
    throw new Error('Failed to retrieve bicycle');
  }
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
};
