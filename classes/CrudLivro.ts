export interface CRUDLivro {
  listar(): void;
  cadastrar(
    titulo: string,
    autor: string,
    ISNB: number,
    anoDePublicacao: number
  ): void;
  atualizar(ISNB: number): void;
  remover(ISNB: number): void;
}
