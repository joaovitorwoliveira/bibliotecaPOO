import * as fs from "fs";
import { Membro } from "../classes/Membro";
import { pathMembros, listarMembros, membros } from "../Util";

jest.mock("prompt-sync", () => {
  return jest.fn().mockImplementation(() => {
    return jest
      .fn()
      .mockImplementationOnce(() => "Novo Nome")
      .mockImplementationOnce(() => "Novo Endereço")
      .mockImplementationOnce(() => "999999999")
      .mockImplementationOnce(() => "98765");
  });
});

describe("Membro", () => {
  let membrosBackup: string;

  beforeAll(() => {
    membrosBackup = fs.readFileSync(pathMembros, "utf-8");
  });

  afterEach(() => {
    fs.writeFileSync(pathMembros, membrosBackup);
  });

  afterAll(() => {
    fs.writeFileSync(pathMembros, membrosBackup);
  });

  it("deve cadastrar um novo membro", () => {
    const membro = new Membro("Nome A", "Endereço A", 123456789, 99999);
    membro.cadastrar("Nome A", "Endereço A", 123456789, 99999);

    const membrosAtualizados = listarMembros();

    const index = membrosAtualizados.findIndex(
      (membro: Membro) => membro.numeroDeMatricula === 99999
    );

    const membroEncontrado = membrosAtualizados[index];

    expect(membroEncontrado).toBeTruthy();
    expect(membroEncontrado?.nome).toBe("Nome A");
    expect(membroEncontrado?.endereco).toBe("Endereço A");
    expect(membroEncontrado?.numeroDeTelefone).toBe(123456789);
    expect(membroEncontrado?.numeroDeMatricula).toBe(99999);
  });

  it("deve remover um membro existente", () => {
    const membro = new Membro("Nome B", "Endereço B", 987654321, 54321);
    membro.cadastrar("Nome B", "Endereço B", 987654321, 54321);
    membro.remover(54321);

    const membrosAtualizados = listarMembros();
    const membroEncontrado = membrosAtualizados.find(
      (membro) => membro.numeroDeMatricula === 54321
    );
    expect(membroEncontrado).toBeFalsy();
  });

  it("deve atualizar um membro existente", () => {
    const membro = new Membro("Nome C", "Endereço C", 123123123, 67890);
    membro.cadastrar("Nome C", "Endereço C", 123123123, 67890);

    membro.atualizar(67890);

    const membrosAtualizados = listarMembros();
    const membroEncontrado = membrosAtualizados.find(
      (membro) => membro.numeroDeMatricula === 98765
    );

    expect(membroEncontrado).toBeTruthy();
    expect(membroEncontrado?.nome).toBe("Novo Nome");
    expect(membroEncontrado?.endereco).toBe("Novo Endereço");
    expect(membroEncontrado?.numeroDeTelefone).toBe(999999999);
    expect(membroEncontrado?.numeroDeMatricula).toBe(98765);
  });

  it("deve listar os membros", () => {
    const membrosListados = listarMembros();

    const membrosEsperados = JSON.parse(membrosBackup).map((membro: any) => ({
      _nome: membro._nome,
      _endereco: membro._endereco,
      _numeroDeTelefone: membro._numeroDeTelefone,
      _numeroDeMatricula: membro._numeroDeMatricula,
    }));

    const membrosListadosSimplificados = membrosListados.map(
      (membro: Membro) => ({
        _nome: membro.nome,
        _endereco: membro.endereco,
        _numeroDeTelefone: membro.numeroDeTelefone,
        _numeroDeMatricula: membro.numeroDeMatricula,
      })
    );

    expect(membrosListadosSimplificados).toEqual(membrosEsperados);
  });
});
