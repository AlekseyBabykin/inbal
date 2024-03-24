import $api from "../http";

export default class AuthService {
  static async signin(email, password) {
    return $api.post("/user/signin", { email, password });
  }

  static async signup(email, password) {
    return $api.post("/user/signup", { email, password });
  }

  static async logout() {
    return $api.post("/user/logout");
  }
  static async activate(email, password, otpPassword) {
    return $api.post("/user/activate", { email, password, otpPassword });
  }
}
