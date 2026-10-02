import { Request, Response } from 'express';
import { PeptideInfoServices } from './peptideInfo.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFilePath } from '../../../shared/getFilePath';

const createPeptideInfo = catchAsync(async (req: Request, res: Response) => {
  const { ...peptideInfoData } = req.body;
  const image = getSingleFilePath(req.files, 'image');
  const pdf = getSingleFilePath(req.files, 'pdf');

  if (image) {
    peptideInfoData.thumbnail = image;
  }

  if (pdf) {
    peptideInfoData.pdf = pdf;
  }

  const result = await PeptideInfoServices.createPeptideInfo(peptideInfoData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Peptide info created successfully',
    data: result,
  });
});

const getAllPeptideInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await PeptideInfoServices.getAllPeptideInfo(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Peptide info data retrieved successfully',
    data: result.peptideInfos,
    pagination: result.paginationInfo,
  });
});

const getSinglePeptideInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PeptideInfoServices.getSinglePeptideInfo(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Peptide info data retrieved successfully',
    data: result,
  });
});

const updatePeptideInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...peptideInfoData } = req.body;
  const image = getSingleFilePath(req.files, 'image');
  const pdf = getSingleFilePath(req.files, 'pdf');

  if (image) {
    peptideInfoData.thumbnail = image;
  }

  if (pdf) {
    peptideInfoData.pdf = pdf;
  }

  const result = await PeptideInfoServices.updatePeptideInfo(id, peptideInfoData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Peptide info updated successfully',
    data: result,
  });
});

const deletePeptideInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PeptideInfoServices.deletePeptideInfo(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Peptide info deleted successfully',
    data: result,
  });
});

export const PeptideInfoController = {
  createPeptideInfo,
  getAllPeptideInfo,
  getSinglePeptideInfo,
  updatePeptideInfo,
  deletePeptideInfo,
};
