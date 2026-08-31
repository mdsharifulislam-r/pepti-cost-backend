import { Request, Response } from 'express';
import { AdminServices } from './admin.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAdminStats = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAdminStatsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin statistics retrieved successfully',
    data: result,
  });
});

const getApplicationGraphData = catchAsync(async (req: Request, res: Response) => {
  const { year } = req.query;
  const result = await AdminServices.getApplicationGraphDataFromDB(year as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Application graph data retrieved successfully',
    data: result,
  });
});

export const AdminController = {
  getAdminStats,
  getApplicationGraphData,
};
