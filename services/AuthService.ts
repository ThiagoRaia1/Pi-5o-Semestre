// services/AuthService.ts
import { IAluno } from "../context/auth";
import { autenticarLogin } from "../context/api";
import { router } from "expo-router";

class AuthService {
  private static instance: AuthService;
  private usuario: IAluno | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(login: string, senha: string): Promise<IAluno> {
    const aluno = await autenticarLogin(login, senha);
    this.usuario = aluno;
    router.push("/menuPrincipal/inicio");
    return aluno;
  }

  logout() {
    this.usuario = null;
    router.push("/");
  }

  getUsuario(): IAluno | null {
    return this.usuario;
  }
}

export default AuthService.getInstance();
