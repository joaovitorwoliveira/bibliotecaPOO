import * as fs from "fs";
import * as path from "path";
import { Livro } from "./classes/Livro";
import { Membro } from "./classes/Membro";
import { Emprestimo } from "./classes/Emprestimo";

export const pathLivros = path.join(
  __dirname,
  "./banco-de-dados",
  "livros.txt"
);
export const dadosLivros = fs.readFileSync(pathLivros, "utf-8");
export const livros = JSON.parse(dadosLivros);

export function listarLivros(): Livro[] {
  const pathLivros = path.join(__dirname, "./banco-de-dados", "livros.txt");
  const dadosLivros = fs.readFileSync(pathLivros, "utf-8");
  const livrosObj = JSON.parse(dadosLivros);

  // Transforma objetos simples em instâncias de Livro
  const livros = livrosObj.map(
    (livro: any) =>
      new Livro(
        livro._titulo,
        livro._autor,
        livro._ISNB,
        livro._anoDePublicacao
      )
  );

  return livros;
}

export const pathMembros = path.join(
  __dirname,
  "./banco-de-dados",
  "membros.txt"
);
export const dadosMembros = fs.readFileSync(pathMembros, "utf-8");
export const membros: Membro[] = JSON.parse(dadosMembros);

export function listarMembros(): Membro[] {
  const pathMembros = path.join(__dirname, "./banco-de-dados", "membros.txt");
  const dadosMembros = fs.readFileSync(pathMembros, "utf-8");
  const membrosObj = JSON.parse(dadosMembros);

  // Transforma objetos simples em instâncias de Membro
  const membros = membrosObj.map(
    (membro: any) =>
      new Membro(
        membro._nome,
        membro._endereco,
        membro._numeroDeTelefone,
        membro._numeroDeMatricula
      )
  );

  return membros;
}

// -------------------------------------------------------------------------

export const pathEmprestimosHistorico = path.join(
  __dirname,
  "./banco-de-dados",
  "emprestimos-historico.txt"
);
export const dadosEmprestimosHistorico = fs.readFileSync(
  pathEmprestimosHistorico,
  "utf-8"
);
export const emprestimosHistorico: any = JSON.parse(dadosEmprestimosHistorico);

export const pathEmprestimosAtivos = path.join(
  __dirname,
  "./banco-de-dados",
  "emprestimos-ativos.txt"
);
export const dadosEmprestimosAtivos = fs.readFileSync(
  pathEmprestimosAtivos,
  "utf-8"
);
export const emprestimosAtivos: any = JSON.parse(dadosEmprestimosAtivos);

export function listarEmprestimosHistorico(): Emprestimo[] {
  const pathEmprestimosHistorico = path.join(
    __dirname,
    "./banco-de-dados",
    "emprestimos-historico.txt"
  );
  const dadosEmprestimosHistorico = fs.readFileSync(
    pathEmprestimosHistorico,
    "utf-8"
  );
  const emprestimosHistorico: any[] = JSON.parse(dadosEmprestimosHistorico);

  const emprestimosHistoricoInstancias = emprestimosHistorico
    .map((emprestimo) => {
      if (!emprestimo._livro || !emprestimo._membro) {
        return null;
      }

      const livro = new Livro(
        emprestimo._livro._titulo,
        emprestimo._livro._autor,
        emprestimo._livro._ISNB,
        emprestimo._livro._anoDePublicacao
      );
      const membro = new Membro(
        emprestimo._membro._nome,
        emprestimo._membro._endereco,
        emprestimo._membro._numeroDeTelefone,
        emprestimo._membro._numeroDeMatricula
      );
      return new Emprestimo(
        livro,
        membro,
        emprestimo._dataDeInicio,
        emprestimo._dataDeFim,
        emprestimo._id
      );
    })
    .filter((emprestimo): emprestimo is Emprestimo => emprestimo !== null);

  return emprestimosHistoricoInstancias;
}
export function formatarEmprestimosHistoricoParaTabela(
  emprestimos: Emprestimo[]
): any[] {
  return emprestimos.map((emprestimo) => ({
    "Livro - Título": emprestimo.livro.titulo,
    "Membro - Nome": emprestimo.membro.nome,
    "Data de Início": emprestimo.dataDeInicio,
    "Data de Fim": emprestimo.dataDeFim,
    "ID do Empréstimo": emprestimo.id,
  }));
}

export function listarEmprestimosAtivos(): Emprestimo[] {
  const pathEmprestimosAtivos = path.join(
    __dirname,
    "./banco-de-dados",
    "emprestimos-ativos.txt"
  );
  const dadosEmprestimosAtivos = fs.readFileSync(
    pathEmprestimosAtivos,
    "utf-8"
  );
  const emprestimosAtivos: any[] = JSON.parse(dadosEmprestimosAtivos);

  const emprestimosAtivosInstancias = emprestimosAtivos
    .map((emprestimo) => {
      if (!emprestimo._livro || !emprestimo._membro) {
        return null;
      }

      const livro = new Livro(
        emprestimo._livro._titulo,
        emprestimo._livro._autor,
        emprestimo._livro._ISNB,
        emprestimo._livro._anoDePublicacao
      );
      const membro = new Membro(
        emprestimo._membro._nome,
        emprestimo._membro._endereco,
        emprestimo._membro._numeroDeTelefone,
        emprestimo._membro._numeroDeMatricula
      );
      return new Emprestimo(
        livro,
        membro,
        emprestimo._dataDeInicio,
        emprestimo._dataDeFim,
        emprestimo._id
      );
    })
    .filter((emprestimo): emprestimo is Emprestimo => emprestimo !== null); // Filtra os empréstimos inválidos

  return emprestimosAtivosInstancias;
}

export function formatarEmprestimosAtivosParaTabela(
  emprestimos: Emprestimo[]
): any[] {
  return emprestimos.map((emprestimo) => ({
    "Livro - Título": emprestimo.livro.titulo,
    "Membro - Nome": emprestimo.membro.nome,
    "Data de Início": emprestimo.dataDeInicio,
    "Data de Fim": emprestimo.dataDeFim,
    "ID do Empréstimo": emprestimo.id,
  }));
}
