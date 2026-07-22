import { Request, Response, NextFunction } from 'express';
import { PeptidesServices } from './peptides.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createPeptides = catchAsync(async (req: Request, res: Response) => {
    const { ...peptidesData } = req.body;
    const result = await PeptidesServices.createPeptides(peptidesData);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Peptides created successfully',
        data: result,
    });
});



const getAllPeptides = catchAsync(async (req: Request, res: Response) => {
    const result = await PeptidesServices.getAllPeptides();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Peptides data retrieved successfully',
        data: result,
    });
});


const updatePeptides = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ...peptidesData } = req.body;
    const result = await PeptidesServices.updatePeptides(id, peptidesData);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Peptides updated successfully',
        data: result,
    });
});



const deletePeptides = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await PeptidesServices.deletePeptides(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Peptides deleted successfully',
        data: result,
    });
});



export const PeptidesController = {
    createPeptides,
    getAllPeptides,
    updatePeptides,
    deletePeptides
};
