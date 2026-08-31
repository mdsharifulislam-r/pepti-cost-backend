import { Vendor } from '../vendor/vendor.model';
import { Support } from '../support/support.model';
import { Blog } from '../blog/blog.model';
import { Application } from '../application/application.model';

const getAdminStatsFromDB = async () => {
  const vendors = await Vendor.countDocuments({ status: 'active' });
  const supportMessages = await Support.countDocuments();
  const blogs = await Blog.countDocuments({ status: 'active' });
  const applications = await Application.countDocuments({ status: { $ne: 'delete' } });

  return {
    vendors,
    supportMessages,
    blogs,
    applications,
  };
};

const getApplicationGraphDataFromDB = async (yearStr?: string) => {
  const currentYear = new Date().getFullYear();
  let targetYear = currentYear;
  if (yearStr) {
    const parsedYear = parseInt(yearStr, 10);
    if (!isNaN(parsedYear)) {
      targetYear = parsedYear;
    }
  }

  // 1. Yearwise totals
  const yearWiseData = await Application.aggregate([
    {
      $match: {
        status: { $ne: 'delete' },
      },
    },
    {
      $group: {
        _id: { $year: '$createdAt' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id',
        count: 1,
      },
    },
    {
      $sort: { year: 1 },
    },
  ]);

  // 2. Monthly breakdown for targetYear
  const monthlyData = await Application.aggregate([
    {
      $match: {
        status: { $ne: 'delete' },
        createdAt: {
          $gte: new Date(`${targetYear}-01-01T00:00:00.000Z`),
          $lte: new Date(`${targetYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        count: 1,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthlyMap = new Map(monthlyData.map((item) => [item.month, item.count]));

  const monthlyBreakdown = monthNames.map((name, index) => {
    const monthNum = index + 1;
    return {
      month: name,
      count: monthlyMap.get(monthNum) || 0,
    };
  });

  return {
    yearWise: yearWiseData,
    monthlyBreakdown,
  };
};

export const AdminServices = {
  getAdminStatsFromDB,
  getApplicationGraphDataFromDB,
};
