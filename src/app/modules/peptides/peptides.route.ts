import express from 'express';
import { PeptidesController } from './peptides.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { PeptidesValidations } from './peptides.validation';

const router = express.Router();

router.route('/')
    .post(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),validateRequest(PeptidesValidations.createPeptidesZodSchema),PeptidesController.createPeptides)
    .get(PeptidesController.getAllPeptides);

router.route('/:id')
    .patch(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),validateRequest(PeptidesValidations.updatePeptidesZodSchema),PeptidesController.updatePeptides)
    .delete(auth(USER_ROLES.ADMIN,USER_ROLES.SUPER_ADMIN),PeptidesController.deletePeptides);

export const PeptidesRoutes = router;
