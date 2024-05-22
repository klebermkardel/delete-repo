// script.js
import { Octokit } from "@octokit/core";

document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos do DOM
    const form = document.getElementById('delete-form');
    const tokenInput = document.getElementById('token');
    const reposInput = document.getElementById('repos');
    const outputDiv = document.getElementById('output');

    // Adiciona um event listener ao formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Previne o comportamento padrão do form

        // Captura o token e os repositórios
        const token = tokenInput.value;
        const repos = reposInput.value.split('\n').filter(repo => repo.trim() !== '');

        // Limpa a saída anterior
        outputDiv.innerHTML = '';

        // Verifica se o token foi fornecido
        if (!token) {
            outputMessage('Token do GitHub é obrigatório.');
            return;
        }

        // Inicializa o Octokit
        const octokit = new Octokit({ auth: token });

        // Faz a requisição para deletar cada repositório
        for (const repo of repos) {
            try {
                const [owner, repoName] = repo.trim().split('/');

                // Verifica se o formato do repositório está correto
                if (!owner || !repoName) {
                    outputMessage(`Formato inválido para o repositório: ${repo}. Use o formato username/repository.`);
                    continue;
                }

                console.log(`Tentando deletar o repositório ${repo}...`);

                const response = await octokit.request('DELETE /repos/{owner}/{repo}', {
                    owner,
                    repo: repoName
                });

                if (response.status === 204) {
                    outputMessage(`Repositório ${repo} deletado com sucesso.`);
                    console.log(`Repositório ${repo} deletado com sucesso.`);
                } else {
                    outputMessage(`Falha ao deletar repositório ${repo}. Status code: ${response.status}`);
                    console.error(`Falha ao deletar repositório ${repo}. Status code: ${response.status}`);
                }
            } catch (error) {
                outputMessage(`Erro ao deletar repositório ${repo}: ${error.status} ${error.message}`);
                console.error(`Erro ao deletar repositório ${repo}:`, error);
            }
        }
    });

    // Função para exibir as mensagens na div de saída
    function outputMessage(message) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        outputDiv.appendChild(messageParagraph);
    }
});
