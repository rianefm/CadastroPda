let alunos = [];

class Aluno {
    constructor(nome, idade, endereco, responsavel) {
        this.nome = nome;
        this.idade = idade;
        this.endereco = endereco;
        this.responsavel = responsavel;
    }
}

function adicionarAlunos() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const endereco = document.getElementById("endereco").value;
    const responsavel = document.getElementById("responsavel").value;

    if (nome && idade && endereco && responsavel) {
        const alunoNovo = new Aluno(nome, idade, endereco, responsavel);
        alunos.push(alunoNovo);
        document.getElementById("form-aluno").reset();
        showMessage("Aluno cadastrado com sucesso!");
    } else {
        showMessage("Erro ao cadastrar aluno!");
    }
}


function listarAlunos() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (alunos.length === 0) {
        output.innerHTML = "Nenhum aluno cadastrado.";
        return;
    }

    alunos.forEach((aluno, index) => {
        output.innerHTML += `<p>Aluno ${index + 1}: ${aluno.nome}, Idade: ${aluno.idade}, Endereço: ${aluno.endereco}, Responsável: ${aluno.responsavel}</p>`;
    });
}









function mostrarMensagem(msg) {
    const output = document.getElementById("output");
    output.innerHTML = `<p>${msg}</p>`;
  }
