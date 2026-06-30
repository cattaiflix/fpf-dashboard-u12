# Dashboard FPF SUB12 — Classificação ao vivo

Mesma solução do SUB11, adaptada para a categoria SUB12.

IDs usados:
- `idCampeonato=203`
- `IdCampeonatoFase=7978`
- `idCategoria=91`
- `ano=2026`

## Passo 1 — Criar o Cloudflare Worker (proxy)

1. Acesse `dash.cloudflare.com` → **Workers & Pages** → **Create**
2. Escolha o template **"Hello World" Worker** → **Deploy**
3. Clique em **Edit code**
4. Apague tudo e cole o conteúdo de `cloudflare-worker/worker.js`
5. Clique em **Save and Deploy**
6. Copie a URL gerada (ex: `https://algo.seuusuario.workers.dev`)

## Passo 2 — Apontar o dashboard para o worker

No arquivo `public/index.html`, localize a linha:

```js
const ENDPOINT = 'https://SEU-WORKER-SUB12.workers.dev/';
```

Substitua pela URL real do worker que você criou.

## Passo 3 — Subir no GitHub

1. Crie um novo repositório (ex: `fpf-dashboard-sub12`)
2. Suba os arquivos `public/index.html`, `api/classificacao.js`, `vercel.json`, `package.json`

## Passo 4 — Publicar na Vercel

1. Acesse `vercel.com` → **Add New → Project**
2. Selecione o repositório `fpf-dashboard-sub12`
3. **Deploy**

Pronto! URL pública gerada automaticamente, lendo os dados ao vivo do SUB12.

## Estrutura

```
fpf-dashboard-sub12/
├── api/
│   └── classificacao.js     ← proxy Vercel (backup)
├── public/
│   └── index.html           ← dashboard completo (classificação + jogos + mata-mata)
├── cloudflare-worker/
│   └── worker.js            ← proxy principal (contorna bloqueio de IP da FPF)
├── vercel.json
└── package.json
```
