import { Octokit } from '@octokit/core';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('delete-form');
    const tokenInput = document.getElementById('token');
    const reposInput = document.getElementById('repos');
    const outputDiv = document.getElementById('output');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const token = tokenInput.value;
        const repos = reposInput.value.split('\n').filter(repo => repo.trim() !== '');
        outputDiv.innerHTML = '';

        if (!token) {
            outputMessage('Token do GitHub é obrigatório.');
            return;
        }

        const octokit = new Octokit({ auth: token });

        for (const repo of repos) {
            try {
                const [owner, repoName] = repo.trim().split('/');

                if (!owner || !repoName) {
                    outputMessage(`Formato inválido para o repositório: ${repo}. Use o formato username/repository.`);
                    continue;
                }

                const response = await octokit.request('DELETE /repos/{owner}/{repo}', {
                    owner,
                    repo: repoName
                });

                if (response.status === 204) {
                    outputMessage(`Repositório ${repo} deletado com sucesso.`);
                } else {
                    outputMessage(`Falha ao deletar repositório ${repo}. Status code: ${response.status}`);
                }
            } catch (error) {
                outputMessage(`Erro ao deletar repositório ${repo}: ${error.status} ${error.message}`);
            }
        }
    });

    function outputMessage(message) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        outputDiv.appendChild(messageParagraph);
    }
});
