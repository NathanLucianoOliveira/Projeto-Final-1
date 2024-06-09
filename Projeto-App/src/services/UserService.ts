import { User } from "../types/types";
import { IResponse, http } from "./base";

const BASE_URL = "/usuario";

export class UserService {
  async registrar(user: User) {
    return http.post<IResponse>(`${BASE_URL}/`, user);
  }

  async login(email: string, senha: string) {
    return http.post<IResponse<string>>(`${BASE_URL}/login`, {
      email,
      senha,
    });
  }

  async trocarSenha(email: string) {
    return http.post<IResponse>(`${BASE_URL}/trocar-senha`, {
      email,
    });
  }
}
