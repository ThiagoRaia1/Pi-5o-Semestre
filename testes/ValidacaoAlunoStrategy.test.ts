// testes/ValidacaoAlunoStrategy.test.ts
import { ValidacaoAlunoStrategy } from "../strategies/ValidacaoAlunoStrategy";

describe("Validação de Aluno", () => {
  it("detecta campos inválidos", () => {
    const strategy = new ValidacaoAlunoStrategy();
    const resultado = strategy.validar("email_invalido", "", "123");

    expect(Object.keys(resultado)).toEqual(["email", "senhaAtual", "celular"]);
  });
});
