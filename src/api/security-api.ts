import { instance } from "./api";

type GetCaptchResponseType = {
  url: string;
};

export const securityAPI = {
  getCaptcha() {
    return instance
      .get<GetCaptchResponseType>("security/get-captcha-url")
      .then((response) => response.data);
  },
};
