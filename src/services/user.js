import { URL_BACK } from "../environment";

export const RegisterUser = async (user) => {
  try {
    const response = await fetch(`${URL_BACK}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ListUsers = async () => {
  try {
    const response = await fetch(`${URL_BACK}/api/user`);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
