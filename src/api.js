import * as ax from "axios";
export const BASE_URL = "https://limo-service-bacend-3.onrender.com/";
const axios = ax.default.create({
  baseURL: BASE_URL,
});
export async function getVehicles(page = 1, limit = 5) {
  const { data } = await axios.get(`/vehicle?page=${page}&limit=${limit}`);
  return data;
}

export async function getVehicle(id) {
  const { data } = await axios.get(`/vehicle/${id}`);
  return data;
}
export async function getBlogs(page = 1, limit = 5) {
  const { data } = await axios.get(`/blog?page=${page}&limit=${limit} `);
  return data;
}

export async function getBlog(id) {
  const { data } = await axios.get(`/blog/${id}`);
  return data;
}

export async function postReservation(body) {
  const { data } = await axios.post(`/book`, body);
  return data;
}
export async function postComment(body) {
  const { data } = await axios.post(`/comment`, body);
  return data;
}
export async function getComments(blogId, page = 1, limit = 5) {
  const { data } = await axios.get(
    `/comment/${blogId}?page=${page}&limit=${limit} `
  );
  return data;
}
