import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = express.Router();

router.route('/')
    .post(auth(USER_ROLES.SUPER_ADMIN,USER_ROLES.ADMIN),fileUploadHandler(),validateRequest(BlogValidations.createBlogZodSchema),BlogController.createBlog)
    .get(BlogController.getAllBlogs);
router.route('/:id')
    .get(BlogController.getSingleBlog)
    .patch(auth(USER_ROLES.SUPER_ADMIN,USER_ROLES.ADMIN),fileUploadHandler(),BlogController.updateBlog)
    .delete(auth(USER_ROLES.SUPER_ADMIN,USER_ROLES.ADMIN),BlogController.deleteBlog);

export const BlogRoutes = router;
