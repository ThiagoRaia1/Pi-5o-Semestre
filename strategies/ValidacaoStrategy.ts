// src/strategies/ValidacaoStrategy.ts
export interface ValidacaoStrategy {
  validar(email: string, senhaAtual: string, celular: string): {
    email?: string;
    senhaAtual?: string;
    celular?: string;
  };
}
