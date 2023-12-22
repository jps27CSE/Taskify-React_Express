import axios from "axios";

export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "user",
    pro_user: "false",
    status: "Verified",
  };

  const { data } = await axios.put(
    `http://localhost:5000/users/${user?.email}`,
    currentUser
  );

  return data;
};

export const getToken = async (email) => {
  const { data } = await axios.post(`/jwt`, { email });
  console.log("token generated=>", data);
  return data;
};

export const clearCookie = async () => {
  console.log("hello");
  const { data } = await axios.get(`/logout`);
  return data;
};

// Get All Users
export const getAllUsers = async () => {
  const { data } = await axios(`/users`);
  return data;
};
