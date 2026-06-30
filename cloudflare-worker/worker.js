addEventListener('fetch', function(event) {
  event.respondWith(handleRequest(event.request));
});

function handleRequest(request) {
  var params = new URL(request.url).searchParams;
  var tipo = params.get('tipo') || 'classificacao';
  var rodada = params.get('rodada') || '0';
  var idClube = params.get('idClube') || '0';

  var fpfUrl, sessionUrl;

  if (tipo === 'jogos') {
    sessionUrl = 'https://futebolpaulista.com.br/Competicoes/Tabela.aspx?idCampeonato=203&ano=2026&idCategoria=91&nav=1';
    fpfUrl = 'https://futebolpaulista.com.br/Handlers/Competicoes/ListarTabela.ashx'
      + '?IdCampeonato=203&Ano=2026&Rodada=' + rodada
      + '&IdClube=' + idClube
      + '&IdCategoria=91&_=' + Date.now();
  } else {
    sessionUrl = 'https://futebolpaulista.com.br/Competicoes/Classificacao.aspx?idCampeonato=203&ano=2026&idCategoria=91&nav=1';
    fpfUrl = 'https://futebolpaulista.com.br/Handlers/Competicoes/ListarClassificacaoTabela.ashx'
      + '?IdCampeonato=203&IdCampeonatoFase=7978&exercicio=2026&idCategoria=91&_=' + Date.now();
  }

  var sessionHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9'
  };

  return fetch(sessionUrl, { headers: sessionHeaders })
    .then(function(s) {
      var ck = (s.headers.get('set-cookie') || '').split(',').map(function(c) {
        return c.split(';')[0].trim();
      }).join('; ');
      return fetch(fpfUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'pt-BR,pt;q=0.9',
          'Referer': sessionUrl,
          'Origin': 'https://futebolpaulista.com.br',
          'X-Requested-With': 'XMLHttpRequest',
          'Cookie': ck
        }
      });
    })
    .then(function(r) {
      return r.text().then(function(b) {
        return new Response(b, {
          status: r.status,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'max-age=60'
          }
        });
      });
    })
    .catch(function(e) {
      return new Response(JSON.stringify({ Sucesso: false, erro: e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    });
}
