import { Request, Response, NextFunction } from 'express';
import { ApplicationServices } from './application.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await ApplicationServices.createApplication(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Application submitted successfully',
        data: result,
    });
});

const getAllApplications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ApplicationServices.getAllApplications(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Applications retrieved successfully',
        data: result.applications,
        pagination: result.paginationInfo
    });
});

const getSingleApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ApplicationServices.getSingleApplication(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Application retrieved successfully',
        data: result,
    });
});

const updateApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ApplicationServices.updateApplication(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Application updated successfully',
        data: result,
    });
});

const deleteApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ApplicationServices.deleteApplication(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Application deleted successfully',
        data: result,
    });
});

export const ApplicationController = {
    createApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication,
};
