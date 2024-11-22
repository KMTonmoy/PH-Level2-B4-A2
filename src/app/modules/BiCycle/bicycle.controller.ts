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

const updateBicycle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const updatedData = req.body;
    const result = await BicycleServices.updateBicycleInDB(_id, updatedData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to update bicycle',
    });
  }
};

const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const result = await BicycleServices.deleteBicycleFromDB(_id);

    res.status(200).json({
      success: true,
      message: 'Bicycle deleted successfully',
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: `${err}`,
    });
  }
};

export const bicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
