// Seleciona os elementos do DOM
const form = document.getElementById('delete-form');
const tokenInput = document.getElementById('token');
const reposInput = document.getElementById('repos');
const outputDiv = document.getElementById('output');

// Adiciona um event listener ao formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do form

    // Captura o token e os repositórios
    const token = tokenInput.value;
    const repos = reposInput.value.split('\n').filter(repo => repo.trim () !== '');

    // Cabeçalhos de autenticação
    const headers = {
        'Authorization': `token ${token}`
    };

    // Limpa a saída anterior
    outputDiv.innerHTML = '';

    // Faz a requisição para deletar cada repositório
    repos.forEach(repo => {
        const url = `https://api.github.com/repos/${repo.trim()}`;
        fetch(url, {
            method: 'DELETE',
            headers: headers
        })
        .then(response => {
            if (response.status === 204) {
                outputMessage(`Repositório ${repo} deletado com sucesso.`);
            } else {
                outputMessage(`Falha ao deletar repositório ${repo}. Status code: ${response.status}`);
            }
        })
        .catch(error => {
            outputMessage(`Erro ao deletar repositório ${repo}: ${error}`);
        });
    });
});

// Função para exibir as mensagens na div de saída
function outputMessage(message) {
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    outputDiv.appendChild(messageParagraph);
}

