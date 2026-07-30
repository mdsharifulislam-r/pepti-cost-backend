import express from 'express';
import { BannerController } from './banner.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { BannerValidations } from './banner.validation';

const router = express.Router();

router.route("/")
    .post(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), fileUploadHandler(), validateRequest(BannerValidations.createBannerValidation), BannerController.createBanner)
    .get(BannerController.getAllBanners)

router.route("/:id")
    .get(BannerController.getSingleBanner)
    .patch(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), fileUploadHandler(), validateRequest(BannerValidations.updateBannerValidation), BannerController.updateBanner)
    .delete(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), BannerController.deleteBanner)


export const BannerRoutes = router;
