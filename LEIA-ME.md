# Art by Raposo — site

Site estático: só HTML, CSS e JavaScript puro, sem build e sem dependências.
Para publicar, envie o conteúdo desta pasta para a raiz do domínio (ex.: `public_html` na Hostinger).

## Estrutura

```
index.html        → estrutura da página + textos em inglês (idioma principal, SEO)
css/style.css     → visual (cores e fontes nas variáveis de :root, no topo)
js/conteudo.js    → fotos, avaliações, portfólio e traduções EN/ES
js/main.js        → comportamento (idiomas, carrosséis, mapa, lightbox)
assets/           → fotos em .webp (cada uma com versão "-480" para celular)
favicon.png, apple-touch-icon.png, .htaccess (cache/compressão)
```

## Onde alterar cada coisa

| O que | Onde |
|---|---|
| Título da aba, descrição do Google, imagem de compartilhamento | `index.html`, linhas 6–16 (`<title>`, `meta description`, `og:*`) |
| Textos em inglês (topo, sobre, orçamento…) | `index.html`, elementos com `data-t="..."` |
| Textos em português e espanhol | `js/conteudo.js` → `TXT.pt.t` e `TXT.es.t` (mesmas chaves do `data-t`) |
| Textos do letreiro animado | `js/conteudo.js` → `TXT.*.marquee` |
| Link do Direct (botão final do formulário) | `js/conteudo.js` → `site.direct` |
| Perguntas, opções e textos do formulário | `js/conteudo.js` → `TXT.*.qf` (en, pt, es) |
| Webhook que recebe as respostas (Make) | `js/conteudo.js` → `site.webhook` |
| Carrossel "Projetos recentes" | `site.estilos` (fotos) + `TXT.*.estilos` (título, texto, descrição da foto) |
| Grade do portfólio | `site.portfolio` (fotos) + `TXT.*.portfolio` (descrições), na mesma ordem |
| Avaliações | `site.avaliacoes` (nome, meses, texto, fotos opcionais) |
| Nota e quantidade de avaliações | `index.html` (`data-t="nota"` e `"avBadge"`) + EN/ES em `TXT.*.t` |
| Endereço, mapa, foto do estúdio, Instagram | `index.html` (seções `#localizacao`, `#sobre`, `footer`) |
| Avaliações (seção escondida) | tire o `hidden` de `#avaliacoes` no `index.html` e preencha `site.avaliacoes` |
| Texto da seção de orçamento | `index.html` (`data-t="orcTexto"`) + EN/ES |
| Cores e fontes | `css/style.css` → `:root` (`--gold`, `--accent`, `--ink`, `--display`, `--body`…) e o link do Google Fonts no `index.html` |

## Fotos

- Formato `.webp`, retrato 4:5 (ex.: 900×1125). Crie também a versão de 480 px de largura com o sufixo `-480` (ex.: `trabalho-01.webp` e `trabalho-01-480.webp`).
- O `.htaccess` guarda fotos em cache por 1 ano: ao trocar uma foto, use um **nome de arquivo novo**.
- Ao editar `css/style.css` ou os `.js`, aumente o `?v=1` no `index.html` (`?v=2`, `?v=3`…) para os visitantes receberem a versão nova.

## Idiomas

O site abre em inglês. `?lang=pt` ou `?lang=es` no endereço já abre no idioma.
Para remover um idioma: apague o botão em `<nav class="lang">` no `index.html` e o bloco correspondente em `TXT`.

## Testar no computador

Abra um terminal nesta pasta e rode `python3 -m http.server 8000`, depois acesse http://localhost:8000
(abrir o `index.html` direto com dois cliques também funciona, só o mapa pode não carregar).

## Formulário de orçamento

Passo a passo, uma pergunta por vez: estilo → ideia e local do corpo → contato → resumo.
No fim, o botão abre o Direct do Instagram (`site.direct`). O link do Direct não aceita texto pronto,
então ao clicar a mensagem com as respostas é copiada e a pessoa só cola na conversa.

Meta Pixel instalado no `index.html` (ID 1110677975101760), com PageView em toda visita.

Eventos:
- `form_start`, `form_step`, `form_complete` — eventos personalizados do funil (não contam como conversão)
- **`Lead` (conversão)** — dispara quando a pessoa completou o formulário **e** clicou para ir ao Direct; uma vez por visita.
  Também vai para o Google Analytics (`generate_lead`) e Tag Manager (`qf_lead`), se forem instalados.

### Webhook (Make)

Ao concluir a última pergunta (antes do clique no Direct), o site envia um POST para `site.webhook`
com os campos: `data` (dd/mm/aaaa hh:mm, horário de Miami), `estilo` (sempre em inglês), `ideia`, `nome`, `sobrenome`, `telefone`, `email`, `idioma` (en/pt-BR/es) e `pagina`.
Não reenvia o mesmo lead; se a pessoa editar as respostas e concluir de novo, envia a versão nova.
