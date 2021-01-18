import originAxios from "axios";

export default function request(config) {
  const instance = originAxios.create({
    baseURL: "http://localhost:3300/"
  });
  return instance(config);
}
