const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/delete-repo', async (req, res) => {
    const { token, repos } = req.body;
    if (!token || !repos) {
        return res.status(400).json({ error: 'Token e repositórios são obrigatórios.' });
    }

    const octokit = axios.create({
        baseURL: 'https://api.github.com',
        headers: { Authorization: `token ${token}` }
    });

    let messages = [];
    for (const repo of repos) {
        try {
            const [owner, repoName] = repo.trim().split('/');
            if (!owner || !repoName) {
                messages.push(`Formato inválido para o repositório: ${repo}. Use o formato username/repository.`);
                continue;
            }

            await octokit.delete(`/repos/${owner}/${repoName}`);
            messages.push(`Repositório ${repo} deletado com sucesso.`);
        } catch (error) {
            messages.push(`Erro ao deletar repositório ${repo}: ${error.response?.status || ''} ${error.message}`);
        }
    }

    res.json({ messages });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
