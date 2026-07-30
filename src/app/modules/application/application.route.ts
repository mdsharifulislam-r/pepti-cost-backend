import express from 'express';
import { ApplicationController } from './application.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationValidations } from './application.validation';

const router = express.Router();

router.route('/')
    .post(validateRequest(ApplicationValidations.createApplicationValidation), ApplicationController.createApplication)
    .get(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), ApplicationController.getAllApplications);

router.route('/:id')
    .get(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), ApplicationController.getSingleApplication)
    .patch(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), validateRequest(ApplicationValidations.updateApplicationValidation), ApplicationController.updateApplication)
    .delete(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), ApplicationController.deleteApplication);

export const ApplicationRoutes = router;
