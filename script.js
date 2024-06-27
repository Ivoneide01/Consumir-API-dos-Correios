function consultarCEP() {
    const cep = document.getElementById('cepInput').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Limpar resultados anteriores
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    try {
        // Verificar se o CEP é válido
        if (!/^\d{5}-?\d{3}$/.test(cep)) {
            throw new Error('Por favor, insira um CEP válido.');
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na consulta ao ViaCEP');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    throw new Error('CEP não encontrado.');
                }
                resultDiv.innerHTML = `
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Rua:</strong> ${data.logradouro}</p>
                `;
            })
            .catch(error => {
                throw error; 
            });
    } catch (error) {
        errorDiv.textContent = `Ocorreu um erro: ${error.message}`;
    }
}
