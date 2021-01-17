import originAxios from "axios";

export default function request(config) {
  const instance = originAxios.create({
    // baseURL: "http://10.10.28.62:3300/"
    baseURL: "http://localhost:3300/"
  });
  return instance(config);
}
