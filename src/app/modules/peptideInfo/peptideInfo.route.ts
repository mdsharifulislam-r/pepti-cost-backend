import express from 'express';
import { PeptideInfoController } from './peptideInfo.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { PeptideInfoValidations } from './peptideInfo.validation';

const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler([{ name: 'pdf', type: ['application/pdf'], maxCount: 1 }]),
    validateRequest(PeptideInfoValidations.createPeptideInfoZodSchema),
    PeptideInfoController.createPeptideInfo,
  )
  .get(PeptideInfoController.getAllPeptideInfo);

router
  .route('/:id')
  .get(PeptideInfoController.getSinglePeptideInfo)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler([{ name: 'pdf', type: ['application/pdf'], maxCount: 1 }]),
    PeptideInfoController.updatePeptideInfo,
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), PeptideInfoController.deletePeptideInfo);

export const PeptideInfoRoutes = router;
