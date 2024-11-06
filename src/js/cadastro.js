let alunos = [];
let currentIndex = -1;

class Aluno {
    constructor(nome, matri, idade, endereco, responsavel) {
        this.nome = nome;
        this.matri = matri;
        this.idade = idade;
        this.endereco = endereco;
        this.responsavel = responsavel;
    }
}

function validarCampos() {
    let valido = true;
    document.querySelectorAll(".error").forEach(span => span.textContent = "");

    const nome = document.getElementById("nome").value;
    const matri = document.getElementById("matri").value;
    const idade = document.getElementById("idade").value;
    const endereco = document.getElementById("endereco").value;
    const responsavel = document.getElementById("responsavel").value;

    if (!nome.trim()) {
        document.getElementById("error-nome").textContent = "O nome é obrigatório.";
        valido = false;
    }

    if (!matri.trim() || isNaN(matri) || matri <= 0) {
        document.getElementById("error-matri").textContent = "Informe um número de matrícula válido.";
        valido = false;
    }

    if (!idade.trim() || isNaN(idade) || idade <= 0) {
        document.getElementById("error-idade").textContent = "Informe uma idade válida.";
        valido = false;
    }

    if (!endereco.trim()) {
        document.getElementById("error-endereco").textContent = "O endereço é obrigatório.";
        valido = false;
    }

    if (!responsavel.trim() || !/^\d{10,}$/.test(responsavel)) {
        document.getElementById("error-responsavel").textContent = "Informe um número de telefone válido (mínimo de 10 dígitos).";
        valido = false;
    }

    return valido;
}

function salvarNoLocalStorage() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

function carregarDoLocalStorage() {
    const dados = localStorage.getItem("alunos");
    if (dados) {
        alunos = JSON.parse(dados);
    }
}

function adicionarAlunos() {
    if (!validarCampos()) {
        mostrarMensagem("Erro ao cadastrar aluno! Verifique os campos.");
        return;
    }

    const nome = document.getElementById("nome").value;
    const matri = document.getElementById("matri").value;
    const idade = document.getElementById("idade").value;
    const endereco = document.getElementById("endereco").value;
    const responsavel = document.getElementById("responsavel").value;

    const alunoNovo = new Aluno(nome, matri, idade, endereco, responsavel);
    alunos.push(alunoNovo);
    salvarNoLocalStorage();
    document.getElementById("form-aluno").reset();
    mostrarMensagem("Aluno cadastrado com sucesso!");
    listarAlunos(); 
}

function listarAlunos() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (alunos.length === 0) {
        output.innerHTML = "Nenhum aluno cadastrado.";
        return;
    }

    alunos.forEach((aluno, index) => {
        output.innerHTML += `
            <p>
                Aluno ${index + 1}: ${aluno.nome}, Matrícula: ${aluno.matri}, Idade: ${aluno.idade}, Endereço: ${aluno.endereco}, Responsável: ${aluno.responsavel}
                <div class="buttons">
                    <button onclick="abrirModalEdicao(${index})">Editar</button>
                    <button onclick="deletarAluno(${index})">Deletar</button>
                </div>
            </p>
        `;
    });
}

function deletarAluno(index) {
    if (index >= 0 && index < alunos.length) {
        alunos.splice(index, 1); 
        salvarNoLocalStorage(); 
        mostrarMensagem("Aluno deletado com sucesso!");
        listarAlunos(); 
    }
}

function abrirModalEdicao(index) {
    const aluno = alunos[index];
    document.getElementById("edit-nome").value = aluno.nome;
    document.getElementById("edit-matri").value = aluno.matri;
    document.getElementById("edit-idade").value = aluno.idade;
    document.getElementById("edit-endereco").value = aluno.endereco;
    document.getElementById("edit-responsavel").value = aluno.responsavel;

    currentIndex = index;
    document.getElementById("edit-modal").style.display = "flex";
}

function fecharModalEdicao() {
    document.getElementById("edit-modal").style.display = "none";
}

document.getElementById("close-edit-modal").onclick = fecharModalEdicao;

function confirmarEdicao() {
    if (currentIndex === -1) return;

    alunos[currentIndex].nome = document.getElementById("edit-nome").value;
    alunos[currentIndex].matri = document.getElementById("edit-matri").value;
    alunos[currentIndex].idade = document.getElementById("edit-idade").value;
    alunos[currentIndex].endereco = document.getElementById("edit-endereco").value;
    alunos[currentIndex].responsavel = document.getElementById("edit-responsavel").value;

    salvarNoLocalStorage();
    mostrarMensagem("Informações do aluno editadas com sucesso!");
    fecharModalEdicao();
    listarAlunos();
    currentIndex = -1;
}

function mostrarMensagem(msg) {
    const output = document.getElementById("output");
    output.innerHTML = `<p>${msg}</p>`;
}

carregarDoLocalStorage();
listarAlunos();
