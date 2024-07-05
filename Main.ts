import Prompt from "prompt-sync";

import { Livro } from "./classes/Livro";
import { Membro } from "./classes/Membro";
import { Emprestimo } from "./classes/Emprestimo";

import {
  formatarEmprestimosAtivosParaTabela,
  formatarEmprestimosHistoricoParaTabela,
  listarEmprestimosAtivos,
  listarEmprestimosHistorico,
  listarLivros,
  listarMembros,
  livros,
  membros,
} from "./Util";

const teclado = Prompt();

while (true) {
  console.log("+-------------------------------+");
  console.log("|      BIBLIOTECA AVENIDA       |");
  console.log("|                               |");
  console.log("|       Escolha uma opção       |");
  console.log("+-------------------------------+");
  console.log("| 1. Menu de Livros             |");
  console.log("| 2. Menu de Membros            |");
  console.log("| 3. Menu de Empréstimos        |");
  console.log("| 0. Sair                       |");
  console.log("+-------------------------------+");
  let opcao: number = +teclado("Digite uma opção: ");

  if (opcao == 0) {
    break;
  }
  switch (opcao) {
    case 1:
      while (true) {
        console.log("+-------------------------------+");
        console.log("| 1. Cadastrar Livro            |");
        console.log("| 2. Listar Livros Cadastrados  |");
        console.log("| 3. Atualizar Livro            |");
        console.log("| 4. Remover Livro              |");
        console.log("| 5. Voltar ao Menu Principal   |");
        console.log("+-------------------------------+");
        let opcaoLivro: number = +teclado("Digite uma opção: ");

        if (opcaoLivro == 5) {
          break;
        }

        switch (opcaoLivro) {
          case 1:
            const titulo = teclado("Digite o título do livro: ");
            const autor = teclado("Digite o autor do livro: ");
            const ISNB = +teclado("Digite o ISNB do livro: ");
            const anoDePublicacao = +teclado(
              "Digite o ano de publicação do livro: "
            );
            const livro = new Livro(titulo, autor, ISNB, anoDePublicacao);
            livro.cadastrar(titulo, autor, ISNB, anoDePublicacao);

            console.log("Livro cadastrado com sucesso!");
            break;

          case 2:
            const livrosListados = listarLivros();
            console.table(livrosListados);
            break;

          case 3:
            const ISNBDolivroParaAtualizar = +teclado(
              "Digite o ISNB do livro que deseja atualizar: "
            );

            const livroParaAtualizar = new Livro("", "", 0, 0);

            livroParaAtualizar.atualizar(ISNBDolivroParaAtualizar);

            break;

          case 4:
            const ISNBDolivroParaRemover = +teclado(
              "Digite o ISNB do livro que deseja remover: "
            );

            const livroParaRemover = new Livro("", "", 0, 0);
            livroParaRemover.remover(ISNBDolivroParaRemover);

            console.log("Livro removido com sucesso!");
            break;

          default:
            console.log(
              "Opção inválida! Voçê será redirecionado para o menu principal."
            );
            break;
        }
      }
      break;

    case 2:
      while (true) {
        console.log("+-------------------------------+");
        console.log("| 1. Cadastrar Membro           |");
        console.log("| 2. Listar Membros Cadastrados |");
        console.log("| 3. Atualizar Membro           |");
        console.log("| 4. Remover Membro             |");
        console.log("| 5. Voltar ao Menu Principal   |");
        console.log("+-------------------------------+");
        let opcaoMembro: number = +teclado("Digite uma opção: ");

        if (opcaoMembro == 5) {
          break;
        }

        switch (opcaoMembro) {
          case 1:
            const nome = teclado("Digite o nome do membro: ");
            const endereco = teclado("Digite o endereço do membro: ");
            const numeroDeTelefone = +teclado("Digite o telefone do membro: ");
            const numeroDeMatricula = +teclado(
              "Digite o número de matrícula do membro: "
            );
            const membro = new Membro(
              nome,
              endereco,
              numeroDeTelefone,
              numeroDeMatricula
            );
            membro.cadastrar(
              nome,
              endereco,
              numeroDeTelefone,
              numeroDeMatricula
            );

            console.log("Membro cadastrado com sucesso!");
            break;

          case 2:
            const membrosListados = listarMembros();
            console.table(membrosListados);
            break;

          case 3:
            const matriculaDoMembroParaAtualizar = +teclado(
              "Digite número de matricula do membro que deseja atualizar: "
            );

            const membroParaAtualizar = new Membro("", "", 0, 0);
            membroParaAtualizar.atualizar(matriculaDoMembroParaAtualizar);

            console.log("Membro atualizado com sucesso!");
            break;

          case 4:
            const matriculaDoMembroParaRemover = +teclado(
              "Digite o número de matricula do membro que deseja remover: "
            );

            const membroParaRemover = new Membro("", "", 0, 0);
            membroParaRemover.remover(matriculaDoMembroParaRemover);

            console.log("Membro removido com sucesso!");
            break;

          default:
            console.log(
              "Opção inválida! Voçê será redirecionado para o menu principal."
            );
            break;
        }
      }
      break;

    case 3:
      while (true) {
        console.log("+------------------------------------+");
        console.log("| 1. Realizar Empréstimo             |");
        console.log("| 2. Registrar Devolução de Livro    |");
        console.log("| 3. Listar Empréstimos Ativos       |");
        console.log("| 4. Listar Histórico de Empréstimos |");
        console.log("| 5. Voltar ao Menu Principal        |");
        console.log("+------------------------------------+");
        let opcaoEmprestimo: number = +teclado("Digite uma opção: ");

        if (opcaoEmprestimo == 5) {
          break;
        }

        switch (opcaoEmprestimo) {
          case 1:
            const ISNBlivro = +teclado("Digite o ISNB do livro: ");

            const livrosAtualizados = listarLivros();

            const index = livrosAtualizados.findIndex(
              (livro: Livro) => livro.ISNB === ISNBlivro
            );

            if (index === -1) {
              console.log("Livro não encontrado!");
              break;
            }

            const livroEncontrado = livros[index];

            const numeroDeMatricula = +teclado(
              "Digite o número de matrícula do membro: "
            );

            const membrosAtualizados = listarMembros();

            const indexMembro = membrosAtualizados.findIndex(
              (membro: Membro) => membro.numeroDeMatricula === numeroDeMatricula
            );

            if (indexMembro === -1) {
              console.log("Membro não encontrado!");
              break;
            }

            const membroEncontrado = membros[indexMembro];

            const dataDeInicio = teclado(
              "Digite a data de início: DD/MM/AAAA "
            );
            const dataDeFim = teclado("Digite a data de fim: DD/MM/AAAA ");

            const id = +teclado(
              "Digite o ID do empréstimo: (Digite um número de 100 à 999) "
            );

            const novoEmprestimo = new Emprestimo(
              livroEncontrado,
              membroEncontrado,
              dataDeInicio,
              dataDeFim,
              id
            );

            novoEmprestimo.cadastrar(
              livroEncontrado,
              membroEncontrado,
              dataDeInicio,
              dataDeFim,
              id
            );

            break;

          case 2:
            const idDoEmprestimo = +teclado("Digite o ID do empréstimo: ");

            const emprestimosAtivos = listarEmprestimosAtivos();

            const indexEmprestimo = emprestimosAtivos.findIndex(
              (emprestimo: Emprestimo) => emprestimo.id === idDoEmprestimo
            );

            if (indexEmprestimo === -1) {
              console.log("Emprestimo não encontrado");
              break;
            }

            const emprestimoEncontado = emprestimosAtivos[indexEmprestimo];

            emprestimoEncontado.devolver(idDoEmprestimo);

            break;

          case 3:
            const emprestimosAtivosLista = listarEmprestimosAtivos();
            const emprestimosAtivosFormatados =
              formatarEmprestimosAtivosParaTabela(emprestimosAtivosLista);
            console.table(emprestimosAtivosFormatados);

            break;

          case 4:
            const emprestimosHistoricoLista = listarEmprestimosHistorico();
            const historicoFormatado = formatarEmprestimosHistoricoParaTabela(
              emprestimosHistoricoLista
            );
            console.table(historicoFormatado);
            break;

          default:
            console.log(
              "Opção inválida! Voçê será redirecionado para o menu principal."
            );
            break;
        }
      }
      break;

    default:
      console.log("Opção inválida! Digite outra opção.");
      break;
  }
}
