import QueryBuilder from '../../builder/QueryBuilder';
import { BlogModel, IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (blog: IBlog): Promise<IBlog> => {
    const result = await Blog.create(blog);
    return result;
};


const getAllBlogs = async (query: any) => {
    const blogQuery = new QueryBuilder(Blog.find({status:"active"}), query).paginate().fields().sort().search(['headline']).filter()
    const [blogs, paginationInfo] = await Promise.all([blogQuery.modelQuery.lean(), blogQuery.getPaginationInfo()]);
    return { blogs, paginationInfo };
};


const getSingleBlog = async (id: string) => {
    const result = await Blog.findById(id);
    return result;
};

const updateBlog = async (id: string, payload: IBlog) => {
    const result = await Blog.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

const deleteBlog = async (id: string) => {
    const result = await Blog.findByIdAndUpdate(id, { status: 'delete' }, { new: true });
    return result;
};




export const BlogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
