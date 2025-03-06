// AQUI ESTOU CRIANDO UMA CONSTANTE PARA PEGAR O CONTEÚDO DO TEXTAREA TRADUZIDO
const copiar = document.getElementById('botao-copiar');

// AQUI ESTOU ADICIONANDO UM EVENTO DE ESCUTA AO BOTÃO DE TRADUZIR
document.getElementById("botao-traduzir").addEventListener('click', async () => {
    // DEFININDO AS CONSTANTES PELO DOM PARA TRABALHAR COM ELAS NO CÓDIGO
    const texto = document.getElementById('texto-original').value;
    const origem = document.getElementById('idioma-original').value; 
    const destino = document.getElementById('idioma-destino').value;
    const resultado = document.getElementById('resultado'); 
    const loading = document.getElementById('loading');

    // VERIFICANDO SE HÁ ALGUM TEXTO DIGITADO, CASO NÃO HOUVER O ENVIO NÃO É PERMITIDO
    if (!texto){
        alert("Por favor, digite um texto para traduzir.");
        return
    }


    // SPINNER PARA EXIBIR QUE ESTÁ CARREGANDO
    loading.classList.remove('d-none');
    resultado.innerText = '';
    copiar.classList.add('d-none');

    // CONSUMINDO A API DO LINGVA / MONTANDO A URL COM AS CONST, RECEBENDO E EXIBINDO O RESULTADOS 
    try {
        const resposta = await fetch(`https://lingva.ml/api/v1/${origem}/${destino}/${encodeURIComponent(texto)}`);
        const dados = await resposta.json();

        // PEGANDO A TRADUÇÃO VINDA DA API E EXIBINDO NO TEXTAREA
        document.getElementById('resultado').innerText = dados.translation;
        copiar.classList.remove('d-none');
    } catch (error) {
        document.getElementById('resultado').innerText = 'Erro ao traduzir';
        console.log('Error: ', error);
    } finally {
        // REMOVER O CARREGAMENTO DO SPINNER
        loading.classList.add('d-none'); 
       }
});

// EVENTO DE COPIAR TEXTO
copiar.addEventListener('click', () => {
    const textoTraduzido = document.getElementById('resultado').innerText;
    const alertaCopiado = document.getElementById('alerta-copiado');

    navigator.clipboard.writeText(textoTraduzido)
        .then(() => {
            // TRABALHANDO COM A EXIBIÇÃO DO ICONE DE "COPY" DO BOOTSTRAP
            alertaCopiado.classList.remove('d-none');

            setTimeout(() => alertaCopiado.classList.add('mostrar'), 10);

            
            setTimeout(() => {
              alertaCopiado.classList.remove('mostrar');
              setTimeout(() => alertaCopiado.classList.add('d-none'), 500);
            }, 3000);
        })
        .catch((err) => {
            console.error('Erro ao copiar: ', err)
        })
})
// FIM DO CÓDIGO


