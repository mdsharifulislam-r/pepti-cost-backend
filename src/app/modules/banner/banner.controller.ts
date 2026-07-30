import { Request, Response, NextFunction } from 'express';
import { BannerServices } from './banner.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { getSingleFilePath } from '../../../shared/getFilePath';

const createBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const image = getSingleFilePath(req.files, 'image')
    const payload = req.body;
    if (image) {
        payload.image = image;
    }
    const result = await BannerServices.createBanner(payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner created successfully",
        data: result
    });
})

const getAllBanners = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await BannerServices.getAllBanners();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banners retrieved successfully",
        data: result
    });
})

const getSingleBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await BannerServices.getSingleBanner(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner retrieved successfully",
        data: result
    });
})

const updateBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const image = getSingleFilePath(req.files, 'image')
    const payload = req.body;
    if (image) {
        payload.image = image;
    }
    const result = await BannerServices.updateBanner(req.params.id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner updated successfully",
        data: result
    });
})

const deleteBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await BannerServices.deleteBanner(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Banner deleted successfully",
        data: result
    });
})


export const BannerController = { createBanner, getAllBanners, getSingleBanner, updateBanner, deleteBanner };
