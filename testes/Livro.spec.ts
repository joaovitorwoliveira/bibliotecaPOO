import * as fs from "fs";
import { Livro } from "../classes/Livro";
import { pathLivros, listarLivros, livros } from "../Util";

jest.mock("prompt-sync", () => {
  return jest.fn().mockImplementation(() => {
    return jest
      .fn()
      .mockImplementationOnce(() => "Novo Título")
      .mockImplementationOnce(() => "Novo Autor")
      .mockImplementationOnce(() => "789")
      .mockImplementationOnce(() => "2022");
  });
});

describe("Livro", () => {
  let livrosBackup: string;

  beforeAll(() => {
    livrosBackup = fs.readFileSync(pathLivros, "utf-8");
  });

  afterEach(() => {
    fs.writeFileSync(pathLivros, livrosBackup);
  });

  afterAll(() => {
    fs.writeFileSync(pathLivros, livrosBackup);
  });

  it("deve cadastrar um novo livro", () => {
    const livro = new Livro("Título A", "Autor A", 123, 2020);
    livro.cadastrar("Título A", "Autor A", 123, 2020);

    const livrosAtualizados = listarLivros();

    const index = livrosAtualizados.findIndex(
      (livro: Livro) => livro.ISNB === 123
    );

    const livroEncontrado = livrosAtualizados[index];

    expect(livroEncontrado).toBeTruthy();
    expect(livroEncontrado?.titulo).toBe("Título A");
    expect(livroEncontrado?.autor).toBe("Autor A");
    expect(livroEncontrado?.anoDePublicacao).toBe(2020);
  });

  it("deve remover um livro existente", () => {
    const livro = new Livro("Título B", "Autor B", 456, 2021);
    livro.cadastrar("Título B", "Autor B", 456, 2021);
    livro.remover(456);

    const livrosAtualizados = listarLivros();
    const livroEncontrado = livrosAtualizados.find(
      (livro) => livro.ISNB === 456
    );
    expect(livroEncontrado).toBeFalsy();
  });

  it("deve atualizar um livro existente", () => {
    const livro = new Livro("Título C", "Autor C", 321, 2020);
    livro.cadastrar("Título C", "Autor C", 321, 2021);

    livro.atualizar(321);

    const livrosAtualizados = listarLivros();
    const livroEncontrado = livrosAtualizados.find(
      (livro) => livro.ISNB === 789
    );

    expect(livroEncontrado).toBeTruthy();
    expect(livroEncontrado?.titulo).toBe("Novo Título");
    expect(livroEncontrado?.autor).toBe("Novo Autor");
    expect(livroEncontrado?.anoDePublicacao).toBe(2022);
  });

  it("deve listar os livros", () => {
    const livrosListados = listarLivros();

    const livrosEsperados = JSON.parse(livrosBackup).map((livro: any) => ({
      _titulo: livro._titulo,
      _autor: livro._autor,
      _ISNB: livro._ISNB,
      _anoDePublicacao: livro._anoDePublicacao,
    }));

    const livrosListadosSimplificados = livrosListados.map((livro: Livro) => ({
      _titulo: livro.titulo,
      _autor: livro.autor,
      _ISNB: livro.ISNB,
      _anoDePublicacao: livro.anoDePublicacao,
    }));

    expect(livrosListadosSimplificados).toEqual(livrosEsperados);
  });
});
