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
});

