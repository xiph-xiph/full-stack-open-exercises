import axios from "axios";
const baseUrl = "/api/blogs";

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`baseUrl/${id}`);
  return response.data;
};

const addNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (objectToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${objectToUpdate.id}`,
    objectToUpdate,
    config,
  );
  return response.data;
};

const remove = async (idToRemove) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${idToRemove}`, config);
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

export default {
  setToken,
  getAll,
  getById,
  addNew,
  update,
  remove,
  addComment,
};
