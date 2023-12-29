const { title } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função principal que exibe o menu e lida com as opções escolhidas pelo usuário
function principal() {
  console.log('==== Menu ====');
  console.log('1. Registrar uma tarefa');
  console.log('2. Buscar uma tarefa');
  console.log('3. Exibir todas as tarefas');
  console.log('4. Remover uma tarefa');
  console.log('5. Editar uma tarefa');
  console.log('6. Concluir uma tarefa');
  console.log('7. Saindo do programa...\n');

  rl.question('Escolha uma opção (1-6): ', (opcao) => {
    const opcaoDigitada = parseInt(opcao);
    menuOpcao(opcaoDigitada);
  });
}

const bancoDeTarefas = [];

// Função para registrar uma nova tarefa com título, descrição e prioridade
function cadastro() {
  rl.question('De um título para a tarefa: ', (titulo) => {
    rl.question('Escreva a descrição: ', (descricao) => {
      rl.question('Informe a prioridade: ', (prioridade) => {
        const novaTarefa = {
          titulo: titulo,
          descricao: descricao,
          prioridade: prioridade,
          concluida: false
        };

        bancoDeTarefas.push(novaTarefa);
        console.log(`A tarefa "${titulo}" foi registrada!\n`);
        principal();
      });
    });
  });
}

// Função para buscar uma tarefa com base na descrição inserida pelo usuário
function buscar() {
  rl.question('Digite sua busca: ', (titulo) => {
    for (let i = 0; i < bancoDeTarefas.length; i++) {
      if (bancoDeTarefas[i].titulo.includes(titulo)) {
        const { titulo, descricao, prioridade } = bancoDeTarefas[i];
        console.log(`Aqui está a tarefa "${titulo}"!\n`);
        console.log(`Título: ${titulo}\nDescrição: ${descricao}\nPrioridade: ${prioridade}\n`);
        principal();
      }
    }
  });
}

// Função para exibir todas as tarefas registradas no banco de tarefas
function exibirTodas() {
  console.log('Abaixo estão todas as tarefas registradas: \n');
  for (let i = 0; i < bancoDeTarefas.length; i++) {
    const { titulo, descricao, prioridade } = bancoDeTarefas[i];
    console.log(`Título: ${titulo}\nDescrição: ${descricao}\nPrioridade: ${prioridade}\n`);
  }

  principal();
}

// Função para remover uma tarefa com base no título inserido pelo usuário
function remover() {
  rl.question('Digite a tarefa que deseja remover: ', (palavra) => {
    const index = bancoDeTarefas.findIndex(tarefa => tarefa.titulo === palavra);
    if (index !== -1) {
      bancoDeTarefas.splice(index, 1);
      console.log(`A tarefa "${palavra}" foi removida!\n`);
    } else {
      console.log(`A tarefa "${palavra}" não foi encontrada!\n`);
    }
    principal();
  });
} 

// Função para marcar uma tarefa como concluída com base no índice inserido pelo usuário
function marcarConcluida() {
  rl.question('Qual a tarefa que deseja concluir? ', (indice) => {
    const indiceDaTarefa = parseInt(indice) - 1;
    if (isNaN(indiceDaTarefa) || indiceDaTarefa < 0 || indiceDaTarefa >= bancoDeTarefas.length) {
      console.log('Índice inválido!\n');
    } else {
      rl.question('Deseja marcar a tarefa como concluída? (S para Sim e N para não)', (resposta) => {
        const concluida = resposta.toUpperCase() === 'S';
        bancoDeTarefas[indiceDaTarefa].concluida = concluida;
        console.log(`A tarefa "${bancoDeTarefas[indiceDaTarefa].titulo}" foi marcada como concluída.\n`);
        principal();
      });
    }
  });
}

function editarDescricao() {
  rl.question('Informe a tarefa que deseja editar: ', (titulo) => {
    const tarefaEncontrada = false;

    for(let i = 0; i < bancoDeTarefas.length; i++) {
      if (bancoDeTarefas[i].titulo === titulo) {
        tarefaEncontrada = true;
        rl.question(`Digite a descrição para "${titulo}": `, (edicao) => {
          bancoDeTarefas[i].descricao = edicao;
          console.log(`A Tarefa "${titulo}" foi atualizada com sucesso!\n`)
          principal()
        })
      }
    }
  })
}

// Função que direciona para a operação escolhida no menu
function menuOpcao(operacao) {
  switch (operacao) {
    case 1:
      return cadastro();
    case 2:
      return buscar();
    case 3:
      return exibirTodas();
    case 4:
      return remover();
    case 5:
      return editarDescricao();
    case 6:
      return marcarConcluida();
    case 7:
      console.log('Saindo do programa...\n');
      rl.close();
  }
}

// Inicia a execução do programa chamando a função principal
principal();