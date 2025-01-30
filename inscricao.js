
document.getElementById('inscricao-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Captura o número MB Way inserido
    const numeroMBWay = document.getElementById('pagamento').value.trim();

    // Verificação simples para garantir que o número não está vazio
    if (numeroMBWay === '') {
        alert('Por favor, insira seu número MB Way.');
        return;
    }

    // Envia o número MBWay para o backend para iniciar o pagamento
    fetch('processa_pagamento.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numeroMBWay: numeroMBWay })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            // Sucesso no processo de pagamento (pode ser redirecionamento para o app MB Way)
            alert('O pagamento foi solicitado com sucesso. Verifique seu app MB Way.');
            // Opcional: Redirecionar o usuário ou mostrar mensagem
        } else {
            alert('Erro ao iniciar o pagamento. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        alert('Ocorreu um erro ao processar o pagamento.');
    });
});
