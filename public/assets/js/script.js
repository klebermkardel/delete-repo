import axios from 'axios';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('delete-form');
    const outputDiv = document.getElementById('output');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const token = document.getElementById('token').value;
        const repos = document.getElementById('repos').value.split('\n').filter(repo => repo.trim() !== '');
        outputDiv.innerHTML = '';

        if (!token) {
            outputMessage('Token do GitHub é obrigatório.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/delete-repo', { token, repos });
            response.data.messages.forEach(msg => outputMessage(msg));
        } catch (error) {
            outputMessage(`Erro ao deletar repositório: ${error.response?.data.error || error.message}`);
        }
    });

    function outputMessage(message) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        messageParagraph.classList.add('text-light');
        outputDiv.appendChild(messageParagraph);
    }
});
