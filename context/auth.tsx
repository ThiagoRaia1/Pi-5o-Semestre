import React, { createContext, useContext, useState } from "react";
import { router } from "expo-router";
import { autenticarLogin } from "./api";

export interface IAluno {
  login: string;
  nome: string;
  cpf: string;
  sexo: string;
  celular: string;
  dataNascimento: Date;
  senha: string;
}

interface IAuthContext {
  usuario: IAluno;
  setUsuario: (usuario: IAluno) => void;
  handleLogin: (senha: string) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<IAluno>({
    login: "",
    nome: "",
    cpf: "",
    sexo: "",
    celular: "",
    dataNascimento: new Date(0),
    senha: "",
  });

  async function handleLogin(senha: string) {
    try {
      const aluno = await autenticarLogin(usuario.login, senha);
      setUsuario(aluno);
      router.push("/menuPrincipal/inicio");
    } catch (erro: any) {
      const mensagem = erro.message || "";

      if (mensagem === "Erro ao autenticar aluno") {
        alert("Login ou senha inválidos");
      } else if (mensagem === "Erro ao buscar dados do aluno") {
        alert("Erro ao buscar dados do aluno");
      } else {
        alert("Erro inesperado ao fazer login");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
