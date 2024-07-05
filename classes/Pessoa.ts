export abstract class Pessoa {
  constructor(
    protected _nome: string,
    protected _endereco: string,
    protected _numeroDeTelefone: number
  ) {}

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get endereco(): string {
    return this._endereco;
  }

  set endereco(endereco: string) {
    this._endereco = endereco;
  }

  get numeroDeTelefone(): number {
    return this._numeroDeTelefone;
  }

  set numeroDeTelefone(numeroDeTelefone: number) {
    this._numeroDeTelefone = numeroDeTelefone;
  }
}
