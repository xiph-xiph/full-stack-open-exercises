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

const addNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
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

export default { setToken, getAll, addNew, update, remove };
