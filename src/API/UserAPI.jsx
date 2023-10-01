import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  login: (body) => {
    const url = `/admin/login`;
    return axiosClient.post(url, body);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
