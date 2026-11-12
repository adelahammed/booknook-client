import { token } from "./auth-client";

const getTokenClient = async () => {
  const { data, error } = await token();
  const tokenData = data?.token;

  return tokenData;
};

export default getTokenClient;
