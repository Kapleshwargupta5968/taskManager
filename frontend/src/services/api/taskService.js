import axiosInstance from "./axiosInstance";

export const createTask = async (task) => {
    const response = await axiosInstance.post("/todo/create", task);
    return response.data;
};
export const getTasks = async () => {
    const response = await axiosInstance.get("/todo/getTasks");
    return response.data;
};
export const updateTask = async (id, task) => {
    const response = await axiosInstance.put(`/todo/update/${id}`, task);
    return response.data;
};
export const deleteTask = async (id) => {
    const response = await axiosInstance.delete(`/todo/delete/${id}`);
    return response.data;
};