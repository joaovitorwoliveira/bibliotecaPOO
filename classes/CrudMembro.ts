export interface CRUDMembro {
  listar(): void;
  cadastrar(
    nome: string,
    endereco: string,
    numeroDeTelefone: number,
    numeroDeMatricula: number
  ): void;
  atualizar(numeroDeMatricula: number): void;
  remover(numeroDeMatricula: number): void;
}
