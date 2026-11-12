import { headers } from "next/headers";
import { auth } from "./auth";

const getTokenServer = async () => {
  const token = await auth.api.getToken({
    headers: await headers(),
  });
  const serverToken = token?.token;

  return serverToken;
};

export default getTokenServer;
