// import axiosPublic from "../hooks/useAxiosPublic";
import axiosSecure from ".";
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "user",
    pro_user: "false",
    status: "Verified",
  };

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};

export const getToken = async (email) => {
  const { data } = await axiosSecure.post(`/jwt`, { email });
  console.log("token generated=>", data);
  return data;
};

export const clearCookie = async () => {
  console.log("hello");
  const { data } = await axiosSecure.get(`/logout`);
  return data;
};
