import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
 
const createBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleData = req.body;
    const result = await BicycleServices.createBicycleIntoDB(bicycleData);

    res.status(201).json({
      success: true,
      message: 'Bicycle is created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create bicycle',
    });
  }
};

const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const result = await BicycleServices.getAllBicyclesFromDB();

    res.status(200).json({
      success: true,
      message: 'Bicycles are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bicycles',
    });
  }
};

const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const result = await BicycleServices.getSingleBicycleFromDB(_id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bicycle is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bicycle',
    });
  }
};

export const bicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
};
