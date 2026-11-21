# PRD — Navegação global da Caverna do Nerd

> Tipo: PRD de feature · Data: 2026-11-12
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". Atualize para "Implementada" quando todas as specs estiverem concluídas. -->

## 1. Visão geral

A Caverna do Nerd é uma loja de roupas (camisetas, agasalhos e bermudas). Esta feature é a navegação que aparece no topo de todas as páginas do site, no computador e no celular.

Ela segue a referência visual combinada: uma faixa verde com três benefícios, uma área preta com a marca, a busca, a conta e o carrinho, e os links de categoria centralizados. No celular, a faixa mostra uma frase por vez e o restante da navegação entra num menu compacto.

A navegação leva a pessoa até os endereços certos. As páginas de destino (listagem, resultado da busca, conta e carrinho) não fazem parte deste recorte.

## 2. Problema que resolve

Hoje o site abre na página inicial padrão do projeto, sem navegação. Quem entra não vê a marca da loja, não encontra as categorias, não consegue buscar, não alcança a conta nem o carrinho, e não lê as condições de frete, troca e parcelamento.

Sem uma navegação única, cada página futura teria que reinventar esses caminhos. A pessoa se perderia entre telas que ainda serão construídas.

## 3. Público-alvo

Cliente da Caverna do Nerd, no Brasil, no computador ou no celular, que quer achar uma camiseta, um agasalho ou uma bermuda, buscar um produto pelo nome, ir para a conta ou para o carrinho, e conferir as condições comerciais da loja.

Não é um painel interno. Não é o público de outra loja.

## 4. Objetivo do recorte atual

Entregar a navegação global, fiel à referência, pronta para ser usada em todas as páginas. Ela informa os três benefícios, identifica a loja, busca por um termo, destaca a categoria da página atual e leva a conta e ao carrinho. No celular, os mesmos controles continuam alcançáveis.

O resultado visível hoje: a bolinha do carrinho fica oculta, porque o projeto ainda não tem carrinho com itens. Os links de categoria, busca, conta e carrinho mudam o endereço mesmo que a página de destino ainda não exista.

## 5. Funcionalidades

**Essenciais:**

- Faixa verde, em todas as páginas, com as três frases da referência, sem link.
- No computador, as três frases aparecem ao mesmo tempo, distribuídas na largura da faixa.
- No celular, uma frase por vez, trocando sozinha.
- Marca da loja que volta para o início.
- Campo "Buscar produtos..." que, com texto, vai para a busca. Vazio, não navega.
- Atalho para a conta e atalho para o carrinho.
- Bolinha verde no carrinho somente quando houver pelo menos um item.
- Links: Todos produtos, Camisetas, Agasalhos, Bermudas.
- A categoria correspondente ao endereço atual fica destacada.
- No celular, menu compacto com busca, as quatro categorias, conta e carrinho.

**Desejáveis:**

- Nenhum neste recorte. O que não é essencial está fora do escopo.

## 6. Fora do escopo

- Construir as páginas de listagem, busca, conta, carrinho, login ou produto.
- Filtrar, ordenar ou exibir os produtos que já existem no projeto.
- Reclassificar o catálogo atual (hoje em Men, Women, Kids e em inglês) para Camisetas, Agasalhos e Bermudas.
- Sugestões enquanto a pessoa digita.
- Mostrar resultados da busca dentro da navegação.
- Abrir um painel da sacola, listar itens ou mostrar preço e quantidade.
- Mostrar o número de itens no carrinho. A referência usa só uma bolinha.
- Calcular frete, prazo de troca ou parcelamento. As frases são texto fixo.
- Deixar a navegação fixa ao rolar a página.
- Submenu, mega menu ou mais categorias além das quatro.
- Rodapé, página inicial nova e qualquer outra região do site.
- Painel administrativo.

## 7. Regras de negócio

- Regra 1: A navegação aparece em todas as páginas do site, inclusive na página inicial que existe hoje.
- Regra 2: As frases da faixa são exatamente: "Envio grátis para todo o Brasil", "Trocas e devoluções em até 7 dias!" e "Parcele suas compras em até 12x!". Nenhuma é link.
- Regra 3: A marca leva ao início do site. Conta leva a `/conta`. Carrinho leva a `/carrinho`.
- Regra 4: Todos produtos leva a `/produtos`. Camisetas leva a `/produtos/camisetas`. Agasalhos leva a `/produtos/agasalhos`. Bermudas leva a `/produtos/bermudas`.
- Regra 5: A busca, com um termo, leva sempre a `/buscar`, com esse termo. O que a pessoa escreveu não muda o destino para outra página. Escrever "/conta" busca esse texto; não abre a conta.
- Regra 6: Termo vazio ou só com espaços não navega.
- Regra 7: A bolinha verde aparece só quando o carrinho tem pelo menos um item. Sem quantidade numérica. Sem carrinho, ou com carrinho vazio, a bolinha não aparece. Nesta entrega o projeto não tem carrinho, então a bolinha fica oculta — a regra de aparecer continua valendo para quando o carrinho existir.
- Regra 8: Fica destacada somente a categoria do endereço atual. `/produtos/camisetas` destaca Camisetas, não Todos produtos. O mesmo vale para agasalhos e bermudas, inclusive se o endereço continuar depois da categoria. Em `/`, `/buscar`, `/conta` e `/carrinho`, nenhuma categoria fica destacada. Todos produtos só fica destacado em `/produtos`.
- Regra 9: No celular, busca, categorias, conta e carrinho ficam dentro do menu compacto. A marca continua visível fora do menu.
- Regra 10: O menu compacto fecha ao escolher um destino, ao enviar uma busca que navega, ao tocar fora dele e ao pressionar Escape. Nasce fechado.
- Regra 11: A faixa do celular troca de frase a cada 4 segundos, na ordem da Regra 2, e volta à primeira depois da terceira. Pausa enquanto o ponteiro está sobre a faixa ou o foco do teclado está nela. Se a pessoa prefere menos movimento, a troca automática não acontece e as três frases aparecem empilhadas.
- Regra 12: Os textos visíveis estão em português do Brasil.

Definições deste documento que não foram perguntadas uma a uma, para o comportamento ficar fechado: a faixa do celular espera 4 segundos entre frases; toque fora e Escape fecham o menu; termo só com espaços conta como vazio; nenhuma categoria fica destacada fora das quatro rotas de categoria.

## 8. Fluxos principais

### Fluxo 1 — Reconhecer a loja

1. A pessoa abre qualquer página.
2. Vê a faixa de benefícios, a marca, a busca, a conta, o carrinho e as categorias.
3. No computador, as três frases aparecem juntas. No celular, vê uma frase e o botão que abre o menu.
4. A bolinha do carrinho não aparece, porque ainda não há itens.

### Fluxo 2 — Ir para uma categoria

1. A pessoa aciona Camisetas (na barra, no computador, ou dentro do menu, no celular).
2. O endereço passa a ser `/produtos/camisetas`.
3. Camisetas fica destacada. As outras, não.
4. No celular, o menu se fecha.

### Fluxo 3 — Buscar

1. A pessoa escreve um termo e aciona a lupa ou pressiona Enter.
2. Se houver texto, o endereço passa a ser a busca com esse termo, sem espaços no começo e no fim.
3. O campo mostra o termo usado.
4. Se o campo estiver vazio ou só com espaços, o endereço não muda.

### Fluxo 4 — Ir para conta ou carrinho

1. A pessoa aciona o ícone de conta ou o de carrinho.
2. O endereço passa a ser `/conta` ou `/carrinho`.
3. Nenhuma categoria fica destacada.
4. A página de destino pode ainda não existir. A navegação não tenta construir essa página.

### Fluxo 5 — Usar o menu no celular

1. A pessoa aciona o botão do menu.
2. O menu abre com a busca, as quatro categorias, a conta e o carrinho.
3. A pessoa escolhe um item, envia uma busca válida, toca fora ou pressiona Escape.
4. O menu fecha. Se a escolha navegou, o endereço muda como nos fluxos 2, 3 ou 4.

## 9. Critérios de aceite

- O usuário consegue ver a marca, os três benefícios, a busca, a conta, o carrinho e as quatro categorias em qualquer página.
- O usuário consegue ir ao início pela marca, a uma categoria, à busca (com termo), à conta e ao carrinho.
- O sistema deve destacar só a categoria do endereço atual.
- O sistema deve manter a bolinha do carrinho oculta enquanto não houver pelo menos um item.
- O sistema não deve navegar quando a busca está vazia ou só tem espaços.
- O sistema não deve sugerir produtos, abrir a sacola nem filtrar o catálogo atual.
- Quando a tela é estreita, o sistema deve guardar busca, categorias, conta e carrinho no menu compacto e trocar uma frase da faixa por vez.
- Quando a pessoa prefere menos movimento, o sistema não deve trocar a frase sozinho.
- Quando o endereço muda para uma rota desta navegação, o sistema deve ir para esse endereço mesmo que a página de destino ainda não exista.

## 10. Stack

A do projeto, em alto nível: Next.js, React, TypeScript e Tailwind CSS.

Não há banco, autenticação nem pagamento neste recorte. O projeto já tem a marca da loja e um catálogo estático em inglês, com categorias diferentes das desta navegação. A navegação reutiliza a marca. Não reutiliza as categorias do catálogo.

Nenhuma capacidade nova exige ferramenta fora dessa stack.

## 11. Justificativa da stack

A navegação é a moldura do site que já está nesse stack. Reaproveitar Next.js, React, TypeScript e Tailwind evita uma base paralela para um trecho que precisa aparecer em todas as páginas. Busca, conta e carrinho, neste recorte, só mudam o endereço; não precisam de serviço novo.

## 12. Fases de construção

### Fase 1 — O que a referência mostra no computador

Objetivo: a navegação larga, igual à referência, presente em todas as páginas, com os destinos já definidos.

Specs:

- Spec 01 — Faixa de benefícios no computador
- Spec 02 — Marca, busca, conta e carrinho
- Spec 03 — Categorias e seção atual

### Fase 2 — A mesma navegação no celular

Objetivo: ninguém perde busca, categoria, conta, carrinho ou os três benefícios numa tela estreita.

Specs:

- Spec 04 — Faixa com uma frase por vez
- Spec 05 — Menu compacto

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Faixa de benefícios no computador

- **Fase:** Fase 1
- **Objetivo (o quê):** Mostrar, em toda página e em tela larga, as três condições comerciais da loja numa faixa verde, iguais à referência.
- **Intenção (por quê):** Frete, troca e parcelamento são o que a loja promete antes de a pessoa escolher um produto. Se a frase mudar de uma página para outra, a promessa deixa de ser confiável.
- **Contexto:** O site ainda não tem navegação. A página inicial é a página padrão do projeto. Esta faixa entra no topo de todas as páginas, acima da marca e das categorias. O visual de referência é uma faixa verde de ponta a ponta, com texto claro e um ícone por frase: entrega à esquerda, troca no centro, parcelamento à direita.
- **Atores:** Qualquer pessoa que abre o site no computador.
- **Descrição do comportamento:** No topo de cada página, uma faixa verde ocupa a largura toda. Ela mostra, ao mesmo tempo e nesta ordem, da esquerda para a direita: "Envio grátis para todo o Brasil", "Trocas e devoluções em até 7 dias!" e "Parcele suas compras em até 12x!". Cada frase tem um ícone pequeno que reforça o assunto (entrega, troca, coração). As três não são links nem botões. Não mudam com a página, com a categoria nem com o carrinho. Em tela larga as três ficam visíveis juntas, distribuídas na faixa. Esta spec não cobre a troca automática do celular; isso é a Spec 04.
- **Entradas e saídas:** Não há entrada da pessoa. A saída é as três frases, sempre as mesmas, visíveis no topo.
- **Dados/entidades envolvidos (conceitual):** Três benefícios fixos. Cada um tem texto, ícone e posição (esquerda, centro, direita). Não vêm do catálogo nem de um pedido.
- **Estados e transições:** Um único estado em tela larga: as três frases visíveis. Não há estado de carregamento, erro ou vazio, porque o texto não é buscado em outro lugar.
- **Regras de negócio:** Textos exatos da Regra 2. Nenhum item da faixa navega. A faixa existe em todas as páginas. Ela rola junto com a página; não fica presa ao rolar.
- **Validações:** Não se aplica. A pessoa não envia dados nesta faixa.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre qualquer página numa tela larga.
  2. Lê as três frases no topo, com os ícones.
  3. Acionar uma frase não muda de página.
- **Casos de borda e erros:** Não há falha de carregamento: as frases fazem parte da navegação, não de uma consulta. Se a janela ficar estreita, o comportamento passa a ser o da Spec 04; esta spec não empilha nem esconde frases no computador. Tradução e edição das frases estão fora: o texto é o da referência.
- **Impacto no existente:** A página inicial padrão passa a ter esta faixa no topo. O conteúdo atual da página continua. O catálogo não é lido nem alterado.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a pessoa abre qualquer página numa tela larga, Quando a página aparece, Então a faixa verde está no topo com as três frases exatas e um ícone em cada uma.
  - Dado que a faixa está visível, Quando a pessoa aciona uma frase, Então o endereço da página não muda.
  - Dado que a pessoa vai do início para `/conta`, Quando a nova página aparece, Então a faixa mostra as mesmas três frases.
  - Dado que a pessoa rola a página, Quando o conteúdo sobe, Então a faixa sobe junto e não permanece fixa.
- **Definição de pronto:** Em tela larga, toda página mostra a faixa verde com os três textos da referência, na ordem combinada, sem links, e o teste acima passa.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Menu do celular, troca automática de frases, marca, busca, categorias, conta, carrinho e qualquer página de destino.

### Spec 02 — Marca, busca, conta e carrinho

- **Fase:** Fase 1
- **Objetivo (o quê):** Na área preta da referência, oferecer a marca, a busca, a conta e o carrinho, com os destinos e a regra da bolinha.
- **Intenção (por quê):** São os quatro atalhos que a pessoa usa o tempo todo. A marca devolve ao início, a busca acha um produto pelo texto, e conta e carrinho separam "quem eu sou" de "o que vou levar". A bolinha só quando há item evita um aviso falso de sacola cheia.
- **Contexto:** Encaixa debaixo da faixa da Spec 01. No computador, a marca fica à esquerda, o campo de busca no centro e os ícones de conta e carrinho à direita, como na referência. O projeto já tem a marca da Caverna do Nerd; esta spec reutiliza essa marca, em vez de reescrever o nome só com texto. Ainda não existe carrinho: a informação disponível é "sem itens". A disposição estreita, em que esses controles vão para o menu, é a Spec 05. As regras de busca e de bolinha desta spec continuam valendo lá.
- **Atores:** Qualquer pessoa no site.
- **Descrição do comportamento:** A área principal é preta. A marca é a imagem da loja e leva ao início. O nome acessível da marca é "Caverna do Nerd". O campo de busca é claro, largo, com o texto de apoio "Buscar produtos..." e uma lupa na extremidade interna direita. Conta e carrinho são ícones com nome acessível "Conta" e "Carrinho". Conta leva a `/conta`. Carrinho leva a `/carrinho`. A bolinha verde fica sobre o carrinho só quando há pelo menos um item. Ela não é um controle separado: o clique no carrinho, com ou sem bolinha, vai para `/carrinho`. Quando há itens, o nome acessível passa a informar que o carrinho tem itens, sem dizer quantos. Quando não há, o nome é só "Carrinho" e a bolinha some. Hoje, em todas as páginas, o estado é sem itens.

  A busca só navega quando o termo, depois de tirar espaços do começo e do fim, tem algum caractere. Enter ou a lupa disparam o mesmo envio. O destino é sempre a busca, com o termo já sem espaços nas pontas. Caracteres especiais, barras e textos que parecem endereço continuam sendo o termo, não outro destino. Enquanto a pessoa digita, nada é sugerido e o endereço não muda. Se o campo está vazio ou só tem espaços, Enter e a lupa não navegam, não mostram erro e deixam o campo pronto para digitar. Se a pessoa já está numa busca com termo, o campo mostra esse termo.
- **Entradas e saídas:** Entrada: texto digitado no campo; ação de enviar (Enter ou lupa); situação do carrinho (sem itens, ou com pelo menos um item). Saída: ida ao início, a `/conta`, a `/carrinho` ou à busca com o termo; ou permanência na página, se a busca for vazia. Saída visual: bolinha presente ou ausente, e o termo refletido no campo quando o endereço já é uma busca.
- **Dados/entidades envolvidos (conceitual):** Termo de busca (texto livre). Destino da busca (sempre a página de busca mais o termo). Situação do carrinho: vazio ou com itens. Esta spec não conhece produto, preço, tamanho nem quantidade.
- **Estados e transições:**
  - Campo ocioso, vazio, fora de uma busca.
  - Campo com texto ainda não enviado: a página não muda.
  - Envio válido: vai para a busca e o campo mostra o termo enviado.
  - Envio vazio: continua na página, campo utilizável, sem mensagem de erro.
  - Carrinho sem itens: ícone sem bolinha.
  - Carrinho com itens: ícone com bolinha verde e nome acessível indicando que há itens.
  - Passagem de "sem itens" para "com itens", quando uma entrega futura informar isso: a bolinha passa a aparecer, sem número.
- **Regras de negócio:** Regras 3, 5, 6 e 7. Não abrir painel de sacola. Não mostrar quantidade. Não buscar a cada tecla. Não oferecer sugestões.
- **Validações:** O termo enviado não pode ficar vazio depois de remover espaços do início e do fim. Não há tamanho máximo neste recorte. Não há validação de conta nem de carrinho: os dois só mudam o endereço.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa vê a marca, o campo e os dois ícones.
  2. Se aciona a marca, vai ao início.
  3. Se escreve "moletom preto" e aciona a lupa ou Enter, vai para a busca desse termo.
  4. Se envia o campo vazio, permanece onde está.
  5. Se aciona a conta ou o carrinho, vai para o endereço correspondente.
  6. Não vê bolinha, porque não há itens.
- **Casos de borda e erros:** Campo com espaços nas pontas: eles saem antes de navegar; " moletom " busca "moletom". Só espaços: não navega. Termo "/conta" ou um endereço completo: continua sendo busca, não abre a conta nem sai do site. Enviar de novo o mesmo termo leva de novo à mesma busca. A página de destino pode não existir: o endereço mesmo assim muda, e o que aparece no lugar da página está fora desta spec. Não há erro de rede, porque a navegação não consulta um serviço. Se a situação do carrinho for desconhecida, tratar como sem itens e esconder a bolinha.
- **Impacto no existente:** Esses controles passam a aparecer em todas as páginas, inclusive na inicial padrão. A marca já existente é reutilizada. O catálogo não é consultado. Nenhuma página de conta, carrinho ou busca é criada.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que qualquer página abriu, Quando a pessoa olha a área preta no computador, Então vê a marca à esquerda, o campo "Buscar produtos..." no centro e os ícones de conta e carrinho à direita, sem bolinha.
  - Dado que a pessoa aciona a marca, Quando a ação termina, Então o endereço é o início do site.
  - Dado que o campo tem "camisa", Quando a pessoa pressiona Enter ou aciona a lupa, Então o endereço é a busca com o termo "camisa" e o campo mostra "camisa".
  - Dado que o campo está vazio ou só tem espaços, Quando a pessoa envia, Então o endereço não muda e nenhuma mensagem de erro aparece.
  - Dado que o campo tem " /conta ", Quando a pessoa envia, Então o destino continua sendo a busca, com o termo "/conta", e a página de conta não abre por causa desse texto.
  - Dado que não há itens no carrinho, Quando a barra é exibida, Então não há bolinha e o nome acessível do carrinho é "Carrinho".
  - Dado que a navegação foi informada de que o carrinho tem itens, Quando a barra é exibida, Então a bolinha verde aparece, sem número, e o nome acessível informa que há itens.
  - Dado que a pessoa aciona conta ou carrinho, Quando a ação termina, Então o endereço é `/conta` ou `/carrinho`, mesmo que essa página ainda não exista.
- **Definição de pronto:** No computador, marca, busca, conta e carrinho aparecem como na referência, os destinos batem com as regras, a busca vazia não navega, e a bolinha só existe quando há itens. O estado atual do projeto mostra a bolinha oculta.
- **Dependências:** Nenhuma para funcionar. Na página, fica visualmente abaixo da faixa da Spec 01.
- **Fora do escopo desta spec:** Montar a página de busca, da conta ou do carrinho. Sugestões, resultados, sacola, quantidade, login e as categorias (Spec 03). Posição desses controles no celular (Spec 05).

### Spec 03 — Categorias e seção atual

- **Fase:** Fase 1
- **Objetivo (o quê):** Oferecer os quatro caminhos de categoria e deixar claro em qual deles a pessoa está.
- **Intenção (por quê):** A loja se organiza em camisetas, agasalhos e bermudas. O link destacado responde "onde estou" sem a pessoa precisar ler o endereço. Destacar duas categorias ao mesmo tempo quebraria essa resposta.
- **Contexto:** Na referência, os links ficam centralizados, em maiúsculas, abaixo da área preta: TODOS PRODUTOS, CAMISETAS, AGASALHOS, BERMUDAS. As categorias do catálogo já existente no projeto são outras e estão em inglês; esta spec não as usa. Os mesmos quatro links reaparecem no menu da Spec 05, com a mesma regra de destaque.
- **Atores:** Qualquer pessoa que quer ver um grupo de produtos.
- **Descrição do comportamento:** Quatro links, nesta ordem: Todos produtos, Camisetas, Agasalhos, Bermudas. Eles levam a `/produtos`, `/produtos/camisetas`, `/produtos/agasalhos` e `/produtos/bermudas`. Não abrem submenu. No computador, ficam numa linha centralizada, em maiúsculas, como na referência. O link da seção atual fica visualmente distinto dos outros, também para quem navega por teclado. A distinção não depende só da cor: o link atual é identificável por mais de um sinal visual e pelo estado de página atual para tecnologia assistiva.

  Correspondência:
  - exatamente `/produtos` destaca Todos produtos;
  - `/produtos/camisetas` e qualquer endereço que comece por esse caminho destacam só Camisetas;
  - o mesmo para agasalhos e bermudas;
  - início, busca, conta, carrinho e qualquer outro endereço não destacam nenhum dos quatro.
- **Entradas e saídas:** Entrada: o endereço atual. Saída: quatro links e, no máximo, um deles marcado como seção atual. Acionar um link muda o endereço para o destino dele.
- **Dados/entidades envolvidos (conceitual):** Quatro destinos fixos, cada um com nome e endereço. A seção atual é uma destas quatro ou nenhuma. Não há lista vinda do catálogo.
- **Estados e transições:** Sem destaque. Com exatamente um destaque. Ao navegar de Camisetas para Bermudas, o destaque sai da primeira e vai para a segunda. Ao ir para a busca, o destaque some.
- **Regras de negócio:** Regras 4 e 8. São só estas quatro categorias. Todos produtos não fica destacado junto com uma categoria filha.
- **Validações:** Não se aplica. Não há texto livre. O destino é fixo.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa vê os quatro nomes.
  2. Aciona Agasalhos.
  3. O endereço vai para `/produtos/agasalhos`.
  4. Só Agasalhos fica destacado.
  5. Se em seguida ela busca um termo, nenhum dos quatro fica destacado.
- **Casos de borda e erros:** Endereço de categoria com algo depois, como a página de um produto futuro dentro de camisetas: continua destacando Camisetas. Endereço parecido, mas diferente, não ganha destaque por aproximação. A página de listagem pode não existir: o endereço muda mesmo assim. Não há categoria vazia a tratar aqui, porque esta spec não carrega produtos.
- **Impacto no existente:** Os links entram em todas as páginas. Nenhuma categoria do catálogo atual é renomeada, apagada ou filtrada.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a pessoa está no computador, Quando olha abaixo da área preta, Então vê os quatro nomes na ordem combinada, centralizados.
  - Dado que ela aciona Bermudas, Quando a navegação termina, Então o endereço é `/produtos/bermudas` e só Bermudas está destacada.
  - Dado que o endereço é `/produtos/camisetas` seguido de um caminho de produto, Quando a navegação aparece, Então só Camisetas está destacada.
  - Dado que o endereço é exatamente `/produtos`, Quando a navegação aparece, Então só Todos produtos está destacado.
  - Dado que o endereço é o início, a busca, `/conta` ou `/carrinho`, Quando a navegação aparece, Então nenhum dos quatro está destacado.
  - Dado que a pessoa aciona um link de categoria, Quando a ação termina, Então nenhum submenu foi aberto.
- **Definição de pronto:** Os quatro links existem, apontam para os endereços da Regra 4, e a regra de um único destaque (ou nenhum) passa nos casos acima, no computador.
- **Dependências:** Nenhuma de comportamento. Visualmente fica abaixo do cabeçalho da Spec 02.
- **Fora do escopo desta spec:** Listar produtos da categoria, criar as páginas, alterar o catálogo, submenu e o menu do celular (Spec 05), além de redefinir a regra de destaque.

### Spec 04 — Faixa com uma frase por vez

- **Fase:** Fase 2
- **Objetivo (o quê):** Na tela estreita, manter as três promessas da faixa sem espremê-las numa linha só, trocando uma frase por vez.
- **Intenção (por quê):** No celular a faixa da referência não cabe. Esconder duas promessas de vez faria a pessoa achar que a loja só oferece o que está na tela. A troca automática entrega as três sem ocupar a altura das categorias.
- **Contexto:** Usa os mesmos três benefícios, ícones e ordem da Spec 01. Só muda a apresentação quando a tela é estreita. No computador, a Spec 01 continua valendo: as três frases juntas, sem animação.
- **Atores:** Qualquer pessoa no celular ou numa janela estreita.
- **Descrição do comportamento:** A faixa continua verde, no topo, de ponta a ponta, e não é link. Ela mostra uma frase por vez, com o ícone dessa frase, nesta ordem: frete, troca, parcelamento. Ao abrir a página, a primeira frase está visível. A cada 4 segundos a faixa passa para a próxima. Depois da terceira, volta à primeira. A troca é discreta.

  A troca pausa enquanto o ponteiro está sobre a faixa ou enquanto o foco do teclado está nela, e continua de onde parou quando o ponteiro sai e o foco sai. A troca não é anunciada de novo a cada ciclo por leitor de tela. As três frases existem no conteúdo da página para serem lidas; as que não estão visíveis no momento continuam encontráveis, sem repetir aviso a cada troca.

  Se a pessoa prefere menos movimento, não há troca automática. As três frases aparecem empilhadas, na mesma ordem, com seus ícones, ainda sem link.

  Se a janela passa de estreita para larga, a animação para e as três frases ficam lado a lado, como na Spec 01. Se volta a ficar estreita, a faixa retoma uma frase por vez, começando pela primeira, com o menu compacto fechado (o menu em si é a Spec 05).
- **Entradas e saídas:** Entrada: largura da tela e a preferência de movimento do sistema. Não há clique para trocar a frase. Saída: uma frase visível por vez, ou as três empilhadas quando o movimento está reduzido.
- **Dados/entidades envolvidos (conceitual):** Os mesmos três benefícios da Spec 01, mais a posição da frase visível (primeira, segunda ou terceira) e se a troca está pausada.
- **Estados e transições:**
  - Estreita, em movimento: uma frase visível, avançando a cada 4 segundos.
  - Estreita, pausada: a frase atual permanece.
  - Estreita, menos movimento: três frases empilhadas, paradas.
  - Larga: três frases numa linha, sem troca. Voltar à estreita reinicia na primeira frase.
- **Regras de negócio:** Regras 2 e 11. Textos não mudam e não ganham link. O intervalo é de 4 segundos. Menos movimento desliga a troca e mostra as três.
- **Validações:** Não se aplica. Não há entrada de texto.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre o site no celular.
  2. Lê "Envio grátis para todo o Brasil".
  3. Depois de 4 segundos, lê a frase de troca. Depois, a de parcelamento. Depois, a de frete de novo.
  4. Se segura o dedo ou o ponteiro na faixa, a frase para de trocar até ela soltar.
  5. Se o sistema pede menos movimento, ela vê as três frases de uma vez, empilhadas.
- **Casos de borda e erros:** Não há o que carregar, então não há erro de rede. Pausa no meio do ciclo não pula uma frase: a próxima da ordem é a que viria em seguida. Redimensionar para o computador no meio da segunda frase mostra as três, sem continuar contando o tempo. Redimensionar de volta não restaura a segunda frase; começa de novo na primeira. Leitor de tela não recebe um aviso novo a cada 4 segundos.
- **Impacto no existente:** Em tela estreita, a faixa da Spec 01 deixa de mostrar as três frases lado a lado e passa a usar este comportamento. O texto não é editado.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a tela é estreita e o movimento é o normal, Quando a página abre, Então só a frase de frete está visível, com o ícone dela.
  - Dado que a frase de frete está visível, Quando passam 4 segundos, Então a frase de troca toma o lugar dela, e depois a de parcelamento, e então a de frete outra vez.
  - Dado que a faixa está trocando, Quando o ponteiro ou o foco entra nela, Então a frase atual permanece até o ponteiro e o foco saírem.
  - Dado que a pessoa aciona a frase visível, Quando a ação termina, Então o endereço não muda.
  - Dado que o sistema pede menos movimento, Quando a faixa aparece em tela estreita, Então as três frases estão empilhadas e não trocam sozinhas.
  - Dado que a tela estreita fica larga, Quando a mudança termina, Então as três frases aparecem juntas e a troca para.
- **Definição de pronto:** Em tela estreita a faixa cumpre a ordem, o intervalo, a pausa e a exceção de menos movimento. Em tela larga, a Spec 01 segue intacta.
- **Dependências:** Spec 01 — os três textos, ícones e a regra de que não são links.
- **Fora do escopo desta spec:** Botões de avançar e voltar a frase. Editar os textos. Menu compacto (Spec 05). Qualquer cálculo real de frete, troca ou parcela.

### Spec 05 — Menu compacto

- **Fase:** Fase 2
- **Objetivo (o quê):** Em tela estreita, guardar busca, categorias, conta e carrinho num menu que a pessoa abre, sem perder nenhum desses caminhos.
- **Intenção (por quê):** A barra da referência não cabe no celular. Esconder a busca ou o carrinho obrigaria a pessoa a ir ao computador para o que ela mais repete. O menu deixa a marca visível e o resto a um toque.
- **Contexto:** Reutiliza os controles e as regras da Spec 02 (marca, busca, conta, carrinho, bolinha, envio da busca) e os links e o destaque da Spec 03. A faixa estreita é a Spec 04 e fica fora deste menu. No computador, o menu não aparece: valem as Specs 02 e 03.
- **Atores:** Qualquer pessoa numa tela estreita.
- **Descrição do comportamento:** No celular, a área preta mostra a marca e um botão que abre o menu. A marca continua levando ao início. Busca, os quatro links, conta e carrinho não ficam na barra; ficam dentro do menu. O botão tem nome acessível que diz se o menu está fechado ou aberto.

  Fechado é o estado inicial. Ao abrir, o foco vai para dentro do menu e o restante da página não recebe a interação até o menu fechar. Dentro, a pessoa encontra, nesta ordem: o campo de busca com as mesmas regras da Spec 02, os quatro links com a mesma regra de destaque da Spec 03, e os atalhos de conta e carrinho com a mesma bolinha da Spec 02.

  O menu fecha quando a pessoa escolhe um link que navega (categoria, conta, carrinho ou marca), quando envia uma busca válida, quando toca fora do menu ou quando pressiona Escape. O foco volta ao botão que abriu. Uma busca vazia não fecha o menu e não navega. Fechar sem escolher destino não muda o endereço.

  Se a tela fica larga com o menu aberto, o menu fecha e a navegação passa a ser a do computador. Se a tela larga fica estreita, o menu nasce fechado.
- **Entradas e saídas:** Entrada: abrir ou fechar o menu; as mesmas entradas de busca, categoria, conta e carrinho das specs anteriores; largura da tela. Saída: menu aberto ou fechado; os mesmos destinos das Specs 02 e 03; foco devolvido ao botão ao fechar.
- **Dados/entidades envolvidos (conceitual):** Os destinos e o termo de busca das Specs 02 e 03. A situação do carrinho. O estado do menu: fechado ou aberto. Nenhum dado novo de produto.
- **Estados e transições:**
  - Tela larga: menu inexistente, controles na barra.
  - Tela estreita, fechado: só marca e botão do menu na área preta.
  - Tela estreita, aberto: painel com busca, categorias, conta e carrinho; o resto da página sem interação.
  - Aberto e depois largo: fecha e mostra a barra do computador.
  - Busca vazia com o menu aberto: permanece aberto, no mesmo endereço.
- **Regras de negócio:** Regras 3, 4, 5, 6, 7, 8, 9 e 10. O destaque de categoria dentro do menu é o mesmo da página. A bolinha segue a mesma regra, inclusive oculta no estado atual do projeto.
- **Validações:** As da busca, iguais à Spec 02. Não há validação extra para abrir o menu.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa, no celular, vê a marca e o botão do menu. A faixa acima mostra uma frase (Spec 04).
  2. Aciona o botão. O menu abre.
  3. Escreve "bermuda" e envia. Vai para a busca desse termo e o menu fecha.
  4. Ou aciona Camisetas. Vai para `/produtos/camisetas`, Camisetas fica destacada e o menu fecha.
  5. Ou pressiona Escape. O menu fecha e ela continua na mesma página.
- **Casos de borda e erros:** Abrir e fechar várias vezes não duplica o menu; só existe um. Toque fora fecha. Busca só com espaços não fecha e não navega. Escolher conta ou carrinho fecha e muda o endereço, mesmo que a página não exista. Estando dentro de Camisetas, abrir o menu mostra só Camisetas destacada. Redimensionar para largo no meio da digitação fecha o menu; o texto não enviado não navega sozinho. Teclado percorre o botão e, com o menu aberto, os controles de dentro, com foco visível.
- **Impacto no existente:** Em tela estreita, a barra das Specs 02 e 03 deixa de mostrar busca, categorias, conta e carrinho lado a lado e passa a usar este menu. Em tela larga, nada desta spec aparece. As páginas de destino continuam inexistentes.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a tela é estreita, Quando a página abre, Então a pessoa vê a marca e o botão do menu, e não vê a busca nem as categorias até abrir o menu.
  - Dado que o menu está fechado, Quando a pessoa aciona o botão, Então o menu abre com busca, as quatro categorias, conta e carrinho, e o foco está dentro dele.
  - Dado que o menu está aberto em `/produtos/agasalhos`, Quando ele aparece, Então só Agasalhos está destacado e a bolinha do carrinho segue a Spec 02.
  - Dado que o menu está aberto e o campo tem "bermuda", Quando a pessoa envia, Então o endereço é a busca com esse termo e o menu fecha.
  - Dado que o menu está aberto e o campo está vazio, Quando a pessoa envia, Então o endereço não muda e o menu continua aberto.
  - Dado que o menu está aberto, Quando a pessoa pressiona Escape ou toca fora, Então o menu fecha, o endereço permanece e o foco volta ao botão.
  - Dado que o menu está aberto, Quando a tela fica larga, Então o menu fecha e busca, categorias, conta e carrinho aparecem na barra do computador.
  - Dado que a tela é larga, Quando a pessoa olha a navegação, Então não há botão de menu compacto.
- **Definição de pronto:** No celular, os mesmos caminhos do computador estão no menu, com as mesmas regras de busca, destaque e bolinha, e o menu fecha nos quatro casos da Regra 10. No computador, o menu não aparece.
- **Dependências:** Spec 02 — marca, busca, conta, carrinho e bolinha. Spec 03 — os quatro links e a regra de destaque. A faixa do celular (Spec 04) é vizinha, não é pré-requisito do menu.
- **Fora do escopo desta spec:** Criar as páginas de destino. Mudar os textos da faixa. Acrescentar categorias. Fixar a navegação ao rolar. Animar a página inteira.

## 14. Ordem recomendada de implementação

1. Spec 01 — Faixa de benefícios no computador
2. Spec 02 — Marca, busca, conta e carrinho
3. Spec 03 — Categorias e seção atual
4. Spec 04 — Faixa com uma frase por vez
5. Spec 05 — Menu compacto

Seguir essa ordem monta primeiro a navegação da referência, com destinos e destaque já certos, e só depois adapta a faixa e o menu à tela estreita. A Spec 04 precisa dos textos da Spec 01. A Spec 05 precisa dos controles da Spec 02 e dos links da Spec 03. Implementar o menu antes disso criaria um segundo conjunto de regras para busca, bolinha e categoria.
