import axios from 'axios';

axios.defaults.withCredentials = false;

const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/`,
});
//유저관리

export const getUserList = () => api.get(`user`);
export const removeUser = ({id}) =>  api.delete(`user/${id}`);

export const getPostList = ({page}) => api.get(`post?page=${page}`);
export const getPost = ({id}) => api.get(`post/${id}`);
export const createPost = ({post}) => api.post(`post/`, post);
export const updatePost = ({id, post}) => api.put(`post/${id}`, post);
export const removePost = ({id}) => api.delete(`post/${id}`);

export const getCategoryList = () => api.get(`category/`);
export const createCategory = ({category}) => api.post(`category/`, category);
export const deleteCategory = ({id}) => api.delete(`category/${id}`);

export const getSubCategoryList = ({parents}) => api.get(`sub-category?parents=${parents}`);
export const createSubCategory = ({category}) => api.post(`sub-category/`, category);
export const deleteSubCategory = ({id}) => api.delete(`sub-category/${id}`);

export const createAdvert = ({advert}) => api.post(`ad/`, advert);
export const getAdvertList = () => api.get(`ad/`);
export const deleteAdvert = ({id}) => api.delete(`ad/${id}`);


