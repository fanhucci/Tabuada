import http from 'http';
import url, {URLSearchParams} from 'url';

const host = 'localhost';
const porta = 3000;

function responderRequisicao(requisicao, resposta){
    if(requisicao.method === "GET"){
        const dados = new URLSearchParams(url.parse(requisicao.url).query);

        const tabuada = dados.get('tabuada');
        const sequencia = dados.get('sequencia');

        resposta.setHeader('Content-Type','text/html');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Calculadora</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<h2>Tabuada do '+ tabuada +'</h2>');
        if(tabuada && sequencia){
            for(let i=1;i<=sequencia;i++){
                resposta.write('<p>'+ i +' x '+ tabuada +' = '+ i*tabuada +'</p>');
            }
        }
        else{
            for(let i=1;i<=10;i++){
                resposta.write('<p>'+ i +' x '+ tabuada +' = '+ i*tabuada +'</p>');
            }
        }
        
        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }
}

const servidor = http.createServer(responderRequisicao);

servidor.listen(porta, host, () => {
    console.log('servidor escutando em http://'+ host + ":" + porta);
});
