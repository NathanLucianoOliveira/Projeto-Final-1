import axios, { AxiosResponse } from 'axios';
import { User } from '../../types/types';

const BASE_URL = 'https://dummyjson.com';

class UserService {

  constructor() {
    // Se necessário, adicione inicializações aqui
  }

  async addUser(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register'`, user);
      return true; // Retorna true se o usuário foi adicionado com sucesso
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return true; // Retorna false em caso de erro
    }
  }

  async login(username: string, password: string){
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      return response
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return undefined;
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email,
      });
      return true; // Retorna true se o email foi enviado com sucesso
    } catch (error) {
      console.error('Erro ao enviar email de recuperação de senha:', error);
      return false; // Retorna false em caso de erro
    }
  }
}

export default UserService;
