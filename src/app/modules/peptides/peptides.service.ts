import { IPeptides } from './peptides.interface';
import { Peptides } from './peptides.model';


const createPeptides = async (peptides: IPeptides): Promise<IPeptides> => {
    const result = await Peptides.create(peptides);
    return result;
};


const getAllPeptides = async () => {
    const result = await Peptides.find({ status: 'active' },{name:1,_id:1}).sort({ createdAt: -1 });
    return result;
};


const updatePeptides = async (id: string, payload: IPeptides): Promise<IPeptides | null> => {
    const result = await Peptides.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};


const deletePeptides = async (id: string): Promise<IPeptides | null> => {
    const result = await Peptides.findByIdAndUpdate(id, { status: 'delete' }, { new: true });
    return result;
};



export const PeptidesServices = {
    createPeptides,
    getAllPeptides,
    updatePeptides,
    deletePeptides
};
