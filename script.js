function verificarSituacao(nota) {
    if (nota >= 7) {
        return "Aprovado";
    }
    if (nota >= 5) {
        return "Recuperação";
    }
    return "Reprovado";
}

function calcularMedia(notas) {
    let soma = 0;

    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }

    return soma / notas.length;
}

function encontrarMaiorNota(notas) {
    let maior = notas[0];

    for (let i = 1; i < notas.length; i++) {
        if (notas[i] > maior) {
            maior = notas[i];
        }
    }

    return maior;
}

function encontrarMenorNota(notas) {
    let menor = notas[0];

    for (let i = 1; i < notas.length; i++) {
        if (notas[i] < menor) {
            menor = notas[i];
        }
    }

    return menor;
}

function gerarRelatorio(nomes, notas) {
    let aprovados = 0;
    let reprovados = 0;
    let recuperacao = 0;

    let linhasTabela = "";

    for (let i = 0; i < notas.length; i++) {
        let situacao = verificarSituacao(notas[i]);

        if (situacao === "Aprovado") {
            aprovados++;
        } else if (situacao === "Recuperação") {
            recuperacao++;
        } else {
            reprovados++;
        }

        linhasTabela += `
        <tr>
            <td>${nomes[i]}</td>
            <td>${notas[i].toFixed(2)}</td>
            <td>${situacao}</td>
        </tr>`;
    }

    let media = calcularMedia(notas);
    let maior = encontrarMaiorNota(notas);
    let menor = encontrarMenorNota(notas);

    return `
    <table>
        <tr><th>Aluno</th><th>Nota</th><th>Situação</th></tr>
        ${linhasTabela}
    </table>

    <div class="resumo">
        <p>Alunos Cadastrados: <strong>${notas.length}</strong></p>
        <p>Média da Turma: <strong>${media.toFixed(2)}</strong></p>
        <p>Maior Nota: <strong>${maior.toFixed(2)}</strong></p>
        <p>Menor Nota: <strong>${menor.toFixed(2)}</strong></p>
        <p>Aprovados: <strong>${aprovados}</strong></p>
        <p>Recuperação: <strong>${recuperacao}</strong></p>
        <p>Reprovados: <strong>${reprovados}</strong></p>
    </div>
    `;
}

document.getElementById("btnCadastrar").addEventListener("click", function () {
    let quantidade = parseInt(document.getElementById("txtQuantidade").value);

    if (isNaN(quantidade) || quantidade <= 0) {
        document.getElementById("resultado").innerText = "Digite uma quantidade válida de alunos.";
        return;
    }

    let nomes = [];
    let notas = [];

    for (let i = 0; i < quantidade; i++) {
        let nome = prompt("Aluno " + (i + 1) + " - Digite o nome:");

        if (nome == null || nome.trim() === "") {
            nome = "Aluno " + (i + 1);
        }

        let nota = -1;

        while (isNaN(nota) || nota < 0 || nota > 10) {
            let digitado = prompt("Digite a nota de " + nome + " (0 a 10):");

            if (digitado == null) {
                digitado = "0";
            }

            nota = parseFloat(digitado.replace(",", "."));
        }

        nomes.push(nome);
        notas.push(nota);
    }

    document.getElementById("resultado").innerHTML = gerarRelatorio(nomes, notas);
});
