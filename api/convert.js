const TurndownService = require('turndown');
const turndownService = new TurndownService();

// A função exportada irá lidar com as requisições
module.exports = (req, res) => {
    // Verifica se a requisição é um POST e tem um body com a propriedade 'html'
    if (req.method !== 'POST' || !req.body.html) {
        res.status(400).send('Please send a POST request with an "html" property in the body.');
        return;
    }

    try {
        // Converte o HTML do corpo da requisição para Markdown
        const htmlContent = req.body.html;
        const markdown = turndownService.turndown(htmlContent);

        // Retorna o resultado em formato JSON
        res.status(200).json({ markdown: markdown });
    } catch (error) {
        res.status(500).send('An error occurred during conversion: ' + error.message);
    }
};
