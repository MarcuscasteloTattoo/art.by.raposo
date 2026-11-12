# Art by Raposo — site

Site estático: só HTML, CSS e JavaScript puro, sem build e sem dependências.
Para publicar, envie o conteúdo desta pasta para a raiz do domínio (ex.: `public_html` na Hostinger).

## Estrutura

```
index.html        → estrutura da página + textos em português (SEO)
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
| Textos em português (topo, sobre, avaliações, orçamento) | `index.html`, elementos com `data-t="..."` |
| Textos em inglês e espanhol | `js/conteudo.js` → `TXT.en.t` e `TXT.es.t` (mesmas chaves do `data-t`) |
| Textos do letreiro animado | `js/conteudo.js` → `TXT.*.marquee` |
| Link do botão de orçamento (Direct do Instagram) | `index.html` → `<a ... id="cta" href="...">` |
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

O site abre em português. `?lang=en` ou `?lang=es` no endereço já abre no idioma.
Para remover um idioma: apague o botão em `<nav class="lang">` no `index.html` e o bloco correspondente em `TXT`.

## Testar no computador

Abra um terminal nesta pasta e rode `python3 -m http.server 8000`, depois acesse http://localhost:8000
(abrir o `index.html` direto com dois cliques também funciona, só o mapa pode não carregar).
