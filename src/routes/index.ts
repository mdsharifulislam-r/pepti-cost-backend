import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { VendorRoutes } from '../app/modules/vendor/vendor.route';
import { PeptidesRoutes } from '../app/modules/peptides/peptides.route';
import { BlogRoutes } from '../app/modules/blog/blog.route';
import { DisclaimerRoutes } from '../app/modules/disclaimer/disclaimer.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { BannerRoutes } from '../app/modules/banner/banner.route';
import { SupportRoutes } from '../app/modules/support/support.route';
import { ApplicationRoutes } from '../app/modules/application/application.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/vendor',
    route: VendorRoutes,
  },
  {
    path: '/peptides',
    route: PeptidesRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: "/disclaimer",
    route: DisclaimerRoutes
  },
  {
    path: "/faq",
    route: FaqRoutes
  },
  {
    path: "/banner",
    route: BannerRoutes
  },
  {
    path: "/support",
    route: SupportRoutes
  },
  {
    path: "/application",
    route: ApplicationRoutes
  }
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
