import express from 'express';
import { VendorController } from './vendor.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { VendorValidations } from './vendor.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.route('/')
    .get(VendorController.getAllVendors)
    .post(auth(),validateRequest(VendorValidations.createVendorZodSchema),VendorController.createVendor);

router.route('/bulk-upload')
    .post(auth(),fileUploadHandler(),VendorController.bulkUploadVendors);
router.get('/lowest-peptides',VendorController.getLowestPeptides);
router.get('/biggest-savings',VendorController.biggestSaveings);
router.get('/top-rated-vendors',VendorController.topRatingVendors);
router.get('/peptides-details',VendorController.getPeptidesDetails);
router.get('/vendor-list',VendorController.getVendorList);
router.route('/:id')
    .get(auth(),VendorController.getSingleVendor)
    .patch(auth(),fileUploadHandler(),validateRequest(VendorValidations.updateVendorZodSchema),VendorController.updateVendor)
    .delete(auth(),VendorController.deleteVendor);

export const VendorRoutes = router;
