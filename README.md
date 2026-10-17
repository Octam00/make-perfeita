# Make Perfeita 💋 — site

Site da **Make Perfeita**, loja de $10 e variados em Itu/SP.
HTML, CSS e JavaScript puros — sem build, sem dependências, sem cobrança online.
O pedido é combinado com a loja pelo WhatsApp.

Conteúdo, preços, contatos e fotos reais extraídos do Instagram
[@make_perfeitaitu](https://www.instagram.com/make_perfeitaitu/).

---

## 1. Dados que já estão no site

| Item | Valor |
| --- | --- |
| WhatsApp | (11) 99274-5423 · `5511992745423` |
| Endereço | Rua Dr Horácio Kiehl, 646 — Itu/SP |
| Horário | Seg a sex 10h–19h · Sáb 10h–15h |
| Entrega | Enviamos para todo o Brasil |
| Instagram | [@make_perfeitaitu](https://www.instagram.com/make_perfeitaitu/) |
| Catálogo | 15 produtos em 6 categorias (7 destaques, 4 novidades) |

Faixas de preço: `$10` (adesivo, cola salon, post it, sobremesa), `$15`
(braceletes, esfoliante labial), `$18` (concha surpresa, geleia hidratante),
`$35` (kit labial), `$45` e `$55` (perfumes), `$146` (urso Stitch).
Três itens aparecem como **Sob consulta** — é só preencher o `preco` em `data.js`.

---

## 2. Publicar na Vercel

1. Envie este projeto para o GitHub (ou use o repositório já publicado).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. O Vercel detecta site estático: **não** preencha build command nem output directory.
4. Deploy. O endereço fica algo como `https://make-perfeita.vercel.app`.
5. Para usar domínio próprio: **Settings → Domains** e adicione o domínio.

Depois de publicar, se o domínio mudou, atualize em 3 lugares:

- `assets/js/data.js` → `loja.url`
- `<link rel="canonical">` e `og:url` e `og:image` nos 3 arquivos HTML
- `sitemap.xml` e `robots.txt`

---

## 3. Onde editar

| O que | Arquivo |
| --- | --- |
| Produtos, preços, categorias, contatos, horários, redes | `assets/js/data.js` |
| Cores da marca | `assets/css/styles.css` (bloco `:root`) |
| Textos das seções | `index.html`, `produtos.html`, `produto.html` |
| Título e descrição do Google | `<title>` e `<meta name="description">` |
| Fotos dos produtos | `assets/img/fotos/` |
| Logo e ícones | `assets/img/logo.png`, `favicon.svg`, `favicon.ico` |

---

## 4. Editar produtos

```js
{
  id: 'kit-labial-sarahs',   // único; vira a URL: produto.html?id=kit-labial-sarahs
  nome: "Kit Labial Sarah's Beauty",
  categoria: 'labiais',       // precisa existir em CONFIG.categorias
  preco: 35.0,               // use 0 para "Sob consulta"
  marca: "Sarah's Beauty",   // vazio = não exibe
  destaque: true,            // aparece em "Destaques"
  novidade: true,            // aparece em "Novidades"
  foto: 'assets/img/fotos/kit-labial-sarahs.webp',
  imagens: ['assets/img/fotos/kit-labial-sarahs.webp'],
  descricao: 'Texto de venda exibido na página do produto.',
  specs: ['Lápis de boca', 'Lip gloss', 'Batom', 'Kit com 3 itens']
}
```

**Para trocar/incluir uma foto:** salve a imagem em `assets/img/fotos/` e aponte o
campo `foto`. As fotos do Instagram já estão convertidas em WebP (1100 px de
largura, 50–230 KB), que é o formato ideal para a web.

---

## 5. Cores da logo

A paleta foi extraída da logo (rosa sobre rosa pálido e branco) e está no
`:root` do `styles.css`:

```css
--gold: #e2447a;        /* rosa principal (botões, destaques) */
--blush: #f7afc6;
--nude: #fbd3de;
--sand: #fde7ec;
--cream: #fff7f9;
--ink: #4a2130;         /* texto */
```

O botão de WhatsApp continua verde (identificação da plataforma). Para deixar
também rosa, troque `#1f7a4d`, `#25a866` e `#14603a` no `styles.css`.

A logo usada no site tem apenas **150 × 150 px** (é a foto de perfil do
Instagram). Se você tiver a logo original em alta resolução, salve como PNG
quadrado em `assets/img/logo.png` — o resto se ajusta sozinha.

---

## 6. Estrutura

```
index.html          Página inicial (hero, sobre, categorias, destaques,
                    novidades, diferenciais, galeria, contato)
produtos.html       Catálogo com busca, filtro por categoria e ordenação
produto.html        Página do produto (produto.html?id=...)
vercel.json         Cabeçalhos de segurança (CSP, HSTS, anti-frame, cache)
favicon.ico         Ícone do navegador

assets/
  css/styles.css    Design system completo
  js/data.js        DADOS EDITÁVEIS — produtos, preços, contatos
  js/app.js         Renderização, busca, filtros, lista de desejos
  img/logo.png      Logo da marca
  img/og-image.jpg  Imagem de compartilhamento (1200 × 630)
  img/fotos/*.webp  Fotos reais dos produtos (Instagram)
  img/hero.svg      fundo do topo
```

---

## 7. Segurança e limites

- Nenhum dado sensível no projeto: sem token, sem senha, sem chave de API.
  As fotos ficaram salvas **localmente** no repositório (nada de link temporário
  do Instagram, que expira).
- Cabeçalhos de segurança definidos em `vercel.json`:
  CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, HSTS e
  `Permissions-Policy` (câmera/microfone/localização bloqueados).
- O site **não** tem checkout, não pede cartão e não cria pedido: tudo é
  combinado pelo WhatsApp com a loja.
- Lista de desejos salva só no navegador (`localStorage`, chave `mp_lista_v1`).

---

## 8. Rodar localmente

Clique duas vezes em `index.html` ou, com servidor local (recomendado, para
URLs de produto):

```bash
npx serve .
# ou: py -m http.server 8080
```

Depois acesse `http://localhost:8080`.

---

© Make Perfeita — Itu, São Paulo.