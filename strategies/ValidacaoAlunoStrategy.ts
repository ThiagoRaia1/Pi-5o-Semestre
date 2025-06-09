// src/strategies/ValidacaoAlunoStrategy.ts
import { ValidacaoStrategy } from "./ValidacaoStrategy";

export class ValidacaoAlunoStrategy implements ValidacaoStrategy {
  validar(email: string, senhaAtual: string, celular: string) {
    const erros: {
      email?: string;
      senhaAtual?: string;
      celular?: string;
    } = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const celularRegex = /^\(\d{2}\)\d{5}-\d{4}$/;

    if (!email.trim()) {
      erros.email = "Email é obrigatório.";
    } else if (!emailRegex.test(email)) {
      erros.email = "Email inválido.";
    }

    if (!senhaAtual.trim()) {
      erros.senhaAtual = "A senha atual é obrigatória.";
    }

    if (!celular.trim()) {
      erros.celular = "Celular é obrigatório.";
    } else if (!celularRegex.test(celular)) {
      erros.celular = "Formato inválido\n(99)99999-9999.";
    }

    return erros;
  }
}
