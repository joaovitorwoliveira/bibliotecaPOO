import * as fs from "fs";
import { Emprestimo } from "../classes/Emprestimo";
import { Livro } from "../classes/Livro";
import { Membro } from "../classes/Membro";
import {
  pathEmprestimosHistorico,
  pathEmprestimosAtivos,
  listarEmprestimosAtivos,
  listarEmprestimosHistorico,
} from "../Util";

jest.mock("prompt-sync", () => {
  return jest.fn().mockImplementation(() => {
    return jest.fn().mockImplementationOnce(() => "Novo Título");
  });
});

describe("Emprestimo", () => {
  let emprestimosHistoricoBackup: string;
  let emprestimosAtivosBackup: string;

  beforeAll(() => {
    emprestimosHistoricoBackup = fs.readFileSync(
      pathEmprestimosHistorico,
      "utf-8"
    );
    emprestimosAtivosBackup = fs.readFileSync(pathEmprestimosAtivos, "utf-8");
  });

  afterEach(() => {
    fs.writeFileSync(pathEmprestimosHistorico, emprestimosHistoricoBackup);
    fs.writeFileSync(pathEmprestimosAtivos, emprestimosAtivosBackup);
  });

  afterAll(() => {
    fs.writeFileSync(pathEmprestimosHistorico, emprestimosHistoricoBackup);
    fs.writeFileSync(pathEmprestimosAtivos, emprestimosAtivosBackup);
  });

  it("deve cadastrar um novo emprestimo", () => {
    const livro = new Livro("O Hobbit", "Tolkien", 111, 2000);
    const membro = new Membro(
      "Erick Heineken",
      "Na frente do Treichel",
      99999999,
      12345
    );
    const emprestimo = new Emprestimo(
      livro,
      membro,
      "10/12/2024",
      "22/12/2024",
      888
    );

    emprestimo.cadastrar(livro, membro, "10/12/2024", "22/12/2024", 888);

    const emprestimosHistoricoAtualizados = listarEmprestimosHistorico();
    const emprestimosAtivosAtualizados = listarEmprestimosAtivos();

    const indexHistorico = emprestimosHistoricoAtualizados.findIndex(
      (emprestimo: Emprestimo) => emprestimo.id === 888
    );

    const indexAtivo = emprestimosAtivosAtualizados.findIndex(
      (emprestimo: Emprestimo) => emprestimo.id === 888
    );

    const emprestimoHistoricoEncontrado =
      emprestimosHistoricoAtualizados[indexHistorico];
    const emprestimoAtivoEncontrado = emprestimosAtivosAtualizados[indexAtivo];

    expect(emprestimoHistoricoEncontrado).toBeTruthy();
    expect(emprestimoAtivoEncontrado).toBeTruthy();
    expect(emprestimoAtivoEncontrado?.livro.titulo).toBe("O Hobbit");
    expect(emprestimoAtivoEncontrado?.membro.nome).toBe("Erick Heineken");
    expect(emprestimoAtivoEncontrado?.dataDeInicio).toBe("10/12/2024");
    expect(emprestimoAtivoEncontrado?.dataDeFim).toBe("22/12/2024");
  });

  it("deve remover um emprestimo existente", () => {
    const livro = new Livro("O Hobbit", "Tolkien", 111, 2000);
    const membro = new Membro(
      "Erick Heineken",
      "Na frente do Treichel",
      99999999,
      12345
    );
    const emprestimo = new Emprestimo(
      livro,
      membro,
      "10/12/2024",
      "22/12/2024",
      888
    );

    emprestimo.cadastrar(livro, membro, "10/12/2024", "22/12/2024", 888);
    emprestimo.devolver(888);

    const emprestimosAtivosAtualizados = listarEmprestimosAtivos();
    const emprestimoAtivoEncontrado = emprestimosAtivosAtualizados.find(
      (e: Emprestimo) => e.id === 888
    );

    expect(emprestimoAtivoEncontrado).toBeFalsy();
  });
});
