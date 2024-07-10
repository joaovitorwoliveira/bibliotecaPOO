import * as fs from "fs";

import {
  pathEmprestimosHistorico,
  pathEmprestimosAtivos,
  listarEmprestimosAtivos,
  listarEmprestimosHistorico,
} from "../Util";
import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
  constructor(
    private _livro: Livro,
    private _membro: Membro,
    private _dataDeInicio: string,
    private _dataDeFim: string,
    private _id: number
  ) {}

  get livro() {
    return this._livro;
  }

  get membro() {
    return this._membro;
  }

  get dataDeInicio() {
    return this._dataDeInicio;
  }

  get dataDeFim() {
    return this._dataDeFim;
  }

  get id() {
    return this._id;
  }

  set livro(livro: Livro) {
    this._livro = livro;
  }

  set membro(membro: Membro) {
    this._membro = membro;
  }

  set dataDeInicio(dataDeInicio: string) {
    this._dataDeInicio = dataDeInicio;
  }

  set dataDeFim(dataDeFim: string) {
    this._dataDeFim = dataDeFim;
  }

  set id(id: number) {
    this._id = id;
  }

  public cadastrar(
    livro: Livro,
    membro: Membro,
    dataDeInicio: string,
    dataDeFim: string,
    id: number
  ): void {
    const novoEmprestimo = new Emprestimo(
      livro,
      membro,
      dataDeInicio,
      dataDeFim,
      id
    );

    const emprestimosHistoricoAtualizado = listarEmprestimosHistorico();

    const novoArrayHistorico = [
      ...emprestimosHistoricoAtualizado,
      novoEmprestimo,
    ];
    fs.writeFileSync(
      pathEmprestimosHistorico,
      JSON.stringify(novoArrayHistorico)
    );

    const emprestimosAtivosAtualizados = listarEmprestimosAtivos();

    const novoArrayAtivos = [...emprestimosAtivosAtualizados, novoEmprestimo];
    fs.writeFileSync(pathEmprestimosAtivos, JSON.stringify(novoArrayAtivos));

    console.log("Empréstimo realizado com sucesso!");
  }

  public devolver(id: number): void {
    const emprestimosAtivosAtualizados = listarEmprestimosAtivos();

    const index = emprestimosAtivosAtualizados.findIndex(
      (emprestimo: Emprestimo) => emprestimo.id === id
    );

    if (index === -1) {
      console.log("Emprestimo não encontrado!");
      return;
    }

    emprestimosAtivosAtualizados.splice(index, 1);

    fs.writeFileSync(
      pathEmprestimosAtivos,
      JSON.stringify(emprestimosAtivosAtualizados)
    );

    console.log("Devolução realizada com sucesso!");
  }
}
