import QueryBuilder from '../../builder/QueryBuilder';
import { IPeptideInfo, PeptideInfoModel } from './peptideInfo.interface';
import { PeptideInfo } from './peptideInfo.model';

const createPeptideInfo = async (peptideInfo: IPeptideInfo): Promise<IPeptideInfo> => {
  const result = await PeptideInfo.create(peptideInfo);
  return result;
};

const getAllPeptideInfo = async (query: any) => {
  const peptideInfoQuery = new QueryBuilder(PeptideInfo.find({ status: 'active' }), query)
    .paginate()
    .fields()
    .sort()
    .search(['headline'])
    .filter();

  const [peptideInfos, paginationInfo] = await Promise.all([
    peptideInfoQuery.modelQuery.lean(),
    peptideInfoQuery.getPaginationInfo(),
  ]);

  return { peptideInfos, paginationInfo };
};

const getSinglePeptideInfo = async (id: string) => {
  const result = await PeptideInfo.findById(id);
  return result;
};

const updatePeptideInfo = async (id: string, payload: IPeptideInfo) => {
  const result = await PeptideInfo.findOneAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

const deletePeptideInfo = async (id: string) => {
  const result = await PeptideInfo.findByIdAndUpdate(id, { status: 'delete' }, { new: true });
  return result;
};

export const PeptideInfoServices = {
  createPeptideInfo,
  getAllPeptideInfo,
  getSinglePeptideInfo,
  updatePeptideInfo,
  deletePeptideInfo,
};
