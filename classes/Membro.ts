import Prompt from "prompt-sync";
import * as fs from "fs";

import { Pessoa } from "./Pessoa";
import { listarMembros, membros, pathMembros } from "../Util";
import { CRUDMembro } from "./CrudMembro";

export class Membro extends Pessoa implements CRUDMembro {
  constructor(
    nome: string,
    endereco: string,
    numeroDeTelefone: number,
    private _numeroDeMatricula: number
  ) {
    super(nome, endereco, numeroDeTelefone);
  }

  get numeroDeMatricula(): number {
    return this._numeroDeMatricula;
  }

  set numeroDeMatricula(numeroDeMatricula: number) {
    this._numeroDeMatricula = numeroDeMatricula;
  }

  public cadastrar(
    nome: string,
    endereco: string,
    numeroDeTelefone: number,
    numeroDeMatricula: number
  ): void {
    const novoMembro = new Membro(
      nome,
      endereco,
      numeroDeTelefone,
      numeroDeMatricula
    );
    const novoArray = [...membros, novoMembro];

    fs.writeFileSync(pathMembros, JSON.stringify(novoArray));
    console.log("Membro cadastrado com sucesso!");
  }

  public listar(): void {
    console.log(listarMembros());
  }

  public remover(numeroDeMatricula: number): void {
    const membrosAtualizados = listarMembros();
    const index = membrosAtualizados.findIndex(
      (membro: Membro) => membro.numeroDeMatricula === numeroDeMatricula
    );

    if (index === -1) {
      console.log("Membro não encontrado!");
      return;
    }

    membros.splice(index, 1);

    fs.writeFileSync(pathMembros, JSON.stringify(membros));
    console.log("Membro removido com sucesso!");
  }

  public atualizar(numeroDeMatricula: number): void {
    const teclado = Prompt();

    const membrosAtualizados = listarMembros();
    const index = membrosAtualizados.findIndex(
      (membro: Membro) => membro.numeroDeMatricula === numeroDeMatricula
    );

    if (index === -1) {
      console.log("Membro não encontrado!");
      return;
    }

    const nomeNovo = teclado("Digite o novo nome: ");
    const enderecoNovo = teclado("Digite o novo endereço: ");
    const numeroDeTelefoneNovo = +teclado("Digite o novo numero de telefone: ");
    const numeroDeMatriculaNovo = +teclado(
      "Digite o novo numero de matrícula: "
    );

    membros[index] = new Membro(
      nomeNovo,
      enderecoNovo,
      numeroDeTelefoneNovo,
      numeroDeMatriculaNovo
    );

    fs.writeFileSync(pathMembros, JSON.stringify(membros));

    console.log("Membro atualizado com sucesso!");
  }
}
