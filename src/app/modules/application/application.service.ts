import QueryBuilder from '../../builder/QueryBuilder';
import { IApplication } from './application.interface';
import { Application } from './application.model';

const createApplication = async (payload: IApplication) => {
    const result = await Application.create(payload);
    return result;
};

const getAllApplications = async (query: Record<string, any>) => {
    const applicationQuery = new QueryBuilder(Application.find({ status: { $ne: 'delete' } }), query).paginate().fields().sort().search(['name', 'email', 'phone', 'company_name']).filter();
    const [applications, paginationInfo] = await Promise.all([applicationQuery.modelQuery.exec(), applicationQuery.getPaginationInfo()]);
    return { applications, paginationInfo };

};

const getSingleApplication = async (id: string) => {
    const result = await Application.findById(id);
    return result;
};

const updateApplication = async (id: string, payload: Partial<IApplication>) => {
    const result = await Application.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteApplication = async (id: string) => {
    const result = await Application.findByIdAndUpdate(id, { status: 'delete' }, { new: true });
    return result;
};

export const ApplicationServices = {
    createApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication,
};
