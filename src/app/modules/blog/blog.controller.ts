import { Request, Response, NextFunction } from 'express';
import { BlogServices } from './blog.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFilePath } from '../../../shared/getFilePath';

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const { ...blogData } = req.body;
    const image = getSingleFilePath(req.files, 'image');
    if (image) {
        blogData.thumbnail = image
    }
    const result = await BlogServices.createBlog(blogData);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog created successfully',
        data: result,
    });
});


const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogServices.getAllBlogs(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blogs data retrieved successfully',
        data: result.blogs,
        pagination: result.paginationInfo
    });
});


const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BlogServices.getSingleBlog(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog data retrieved successfully',
        data: result,
    });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { ...blogData } = req.body;
    const image = getSingleFilePath(req.files, 'image');
    if (image) {
        blogData.thumbnail = image
    }
    const result = await BlogServices.updateBlog(id, blogData);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog updated successfully',
        data: result,
    });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BlogServices.deleteBlog(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
        data: result,
    });
});



export const BlogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
