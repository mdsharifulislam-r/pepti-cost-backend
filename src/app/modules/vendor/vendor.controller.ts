import { Request, Response, NextFunction } from 'express';
import { VendorServices } from './vendor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { kafkaProducer } from '../../../tools/kafka/kafka-producers/kafka.producer';
import ApiError from '../../../errors/ApiError';

const createVendor = catchAsync(async (req: Request, res: Response) => {
    const { ...vendorData } = req.body;
    const image = getSingleFilePath(req.files, 'image');
    vendorData.image = image
    const result = await VendorServices.createVendorIntoDB(vendorData);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendor created successfully',
        data: result,
    });
});


const getSingleVendor = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await VendorServices.getSingleVendorFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendor data retrieved successfully',
        data: result,
    });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ...vendorData } = req.body;
    const image = getSingleFilePath(req.files, 'image');
    vendorData.image = image
    const result = await VendorServices.updateVendorIntoDB(id, vendorData);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendor updated successfully',
        data: result,
    });
});

const deleteVendor = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await VendorServices.deleteVendorFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendor deleted successfully',
        data: result,
    });
});

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getAllVendorsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendors retrieved successfully',
        data: result.vendors,
        pagination: result.paginationInfo
    });
});


const bulkUploadVendors = catchAsync(async (req: Request, res: Response) => {
    const csvFile = getSingleFilePath(req.files, 'doc');
    if(!csvFile){
        throw new ApiError(StatusCodes.BAD_REQUEST, 'File is required!');
    }
    const result = await kafkaProducer.sendMessage('peptide',{type:'bulk-upload',data:csvFile})
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendors created successfully',
        data: result,
    });
});

const getLowestPeptides = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getLowestPricePeptidesForToday();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Lowest Peptides retrieved successfully',
        data: result,
    });
});


const biggestSaveings = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getBiggestSavingForToday();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Biggest Saveings retrieved successfully',
        data: result,
    });
});


const topRatingVendors = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getTopRatedVendorsForToday();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Top Rating Vendors retrieved successfully',
        data: result,
    });
})


const getPeptidesDetails = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getPeptidesDetails();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Peptides Details retrieved successfully',
        data: result,
    });
})


const getVendorList = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getVendorList(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Vendors retrieved successfully',
        data: result.vendors,
        pagination: result.paginationInfo
    });
})


export const VendorController = {
    createVendor,
    getSingleVendor,
    updateVendor,
    deleteVendor,
    getAllVendors,
    bulkUploadVendors,
    getLowestPeptides,
    biggestSaveings,
    topRatingVendors,
    getPeptidesDetails,
    getVendorList
};
