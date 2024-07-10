import Prompt from "prompt-sync";
import * as fs from "fs";

import { pathLivros, listarLivros, livros } from "../Util";
import { CRUDLivro } from "./CrudLivro";

export class Livro implements CRUDLivro {
  constructor(
    private _titulo: string,
    private _autor: string,
    private _ISNB: number,
    private _anoDePublicacao: number
  ) {}

  get ISNB() {
    return this._ISNB;
  }

  set ISNB(ISNB: number) {
    this._ISNB = ISNB;
  }

  get titulo() {
    return this._titulo;
  }

  set titulo(titulo: string) {
    this._titulo = titulo;
  }

  get autor() {
    return this._autor;
  }

  set autor(autor: string) {
    this._autor = autor;
  }

  get anoDePublicacao() {
    return this._anoDePublicacao;
  }

  set anoDePublicacao(anoDePublicacao: number) {
    this._anoDePublicacao = anoDePublicacao;
  }

  public cadastrar(
    titulo: string,
    autor: string,
    ISNB: number,
    anoDePublicacao: number
  ): void {
    const novoLivro = new Livro(titulo, autor, ISNB, anoDePublicacao);
    const novoArray = [...livros, novoLivro];

    fs.writeFileSync(pathLivros, JSON.stringify(novoArray));
    console.log("Livro cadastrado com sucesso!");
  }

  public listar(): void {
    console.log(listarLivros());
  }

  public remover(ISNB: number): void {
    const livrosAtualizados = listarLivros();
    const index = livrosAtualizados.findIndex(
      (livro: Livro) => livro._ISNB === ISNB
    );

    if (index === -1) {
      console.log("Livro não encontrado!");
      return;
    }

    livros.splice(index, 1);

    fs.writeFileSync(pathLivros, JSON.stringify(livros));
    console.log("Livro removido com sucesso!");
  }

  public atualizar(ISNB: number): void {
    const teclado = Prompt();

    const livrosAtualizados = listarLivros();
    const index = livrosAtualizados.findIndex(
      (livro: Livro) => livro._ISNB === ISNB
    );

    if (index === -1) {
      console.log("Livro não encontrado!");
      return;
    }

    const tituloNovo = teclado("Digite o novo título do livro: ");
    const autorNovo = teclado("Digite o novo autor do livro: ");
    const ISNBNovo = +teclado("Digite o novo ISNB do livro: ");
    const anoDePublicacaoNovo = +teclado(
      "Digite o novo ano de publicação do livro: "
    );

    livros[index] = new Livro(
      tituloNovo,
      autorNovo,
      ISNBNovo,
      anoDePublicacaoNovo
    );

    fs.writeFileSync(pathLivros, JSON.stringify(livros));

    console.log("Livro atualizado com sucesso!");
  }
}
