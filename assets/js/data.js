/* ==========================================================================
   MAKE PERFEITA — ARQUIVO DE DADOS EDITÁVEL
   --------------------------------------------------------------------------
   Este é o único arquivo que você precisa editar para gerenciar a loja.
   Produtos, preços, categorias, contatos e links saem daqui.

   Dados reais da loja (@make_perfeitaitu) em 17/10/2026.
   Para incluir as fotos reais de um produto, preencha o campo `foto`
   com o caminho de uma imagem em assets/img/fotos/.

   Campos por produto:
     id        -> identificador único usado na URL (produto.html?id=...)
     nome      -> nome do produto
     categoria -> deve bater com o "id" de uma categoria em CONFIG.categorias
     preco     -> número puro (ex.: 35.00). Use 0 para "Sob consulta"
     marca     -> opcional; se vazio, o card não mostra marca
     foto      -> caminho da foto real (tem prioridade sobre `imagens`)
     imagens   -> demais fotos do produto (miniatura extra na página)
     destaque  -> true exibe na vitrine "Destaques"
     novidade  -> true exibe na vitrine "Novidades"
     specs     -> lista de características mostrada na página do produto
   ========================================================================== */

window.CONFIG = {
  /* ---------------------------------------------------------------- LOJA */
  loja: {
    nome: 'Make Perfeita',
    cidade: 'Itu',
    uf: 'SP',
    assinatura: 'Loja de $10 e Variados',
    url: 'https://make-perfeita.vercel.app',
    email: '',
    /* Substitua pelo número real do seu site ao publicar */
    endereco: {
      logradouro: 'Rua Dr Horácio Kiehl',
      numero: '646',
      bairro: '',
      cep: '',
      cidade: 'Itu',
      uf: 'SP'
    }
  },

  /* ------------------------------------------------------- ATENDIMENTO */
  horarios: [
    'Segunda a sexta: 10h às 19h',
    'Sábado: 10h às 15h'
  ],
  /* Mesmo horario em formato estruturado, usado no schema.org (Google) */
  horariosSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' },
    { days: ['Saturday'], opens: '10:00', closes: '15:00' }
  ],
  entrega: 'Enviamos para todo o Brasil',

  /* ----------------------------------------------------------- CONTATOS */
  /* Formato: código do país + DDD + número, só números. Ex.: 5511999999999 */
  whatsapp: '5511992745423',

  /* Deixe vazio ('') para o botão não aparecer no site */
  redes: {
    instagram: 'https://www.instagram.com/make_perfeitaitu/',
    facebook: '',
    tiktok: ''
  },

  /* ------------------------------------------------------- CATEGORIAS */
  categorias: [
    {
      id: 'labiais',
      nome: 'Lábios & Gloss',
      resumo: 'Gloss, kits labiais e esfoliante para os lábios.',
      imagem: 'assets/img/fotos/kit-labial-sarahs.webp'
    },
    {
      id: 'facial',
      nome: 'Maquiagem Facial',
      resumo: 'Iluminador e blush para finalizar o rosto.',
      imagem: 'assets/img/fotos/duo-iluminador-blush.webp'
    },
    {
      id: 'olhos',
      nome: 'Olhos',
      resumo: 'Cola salon pro para cílios tufinhos.',
      imagem: 'assets/img/fotos/cola-salon-pro.webp'
    },
    {
      id: 'perfumaria',
      nome: 'Perfumaria',
      resumo: 'Perfumes para todos os momentos.',
      imagem: 'assets/img/fotos/perfume-55.webp'
    },
    {
      id: 'pele',
      nome: 'Pele & Corpo',
      resumo: 'Adesivo para acne e geleia hidratante corporal.',
      imagem: 'assets/img/fotos/geleia-hidratante.webp'
    },
    {
      id: 'variados',
      nome: 'Variados & Kits',
      resumo: 'Braceletes, post it, kits e mimos da loja.',
      imagem: 'assets/img/fotos/braceletes-aco.webp'
    }
  ],

  /* ---------------------------------------------------------- PRODUTOS */
  produtos: [
    {
      id: 'kit-labial-sarahs',
      nome: "Kit Labial Sarah's Beauty",
      categoria: 'labiais',
      preco: 35.0,
      marca: "Sarah's Beauty",
      destaque: true,
      novidade: true,
      foto: 'assets/img/fotos/kit-labial-sarahs.webp',
      imagens: [],
      descricao: "Kit labial Sarah's Beauty com lápis de boca, gloss e batom no mesmo conjunto: pronto para usar ou para presentear.",
      specs: ['Lápis de boca', 'Lip gloss', 'Batom', 'Kit com 3 itens']
    },
    {
      id: 'concha-surpresa',
      nome: 'Concha Surpresa com 3 Gloss',
      categoria: 'labiais',
      preco: 18.0,
      marca: '',
      destaque: true,
      novidade: false,
      foto: 'assets/img/fotos/concha-surpresa.webp',
      imagens: [],
      descricao: 'Concha surpresa que vem com 3 glosses dentro. Um presente inesperado que sai por R$ 18,00.',
      specs: ['3 glosses inclusos', 'Conteúdo surpresa', 'R$ 18,00']
    },
    {
      id: 'esfoliante-labial-gloss',
      nome: 'Esfoliante Labial + Lip Gloss',
      categoria: 'labiais',
      preco: 15.0,
      marca: '',
      destaque: false,
      novidade: false,
      foto: 'assets/img/fotos/esfoliante-labial-gloss.webp',
      imagens: [],
      descricao: 'Esfoliante labial junto com lip gloss para cuidar dos lábios e completar o gloss do look.',
      specs: ['Esfoliante labial', 'Lip gloss incluso', 'R$ 15,00']
    },
    {
      id: 'duo-iluminador-blush',
      nome: 'Duo Iluminador e Blush',
      categoria: 'facial',
      preco: 0,
      marca: '',
      destaque: false,
      novidade: true,
      foto: 'assets/img/fotos/duo-iluminador-blush.webp',
      imagens: [],
      descricao: 'Duo com iluminador e blush no mesmo produto para realçar o rosto em um passo só. Consulte o valor no WhatsApp.',
      specs: ['Iluminador + blush', 'Dois efeitos em um', 'Consulte valores']
    },
    {
      id: 'cola-salon-pro',
      nome: 'Cola Salon Pro para Cílios Tufinhos',
      categoria: 'olhos',
      preco: 10.0,
      marca: 'Salon Pro',
      destaque: true,
      novidade: false,
      foto: 'assets/img/fotos/cola-salon-pro.webp',
      imagens: [],
      descricao: 'Cola salon pro para cílios tufinhos: fixa e modela os cílios para um olhar alinhado.',
      specs: ['R$ 10,00 cada', 'Para cílios', 'Fixa e modela']
    },
    {
      id: 'adesivo-acne',
      nome: 'Adesivo para Acne',
      categoria: 'pele',
      preco: 10.0,
      marca: '',
      destaque: false,
      novidade: false,
      foto: 'assets/img/fotos/adesivo-acne.webp',
      imagens: [],
      descricao: 'Adesivo para acne com aplicação simples, para incluir na rotina de skincare da pele.',
      specs: ['R$ 10,00 cada', 'Aplicação fácil', 'Rotina de skincare']
    },
    {
      id: 'geleia-hidratante',
      nome: 'Geleia Hidratante Corporal',
      categoria: 'pele',
      preco: 18.0,
      marca: '',
      destaque: true,
      novidade: true,
      foto: 'assets/img/fotos/geleia-hidratante.webp',
      imagens: [],
      descricao: 'Geleia hidratante corporal nos aromas Limão Siciliano e Bloom Fantasy. Cada unidade sai por R$ 18,00.',
      specs: ['R$ 18,00 cada', 'Limão siciliano', 'Bloom Fantasy']
    },
    {
      id: 'perfume',
      nome: 'Perfume a partir de R$ 45,00',
      categoria: 'perfumaria',
      preco: 45.0,
      marca: '',
      destaque: true,
      novidade: true,
      foto: 'assets/img/fotos/perfume-55.webp',
      imagens: ['assets/img/fotos/perfume-55.webp'],
      descricao: 'O perfume que todo mundo pergunta, saindo por R$ 45,00. Tem também a novidade de R$ 55,00 que chegou agora na loja.',
      specs: ['Linha a partir de R$ 45,00', 'Novidade de R$ 55,00', 'Fragrância marcante', 'Envio para todo o Brasil']
    },
    {
      id: 'braceletes-aco',
      nome: 'Braceletes de Aço Inoxidável',
      categoria: 'variados',
      preco: 15.0,
      marca: '',
      destaque: true,
      novidade: false,
      foto: 'assets/img/fotos/braceletes-aco.webp',
      imagens: [],
      descricao: 'Braceletes de aço inoxidável, à prova d’água e que não escurecem. Cada peça sai por R$ 15,00.',
      specs: ['R$ 15,00 cada', 'Aço inoxidável', 'Vários modelos']
    },
    {
      id: 'post-it',
      nome: 'Post It',
      categoria: 'variados',
      preco: 10.0,
      marca: '',
      destaque: false,
      novidade: false,
      foto: 'assets/img/fotos/post-it.webp',
      imagens: [],
      descricao: 'Post it adesivo para anotações, estudos e listas. Um dos itens da linha de $10 da loja.',
      specs: ['R$ 10,00 cada', 'Adesivo', 'Linha de $10']
    },
    {
      id: 'sobremesa-morango',
      nome: 'Sobremesa de Morango',
      categoria: 'variados',
      preco: 10.0,
      marca: '',
      destaque: false,
      novidade: false,
      foto: 'assets/img/fotos/sobremesa-morango.webp',
      imagens: [],
      descricao: 'Sobremesa de morango para adoçar o pedido: combine com os produtos e receba com cuidado na entrega.',
      specs: ['R$ 10,00', 'Sobremesa de morango', 'Para pedido ou presente']
    },
    {
      id: 'urso-stitch',
      nome: 'Urso Stitch',
      categoria: 'variados',
      preco: 146.0,
      marca: '',
      destaque: true,
      novidade: false,
      foto: 'assets/img/fotos/urso-stitch.webp',
      imagens: [],
      descricao: 'Urso Stitch em pelúcia: o presente que everybody pediu. Cada unidade sai por R$ 146,00.',
      specs: ['R$ 146,00 cada', 'Pelúcia Stitch', 'Para presentear']
    },
    {
      id: 'kits-presentear',
      nome: 'Kits para Presentear',
      categoria: 'variados',
      preco: 0,
      marca: '',
      destaque: false,
      novidade: false,
      foto: 'assets/img/fotos/kits-presentear.webp',
      imagens: ['assets/img/fotos/kit-labial-sarahs.webp'],
      descricao: 'Ideias de kits para presentear montados pela Make Perfeita. Chame no WhatsApp e monte o combo do seu jeito.',
      specs: ['Montagem personalizada', 'Combinações de produtos', 'Monte pelo WhatsApp']
    }
  ],

  /* ----------------------------------------------------------- GALERIA */
  galeria: [
    { src: 'assets/img/fotos/kit-labial-sarahs.webp', alt: 'Kit labial Sarah’s Beauty com lápis de boca, gloss e batom', legenda: 'Kit labial' },
    { src: 'assets/img/fotos/perfume-55.webp', alt: 'Perfume novo da Make Perfeita', legenda: 'Perfume novo' },
    { src: 'assets/img/fotos/geleia-hidratante.webp', alt: 'Geleia hidratante corporal da Make Perfeita', legenda: 'Geleia hidratante' },
    { src: 'assets/img/fotos/braceletes-aco.webp', alt: 'Braceletes de aço inoxidável expostos na loja', legenda: 'Braceletes' },
    { src: 'assets/img/fotos/kits-presentear.webp', alt: 'Kits para presentear montados pela Make Perfeita', legenda: 'Kits para presentear' },
    { src: 'assets/img/fotos/urso-stitch.webp', alt: 'Urso Stitch de pelúcia', legenda: 'Urso Stitch' },
    { src: 'assets/img/fotos/concha-surpresa.webp', alt: 'Concha surpresa com 3 glosses', legenda: 'Concha surpresa' },
    { src: 'assets/img/fotos/duo-iluminador-blush.webp', alt: 'Duo iluminador e blush', legenda: 'Iluminador e blush' },
    { src: 'assets/img/fotos/esfoliante-labial-gloss.webp', alt: 'Esfoliante labial com lip gloss', legenda: 'Esfoliante labial' },
    { src: 'assets/img/fotos/cola-salon-pro.webp', alt: 'Cola salon pro para cílios tufinhos', legenda: 'Cola salon pro' },
    { src: 'assets/img/fotos/adesivo-acne.webp', alt: 'Adesivo para acne', legenda: 'Adesivo para acne' },
    { src: 'assets/img/fotos/post-it.webp', alt: 'Post it adesivo da linha de $10', legenda: 'Linha de $10' },
    { src: 'assets/img/fotos/sobremesa-morango.webp', alt: 'Sobremesa de morango', legenda: 'Sobremesa de morango' },
    { src: 'assets/img/fotos/destaque-horarios.webp', alt: 'Destaque de horários do Instagram', legenda: 'Horários' },
    { src: 'assets/img/fotos/destaque-endereco.webp', alt: 'Destaque de endereço do Instagram', legenda: 'Endereço' }
  ]
};