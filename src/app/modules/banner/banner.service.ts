import { BannerModel, IBanner } from './banner.interface';
import { Banner } from './banner.model';

const createBanner = async (payload: IBanner) => {
    const result = await Banner.create(payload);
    return result;
}

const getAllBanners = async () => {
    const result = await Banner.find({ status: "active" }).sort({ createdAt: 1 });
    return result;
}

const getSingleBanner = async (id: string) => {
    const result = await Banner.findById(id);
    return result;
}

const updateBanner = async (id: string, payload: IBanner) => {
    const result = await Banner.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteBanner = async (id: string) => {
    const result = await Banner.findByIdAndUpdate(id, { status: 'delete' }, { new: true });
    return result;
}



export const BannerServices = { createBanner, getAllBanners, getSingleBanner, updateBanner, deleteBanner };
