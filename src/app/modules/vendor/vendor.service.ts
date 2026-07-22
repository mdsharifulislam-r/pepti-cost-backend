import QueryBuilder from '../../builder/QueryBuilder';
import { Peptides } from '../peptides/peptides.model';
import { IVendor } from './vendor.interface';
import { Vendor } from './vendor.model';
import xlsx from 'xlsx';
import path from 'path';
import { kafkaProducer } from '../../../tools/kafka/kafka-producers/kafka.producer';
import AggregateQueryBuilder from '../../builder/AggrigateQueryBuilder';
const createVendorIntoDB = async (vendor: IVendor): Promise<IVendor> => {
    const totalPrice = Number((vendor.price_per_unit * vendor.unit).toFixed(2))
    vendor.total_price = totalPrice

    if(vendor.has_discount){
        vendor.discounted_price = Number((totalPrice - (totalPrice * ((vendor?.discount_amount||0) / 100))).toFixed(2))
    }
    if(vendor.peptide){
        const peptide = await Peptides.findOne({
            name:{
                $regex:vendor.peptide,
                $options:'i'
            }
        })

        if(peptide){
            vendor.peptide = peptide._id
            vendor.peptide_str = peptide.name
        }else{
            vendor.peptide_str = vendor.peptide as any
        }
    }
    const result = await Vendor.create(vendor);
    return result;
};


const getAllVendorsFromDB = async (query:Record<string, any>) => {
    const vendorQuery = new QueryBuilder(Vendor.find({status:"active"}), query).paginate().fields().sort().search(['name','peptide_str']).filter()
    const [vendors, paginationInfo] = await Promise.all([vendorQuery.modelQuery.exec(), vendorQuery.getPaginationInfo()]);
    return { vendors, paginationInfo };
};



const getSingleVendorFromDB = async (id: string): Promise<IVendor | null> => {
    const result = await Vendor.findById(id);
    return result;
};


const updateVendorIntoDB = async (id: string, payload: IVendor): Promise<IVendor | null> => {
    const result = await Vendor.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

const deleteVendorFromDB = async (id: string): Promise<IVendor | null> => {
    const result = await Vendor.findByIdAndDelete(id);
    return result;
};


const buldVendorsFromExcel = async (file: any) => {
    const filePath = path.join(process.cwd(), 'uploads', file);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    await Promise.all(
        data.map(async (vendor: any) => {
            const result = await kafkaProducer.sendMessage('peptide',{type:'create',data:vendor})
            return result;
        })
    )
}

const getLowestPricePeptidesForToday = async () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const vendors = await Vendor.find({
        createdAt: { $gte: date },
        status: "active",
    },{name:1,price_per_unit:1,discount_amount:1,peptide_str:1}).sort({ price_per_unit: 1, discount_amount: -1 }).limit(8);
    return vendors;
}


const getBiggestSavingForToday = async () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const vendors = await Vendor.find({
        createdAt: { $gte: date },
        status: "active",
        has_discount: true
    },{peptide_str:1,discount_amount:1}).sort({ discount_amount: -1 }).limit(8);
    return vendors;
}

const getTopRatedVendorsForToday = async () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const vendors = await Vendor.find({
        createdAt: { $gte: date },
        status: "active",
    },{name:1,rating:1}).sort({ rating: -1 }).limit(5);
    return vendors;
}


const getPeptidesDetails = async ()=>{

    const peptides = await Vendor.aggregate([
        {
            $group: {
                _id: "$peptide",
                name: { $first: "$peptide_str" },
                count: { $sum: 1 },
                minPrice: { $min: "$price_per_unit" },
                maxDiscount: { $max: "$discount_amount" },
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                count: 1,
                minPrice: 1,
                maxDiscount: 1,
            }
        }
    ])
    return peptides
}

const getVendorList = async (query:Record<string, any>) => {
    const vendorQuery = new AggregateQueryBuilder(Vendor, query).paginate().sort()
    vendorQuery.insertCustomStage([
        {
            $group:{
                _id:"$name",
                name:{$first:"$name"},
                count:{$sum:1},
                about:{$first:"$about"},
                rating:{$first:"$rating"},
                total_reviews:{$first:"$total_reviews"},
                website_url:{$first:"$website_url"},
                minPrice:{$min:"$price_per_unit"},
                quality:{$first:"$quality"},
                has_discount:{$first:"$has_discount"},
                discount_amount:{$first:"$discount_amount"},
                is_verified:{$first:"$is_verified"},
                coupon_code:{$first:"$coupon_code"},
            }
        }
    ])
    const [vendors, paginationInfo] = await Promise.all([vendorQuery.exec(), vendorQuery.getPaginationInfo()]);
    return { vendors, paginationInfo };
};





export const VendorServices = {
    createVendorIntoDB,
    getAllVendorsFromDB,
    getSingleVendorFromDB,
    updateVendorIntoDB,
    deleteVendorFromDB,
    buldVendorsFromExcel,
    getLowestPricePeptidesForToday,
    getBiggestSavingForToday,
    getTopRatedVendorsForToday,
    getPeptidesDetails,
    getVendorList
};
