# PRD — Vitrine da home

> Tipo: PRD de feature · Data: 2026-11-15
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". Atualize para "Implementada" quando todas as specs estiverem concluídas. -->

## 1. Visão geral

A home da loja passa a mostrar quatro vitrines curtas: mais vendidos, GTA VI, Marvel e DC. As quatro chegam numa consulta só, com poucos dados por produto. A página deixa de baixar o catálogo inteiro para pintar esses cards.

O banner, as categorias e os serviços que a home já tem continuam. O spotlight de GTA VI continua com o texto que já está na página. Marvel e DC são duas faixas novas, abaixo do GTA, só com o nome da marca.

Esta feature não redefine a loja. O PRD de navegação global trata a Caverna do Nerd como loja de roupa e não entra neste recorte.

## 2. Problema que resolve

Quem abre a home hoje espera ver o que mais vende e o que é de cada franquia. O que aparece não é isso.

A faixa com título "MAIS VENDIDOS" mostra os dez primeiros produtos da lista geral, não os marcados como mais vendidos. GTA VI é montado no navegador filtrando produtos cuja categoria é o texto `GTAIV`, e no máximo cinco. Marvel e DC não têm faixa: o bloco de marcas recebe uma lista vazia. Não existe informação de franquia no produto. Categoria hoje mistura tipo (roupa, caneca) com franquia.

Para montar essas faixas, a loja baixa o catálogo inteiro em toda abertura de página. Cada produto traz descrição, todas as imagens, tamanhos e avaliações. O total do carrinho procura o preço dentro dessa lista. Com centenas de produtos, a caminho de milhares, a home paga o peso do catálogo para mostrar cerca de trinta cards.

## 3. Público-alvo

Visitante da home, no Brasil, no computador ou no celular, que quer ver os destaques da loja: o que está marcado como mais vendido e o que é de GTA VI, Marvel ou DC.

Não é o painel de quem cadastra produto. Não é a página de coleção, de busca nem a ficha do produto.

## 4. Objetivo do recorte atual

A home mostra só as quatro faixas, na ordem combinada, com até oito produtos cada, sem baixar o catálogo inteiro. O carrinho continua conseguindo somar o total, porque cada item passa a trazer o próprio preço. Os produtos de GTA já cadastrados ganham a franquia `GTA VI`, sem ter o tipo reescrito à força.

## 5. Funcionalidades

**Essenciais:**

- Franquia no produto, com os valores `GTA VI`, `Marvel` e `DC`. Categoria continua sendo o tipo do produto.
- Preenchimento da franquia `GTA VI` nos produtos que hoje estão com categoria `GTAIV`, sem alterar essa categoria.
- Cada item do carrinho traz o preço usado no total. O total não depende mais do catálogo completo.
- Uma consulta da home devolve quatro listas: mais vendidos, GTA VI, Marvel e DC.
- Cada item dessas listas traz só identidade, nome, preço e a primeira imagem.
- Até oito produtos por faixa. Mais vendidos são os marcados, e a data só corta o excesso. As franquias entram da mais nova para a mais antiga.
- O mesmo produto pode aparecer em mais vendidos e na franquia.
- Faixa com zero produtos some. De um a sete, mostra os que existirem.
- Durante o carregamento, as quatro faixas não ocupam espaço. Banner, categorias e serviços já estão na tela.
- Se a consulta falhar, as quatro faixas somem e aparece o aviso "Erro ao carregar produtos." O resto da home fica.
- A loja deixa de baixar o catálogo inteiro ao abrir qualquer página.

**Desejáveis:**

- Nenhum neste recorte. O que não é essencial está fora do escopo.

## 6. Fora do escopo

- Quatro consultas separadas, ou filtrar o catálogo inteiro no navegador.
- Ranking por pedido pago, contador de vendas e ordem manual de mais vendidos.
- Reescrever a categoria dos produtos `GTAIV` para um tipo real. Isso fica para correção manual, produto a produto.
- Cadastrar produtos Marvel ou DC. Sem produto com essa franquia, a faixa nasce oculta.
- Página do produto, coleção, busca e qualquer tela que volte a precisar do catálogo completo.
- Esqueleto, título ou grade vazia no lugar de uma faixa sem produto.
- Preço riscado e texto de parcela diferente do que o card já calcula a partir do preço atual.
- Mudar o banner, as categorias, os serviços, a navegação e o rodapé.
- Painel para marcar `bestseller` ou preencher franquia.

## 7. Regras de negócio

- Regra 1: A home pede as quatro listas numa consulta só. Não pede o catálogo inteiro.
- Regra 2: Nenhuma página deste recorte baixa o catálogo inteiro para montar vitrine ou para achar preço de carrinho.
- Regra 3: Franquia e categoria são informações diferentes. Franquia é `GTA VI`, `Marvel` ou `DC`. Categoria é o tipo do produto.
- Regra 4: Produto cuja categoria ainda é o texto `GTAIV` recebe franquia `GTA VI`. O texto da categoria não muda neste recorte.
- Regra 5: Mais vendidos são os produtos marcados como mais vendidos. Se houver mais de oito, entram os oito com data mais recente. A data não transforma a faixa em novidades.
- Regra 6: GTA VI, Marvel e DC listam produtos daquela franquia, do mais novo para o mais antigo, no máximo oito.
- Regra 7: Datas iguais não embaralham a faixa entre duas aberturas com o mesmo catálogo.
- Regra 8: Um produto marcado e com franquia aparece nas duas faixas. As listas não se excluem.
- Regra 9: Produto sem franquia, ou com franquia diferente das três, só pode aparecer em mais vendidos, e só se estiver marcado.
- Regra 10: Zero produtos esconde a faixa inteira, título incluído. De um a sete, a faixa mostra esses, sem completar até oito.
- Regra 11: A ordem visível é banner, categorias, mais vendidos, GTA VI, Marvel, DC, serviços. Faixa oculta não deixa buraco com título.
- Regra 12: O card da vitrine mostra nome, preço e a primeira imagem, e continua levando ao endereço de produto que o card já usa. Não mostra preço antigo riscado.
- Regra 13: Enquanto a consulta não respondeu, as quatro faixas não ocupam espaço. Banner, categorias e serviços permanecem.
- Regra 14: Falha da consulta esconde as quatro faixas e mostra o aviso "Erro ao carregar produtos." Não troca a página inteira por uma tela de erro.
- Regra 15: O total do carrinho soma o preço que veio em cada item. Não procura esse preço no catálogo.
- Regra 16: A vitrine da home não exige login. O carrinho continua sendo de quem está logado, como já é hoje.
- Suposição 1: Marvel e DC mostram só o nome da marca, sem parágrafo. O spotlight de GTA VI e o texto que já acompanha "MAIS VENDIDOS" permanecem os da home atual. Não houve frase nova confirmada.
- Suposição 2: Produto da vitrine sem primeira imagem continua na lista. O card aparece sem foto. Ele não é descartado e a home não busca o restante das imagens.
- Suposição 3: Item de carrinho sem preço não entra na soma e não dispara download do catálogo nem o aviso da Regra 14. O total é a soma dos itens que têm preço.

## 8. Fluxos principais

### Fluxo 1 — Abrir a home

1. A pessoa abre a home, com ou sem login.
2. Vê na hora o banner, as categorias e, mais abaixo, os serviços.
3. As quatro faixas ainda não ocupam espaço.
4. A home pede, numa consulta, mais vendidos, GTA VI, Marvel e DC.
5. Cada faixa com pelo menos um produto aparece, na ordem da Regra 11, com até oito cards.
6. Faixa sem produto não aparece.

### Fluxo 2 — Consulta da home falha

1. A pessoa abre a home.
2. Banner, categorias e serviços aparecem.
3. A consulta falha.
4. Nenhuma das quatro faixas aparece.
5. A pessoa vê o aviso "Erro ao carregar produtos."

### Fluxo 3 — Total do carrinho sem o catálogo

1. A pessoa logada já tem itens no carrinho.
2. Cada item chega com o próprio preço.
3. O total soma esses preços.
4. A loja não baixa o catálogo para completar a conta.

### Fluxo 4 — Produto GTA já cadastrado

1. Existe produto com categoria `GTAIV` e sem franquia.
2. O preenchimento grava a franquia `GTA VI` nele.
3. A categoria continua `GTAIV`.
4. Se ele estiver entre os oito mais novos dessa franquia, entra na faixa GTA VI da home.

## 9. Critérios de aceite

- O visitante vê, no máximo, as quatro faixas, nesta ordem: mais vendidos, GTA VI, Marvel, DC.
- A home não baixa o catálogo inteiro.
- Mais vendidos mostra só produtos marcados, no máximo oito, os mais novos quando houver excesso.
- Cada franquia mostra só produtos daquela franquia, no máximo oito, do mais novo ao mais antigo.
- O mesmo produto pode estar em mais vendidos e na sua franquia.
- Faixa vazia não aparece. Faixa com menos de oito mostra só o que existe.
- Durante o carregamento, as faixas não ocupam espaço e o restante da home permanece.
- Quando a consulta falha, as faixas somem e o aviso "Erro ao carregar produtos." aparece.
- Cada card da vitrine tem nome, preço e a primeira imagem, sem preço riscado.
- Produto que era `GTAIV` passa a ter franquia `GTA VI`, e a categoria não é reescrita.
- O total do carrinho usa o preço de cada item e não o catálogo.
- O sistema não deve montar a home com quatro consultas, nem filtrar a lista completa no navegador.

## 10. Stack

A vitrine entra na loja que já existe: Next.js, React, TypeScript e Tailwind, com o catálogo e o carrinho que a home e o carrinho já consultam. O serviço de catálogo não está neste repositório. Esta feature muda o comportamento desse serviço e o da home. Não pede biblioteca nova.

## 11. Justificativa da stack

A home, o card, o carrinho e a consulta de produtos já existem. Trocar de stack para mostrar quatro listas curtas não resolve o peso do catálogo. O ganho está em pedir menos dados, uma vez, e em fazer o carrinho carregar o próprio preço.

## 12. Fases de construção

### Fase 1 — Dados que a vitrine precisa

Objetivo: o catálogo distingue franquia de tipo, e o GTA já cadastrado fica encontrável por franquia, sem o carrinho quebrar quando a home deixar de baixar tudo.

Specs:

- Spec 01 — Franquia no produto e produtos GTA já cadastrados
- Spec 02 — Preço em cada item do carrinho

### Fase 2 — Vitrine da home

Objetivo: a home mostra as quatro faixas a partir de uma consulta curta e para de baixar o catálogo inteiro.

Specs:

- Spec 03 — Uma consulta com as quatro listas
- Spec 04 — Faixas na página inicial

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Franquia no produto e produtos GTA já cadastrados

- **Fase:** Fase 1
- **Objetivo (o quê):** O produto passa a ter franquia, separada do tipo, e os produtos GTA já salvos recebem `GTA VI`.
- **Intenção (por quê):** A home precisa pedir "o que é de GTA VI" sem baixar o catálogo e sem usar a categoria, que hoje guarda o texto `GTAIV` no lugar da franquia. Sem esse preenchimento, a faixa de GTA nasceria vazia e ficaria oculta.
- **Contexto:** O produto da loja já tem nome, descrição, preço, imagens, categoria, subcategoria, tamanhos, marca de mais vendido, data e avaliações. A home atual trata categoria `GTAIV` como se fosse a franquia. Marvel e DC não aparecem nos dados que este repositório conhece. O serviço de catálogo é o mesmo que a loja já usa e não está neste repositório.
- **Atores:** O preenchimento roda sobre o catálogo existente. O visitante não dispara esta spec. Quem cadastra produto não ganha tela nova.
- **Descrição do comportamento:** Todo produto pode ter uma franquia. Os valores usados por esta feature são exatamente `GTA VI`, `Marvel` e `DC`. Ausência de franquia é válida. Categoria continua significando o tipo (roupa, caneca, luminária e o que mais já existir) e não é apagada nem reescrita por esta spec.

  Para cada produto cuja categoria é exatamente o texto `GTAIV`, a franquia gravada passa a ser `GTA VI`. Se esse produto já tiver franquia, ela é substituída por `GTA VI` somente quando a categoria for `GTAIV`. Produto com outra categoria não é alterado. O texto `GTAIV` permanece na categoria. Não se inventa um tipo no lugar dele.

  Produto novo não é criado aqui. Marvel e DC só passam a existir quando um produto for gravado com essa franquia por um meio que esta feature não constrói.
- **Entradas e saídas:** Entrada: produtos já gravados, em especial os de categoria `GTAIV`. Saída: esses produtos com franquia `GTA VI` e a mesma categoria de antes. Os demais produtos permanecem como estavam, agora podendo ter franquia vazia.
- **Dados/entidades envolvidos (conceitual):** Produto: identidade, nome, preço, imagens, categoria (tipo), subcategoria, marca de mais vendido, data, franquia. A franquia é um texto controlado (`GTA VI`, `Marvel`, `DC`) ou ausente. A data é a mesma que o produto já tem e serve, nas specs seguintes, para ordenar.
- **Estados e transições:** Produto `GTAIV` sem franquia passa a ter franquia `GTA VI`. Produto `GTAIV` que já tinha outra franquia passa a ter `GTA VI`. Produto de outra categoria não muda de estado. Não há estado de "migração parcial" visível para o visitante: ou o preenchimento terminou para esse produto, ou ele ainda não foi processado. Repetir o preenchimento no mesmo catálogo deixa o resultado igual.
- **Regras de negócio:** Regras 3 e 4. Não criar produto. Não renomear categoria. Não preencher Marvel ou DC por semelhança de nome.
- **Validações:** Só entra no preenchimento o produto com categoria exatamente `GTAIV`. Maiúsculas e minúsculas contam: outro texto parecido não recebe franquia. Franquia gravada por esta spec só pode ser `GTA VI`.
- **Fluxo do usuário (passo a passo):**
  1. Não há passo na tela.
  2. O preenchimento encontra os produtos de categoria `GTAIV`.
  3. Grava a franquia `GTA VI` em cada um.
  4. Deixa a categoria como está.
- **Casos de borda e erros:** Catálogo sem nenhum `GTAIV`: o preenchimento termina sem erro e sem mudar produto. Produto `GTAIV` sem data ou sem imagem: ainda recebe a franquia. Esta spec não o tira da loja. Falha no meio do preenchimento: o que já foi gravado permanece `GTA VI`, e rodar de novo só completa os que faltam, sem duplicar produto. Nome que contém "GTA" mas a categoria não é `GTAIV`: não muda.
- **Impacto no existente:** A seleção antiga "categoria igual a `GTAIV`" deixa de ser a definição de GTA VI. Quem ainda filtrar por essa categoria continua achando os mesmos produtos, porque a categoria não mudou, mas a vitrine nova usa a franquia. Nenhum preço, nome ou imagem é alterado.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado um produto com categoria `GTAIV` e sem franquia, Quando o preenchimento roda, Então a franquia fica `GTA VI` e a categoria continua `GTAIV`.
  - Dado um produto com outra categoria, Quando o preenchimento roda, Então a franquia e a categoria dele não mudam.
  - Dado que o preenchimento já rodou, Quando roda de novo, Então não nasce produto duplicado e quem já estava `GTA VI` continua `GTA VI`.
  - Dado um produto cuja categoria parece GTA mas não é exatamente `GTAIV`, Quando o preenchimento roda, Então ele não recebe franquia por esta spec.
- **Definição de pronto:** Depois do preenchimento, todo produto de categoria `GTAIV` tem franquia `GTA VI`, a categoria desses produtos está intacta, e nenhum outro produto foi alterado.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Montar a home, devolver as quatro listas, mudar o preço do carrinho, escolher o tipo certo no lugar de `GTAIV`, e criar produtos Marvel ou DC.

### Spec 02 — Preço em cada item do carrinho

- **Fase:** Fase 1
- **Objetivo (o quê):** Cada item do carrinho traz o preço que entra no total, sem a loja precisar do catálogo completo.
- **Intenção (por quê):** A home vai parar de baixar todos os produtos. Hoje o total acha o preço procurando o produto nessa lista. Se a lista sair e o preço não vier no item, a conta quebra.
- **Contexto:** O carrinho da loja já existe para quem está logado. Cada item já tem identidade do produto, tamanho, quantidade e, às vezes, o nome. O preço hoje é resolvido olhando o catálogo carregado na página. Visitante sem login não tem esse total. A página de carrinho em si não faz parte deste recorte. O PRD de navegação global também não constrói essa página. Esta spec só muda de onde o preço vem.
- **Atores:** Pessoa logada com itens no carrinho. Visitante sem login não vê total.
- **Descrição do comportamento:** Ao informar os itens do carrinho de quem está logado, cada item inclui o preço unitário atual do produto. O total é a soma de preço unitário vezes quantidade, para cada item que tenha preço. A loja não baixa o catálogo, nem uma lista de produtos, para descobrir esse número.

  Quem não está logado não dispara essa leitura de carrinho e não vê total calculado por esta spec.

  O preço é o preço atual do produto no momento da leitura do carrinho. Esta spec não congela o preço de um pedido já feito.
- **Entradas e saídas:** Entrada: a pessoa logada e os itens já guardados no carrinho. Saída: os mesmos itens, cada um com preço unitário, e o total igual à soma de preço vezes quantidade. Sem login, não há saída de total.
- **Dados/entidades envolvidos (conceitual):** Item de carrinho: identidade do produto, tamanho, quantidade, nome se já existir, preço unitário. Total: soma dos itens que têm preço. Produto: o preço atual, só para copiar esse número para o item. O restante do produto (descrição, imagens, avaliações) não viaja nesta leitura.
- **Estados e transições:** Sem login: sem total. Com login e carrinho vazio: total zero, sem consulta ao catálogo completo. Com login e itens com preço: total calculado. Com login e algum item sem preço: esse item fica de fora da soma e os outros entram. Não há estado em que a ausência de preço ligue o download do catálogo.
- **Regras de negócio:** Regras 2, 15 e 16. Suposição 3.
- **Validações:** Quantidade ausente ou menor que um não ganha um preço inventado: o item não entra na soma. Preço ausente não é trocado pelo preço de outro produto. Preço zero é preço válido e entra na soma como zero.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa logada abre a loja com itens no carrinho.
  2. Os itens chegam com preço unitário.
  3. O total mostrado usa só esses preços e as quantidades.
  4. O catálogo completo não é pedido.
- **Casos de borda e erros:** Carrinho vazio: total zero. Item cujo produto não existe mais: o item não entra na soma e não derruba os outros. Não mostra o aviso "Erro ao carregar produtos.", que é só da vitrine. Falha ao ler o carrinho: o total não é inventado a partir de uma lista de produtos. Esta spec não define um aviso novo para essa falha. Pessoa sem login: nenhum total é calculado por aqui.
- **Impacto no existente:** O cálculo que procurava o produto numa lista completa deixa de ser a fonte do total. Nome, tamanho e quantidade do item continuam. Adicionar e remover do carrinho não mudam de regra nesta spec.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado uma pessoa logada com dois itens que têm preço e quantidade, Quando o carrinho é lido, Então o total é a soma de preço vezes quantidade e o catálogo completo não é pedido.
  - Dado um item sem preço e outro com preço, Quando o total é calculado, Então só o item com preço entra na soma.
  - Dado uma pessoa sem login, Quando a home abre, Então esta spec não calcula total e não pede o catálogo.
  - Dado um carrinho vazio de pessoa logada, Quando o carrinho é lido, Então o total é zero.
- **Definição de pronto:** O total de quem está logado sai dos preços que vieram nos itens, e nenhuma leitura de carrinho desta spec exige o catálogo completo.
- **Dependências:** Nenhuma. Pode ser feita junto com a Spec 01. A Spec 04 só pode deixar de baixar o catálogo depois desta.
- **Fora do escopo desta spec:** Página de carrinho, frete, pedido, preço riscado, alterar a regra de login, e as listas da home.

### Spec 03 — Uma consulta com as quatro listas

- **Fase:** Fase 2
- **Objetivo (o quê):** Uma consulta devolve mais vendidos, GTA VI, Marvel e DC, já cortados em oito e já no formato curto do card.
- **Intenção (por quê):** Quatro consultas, ou uma lista completa filtrada na home, repetem o problema de peso. A home precisa receber só o que vai mostrar.
- **Contexto:** Depende da franquia da Spec 01. O produto já tem a marca de mais vendido e a data. A home hoje filtra isso no navegador depois de baixar tudo. Esta spec substitui esse filtro. O serviço de catálogo continua sendo o que a loja já consulta.
- **Atores:** A home, ao abrir. Qualquer visitante, com ou sem login.
- **Descrição do comportamento:** Uma consulta, sem login, devolve quatro listas nomeadas: mais vendidos, GTA VI, Marvel e DC. Cada lista tem no máximo oito itens. Cada item tem somente: identidade do produto, nome, preço e a primeira imagem. Não vêm descrição, as outras imagens, tamanhos, avaliações, categoria, subcategoria nem a própria franquia. A lista em que o item está já diz a faixa.

  Mais vendidos: somente produtos marcados como mais vendidos, do mais novo para o mais antigo pela data que o produto já tem, até oito. A marca de mais vendido é obrigatória. A data só escolhe quais entram quando há mais de oito marcados.

  GTA VI: produtos com franquia exatamente `GTA VI`, do mais novo ao mais antigo, até oito. O mesmo para `Marvel` e `DC`. Categoria `GTAIV` não coloca o produto na lista se a franquia não for `GTA VI`.

  Um produto que esteja marcado e tenha franquia entra na lista de mais vendidos e na lista da franquia. As consultas não removem duplicata entre listas.

  Produto sem franquia entra só em mais vendidos, e só se estiver marcado. Franquia diferente das três não ganha lista.

  Se não houver item para uma lista, ela vem vazia. Isso não é falha. Falha é a consulta não completar, ou completar sem uma das quatro listas. Nesse caso nada do que seria exibido por esta consulta deve ser inventado a partir do catálogo completo.

  Itens com a mesma data permanecem na mesma ordem relativa em duas consultas seguidas sobre o mesmo catálogo.

  A primeira imagem é uma só. Se o produto não tiver imagem, o item ainda vem, com a imagem ausente (Suposição 2).
- **Entradas e saídas:** Entrada: nenhuma escolha da pessoa. A home pede as quatro listas. Saída: quatro listas, cada uma com zero a oito itens curtos. Não sai o catálogo.
- **Dados/entidades envolvidos (conceitual):** Quatro listas. Item de vitrine: identidade, nome, preço, primeira imagem. Critério de mais vendidos: marcado ou não, mais a data. Critério de franquia: o texto exato da franquia, mais a data. O produto completo existe no catálogo, mas não é a saída.
- **Estados e transições:** Consulta em andamento: ainda não há listas. Consulta concluída: quatro listas, vazias ou não. Consulta falha: nenhuma lista utilizável. Não há estado de "três listas prontas e uma faltando" tratado como sucesso.
- **Regras de negócio:** Regras 1, 5, 6, 7, 8, 9 e 12. A Regra 12, aqui, limita o que a consulta entrega. Quem desenha o card é a Spec 04.
- **Validações:** A resposta só é utilizável se as quatro listas existirem, mesmo vazias. Item sem identidade, sem nome ou sem preço não entra na lista. Imagem ausente não rejeita o item. Mais de oito itens numa lista é resposta inválida: a lista válida é a já cortada em oito. Franquia diferente do nome da lista não entra nela.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre a home.
  2. Uma consulta pede as quatro listas.
  3. O catálogo escolhe, ordena e corta cada lista.
  4. A home recebe só os itens curtos.
- **Casos de borda e erros:** Nenhum produto marcado: mais vendidos vem vazio, e as franquias seguem normais. Nenhuma franquia preenchida: as três listas de franquia vêm vazias. Mais de oito marcados: só os oito mais novos. Produto marcado e `GTA VI`: aparece nas duas listas. Produto `GTAIV` que ainda não recebeu franquia: não entra em GTA VI. Consulta interrompida: não devolver metade do catálogo no lugar. Duas aberturas sem mudança no catálogo: as mesmas oito posições, na mesma ordem.
- **Impacto no existente:** O filtro feito na home sobre a lista completa deixa de ser a fonte das faixas. A lista completa pode continuar existindo para uma página futura de coleção ou busca. Esta spec não a entrega para a home.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado o catálogo com produtos marcados e das três franquias, Quando a home consulta a vitrine, Então recebe quatro listas e não o catálogo inteiro.
  - Dado doze produtos marcados com datas diferentes, Quando mais vendidos é montado, Então a lista tem os oito de data mais recente e todos estão marcados.
  - Dado um produto marcado com franquia `Marvel`, Quando as listas são montadas, Então ele aparece em mais vendidos e em Marvel.
  - Dado um produto com categoria `GTAIV` e franquia ainda vazia, Quando GTA VI é montado, Então ele não entra.
  - Dado uma franquia sem produtos, Quando a consulta conclui, Então essa lista vem vazia e a consulta não é tratada como falha por causa disso.
  - Dado um item da lista, Quando se olha o conteúdo, Então há identidade, nome, preço e no máximo a primeira imagem, sem descrição, tamanhos nem avaliações.
- **Definição de pronto:** Uma consulta pública devolve as quatro listas já cortadas e ordenadas, no formato curto, e a home não precisa do catálogo completo para obter esse resultado.
- **Dependências:** Spec 01. Sem a franquia preenchida, GTA VI não encontra os produtos antigos de categoria `GTAIV`.
- **Fora do escopo desta spec:** Desenhar as faixas, o aviso de erro na tela, o carregamento visual, o total do carrinho e a página de produto.

### Spec 04 — Faixas na página inicial

- **Fase:** Fase 2
- **Objetivo (o quê):** A home mostra as quatro faixas com as listas da Spec 03 e deixa de baixar o catálogo inteiro.
- **Intenção (por quê):** A consulta curta só melhora a página se a home usar essas listas e parar de pedir o resto. Faixa vazia com título parece seção quebrada. Falha e catálogo vazio não podem parecer a mesma coisa.
- **Contexto:** A home já tem banner, categorias, uma grade com título "MAIS VENDIDOS" que hoje lista os dez primeiros produtos, o spotlight de GTA VI com o texto atual, um bloco de marcas vazio e os serviços. O card de produto já mostra imagem, nome, preço, um preço riscado quando recebe preço antigo, e um link para o endereço do produto. Essa página de produto pode não existir. O aviso "Erro ao carregar produtos." já é o aviso usado quando os produtos não carregam. A navegação e o rodapé não mudam.
- **Atores:** Qualquer visitante da home.
- **Descrição do comportamento:** Ao abrir a home, banner, categorias e serviços aparecem sem esperar a vitrine. As quatro faixas não reservam espaço enquanto a consulta da Spec 03 não voltou.

  Quando a consulta conclui, as faixas com pelo menos um item aparecem nesta ordem, de cima para baixo: mais vendidos, GTA VI, Marvel, DC. Serviços continuam depois da última faixa visível. Faixa com lista vazia não é renderizada: sem título, sem texto, sem grade.

  Mais vendidos ocupa o lugar da grade que hoje se chama "MAIS VENDIDOS" e mantém o título e o texto de apoio que essa grade já tem. Os produtos deixam de ser os dez primeiros da lista geral. GTA VI continua no spotlight que a home já mostra, com o texto que esse spotlight já tem. Os produtos deixam de ser os cinco filtrados por categoria `GTAIV`. Marvel e DC são duas faixas separadas, abaixo do GTA, cada uma só com o nome da marca, sem parágrafo (Suposição 1). O bloco único de "marcas populares" com lista vazia sai.

  Cada card mostra a primeira imagem, o nome e o preço, na moeda que a loja já usa, e leva ao mesmo endereço de produto que o card já usa. Não recebe preço antigo, então não mostra preço riscado. Parcela, se o card já calcula a partir do preço, continua saindo desse preço. Imagem ausente: o card aparece sem foto (Suposição 2).

  Se a consulta falha, ou volta sem uma das quatro listas, nenhuma das quatro faixas aparece e o aviso "Erro ao carregar produtos." é mostrado uma vez. Banner, categorias e serviços ficam. Não há botão novo de tentar de novo nesta spec.

  Em nenhuma abertura a home pede o catálogo completo. O total do carrinho, se a pessoa estiver logada, usa a Spec 02.
- **Entradas e saídas:** Entrada: as quatro listas da Spec 03, ou a falha dessa consulta. Saída: as faixas visíveis, ou a ausência delas mais o aviso. O endereço de cada card é o de produto já usado pelo card.
- **Dados/entidades envolvidos (conceitual):** As quatro listas de itens curtos da Spec 03. Os trechos fixos da home: banner, categorias, texto atual de mais vendidos, texto atual do spotlight de GTA VI, nome das marcas Marvel e DC, serviços. O aviso de falha.
- **Estados e transições:**
  - Abrindo: banner, categorias e serviços visíveis. Nenhuma das quatro faixas ocupa espaço. Sem aviso de erro.
  - Consulta concluída com alguma lista cheia: só as faixas com item aparecem, na ordem da Regra 11.
  - Consulta concluída com as quatro listas vazias: nenhuma faixa de vitrine, sem aviso de erro. O restante da home fica.
  - Consulta falha: nenhuma faixa de vitrine, com o aviso da Regra 14.
  - Não há estado de esqueleto nem de título esperando card.
- **Regras de negócio:** Regras 1, 2, 10, 11, 12, 13 e 14. Suposições 1 e 2.
- **Validações:** A home não completa lista vazia com produto de outra faixa. Não mostra item sem nome ou sem preço, mesmo que a consulta o tenha deixado passar. Não pede o catálogo completo se uma lista vier vazia ou se a consulta falhar.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre a home e vê banner e categorias.
  2. Espera sem um bloco vazio no lugar das faixas.
  3. Vê mais vendidos, depois o spotlight de GTA VI, depois Marvel e DC, pulando quem não tiver produto.
  4. Vê os serviços abaixo.
  5. Se a consulta falhar, vê o aviso e não vê as faixas.
  6. Se acionar um card, vai ao endereço de produto que o card já usa.
- **Casos de borda e erros:** Só GTA VI tem produtos: mais vendidos, Marvel e DC não aparecem, e GTA aparece no lugar combinado, abaixo de categorias e acima dos serviços. Três produtos numa faixa: a grade mostra três, não oito. O mesmo produto nas duas primeiras faixas: dois cards, os dois levam ao mesmo endereço. Falha de rede: um aviso, faixas ocultas, sem lista completa de reserva. Lista com mais de oito itens: a home mostra só os oito primeiros na ordem recebida e não reordena por conta própria. Card sem imagem: nome e preço permanecem.
- **Impacto no existente:** A grade deixa de usar os dez primeiros produtos. O spotlight deixa de filtrar categoria `GTAIV` na página. O bloco de marcas vazio é substituído por Marvel e DC quando houver produto. O carregamento do catálogo inteiro em toda página deixa de acontecer. O card, fora destas faixas, não é redesenhado. Banner, categorias, serviços, navegação e rodapé permanecem.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a consulta ainda não voltou, Quando a pessoa olha a home, Então banner, categorias e serviços estão visíveis e nenhuma das quatro faixas ocupa espaço.
  - Dado que as quatro listas têm produtos, Quando a consulta conclui, Então a ordem é mais vendidos, GTA VI, Marvel, DC, e cada faixa tem no máximo oito cards.
  - Dado que Marvel veio vazio e as outras listas não, Quando a home desenha as faixas, Então não há título Marvel e as outras três aparecem.
  - Dado que a consulta falha, Quando a home reage, Então as quatro faixas ficam ocultas, o aviso "Erro ao carregar produtos." aparece, e banner, categorias e serviços continuam.
  - Dado que as quatro listas voltam vazias, Quando a home desenha, Então não há faixas de vitrine e não há aviso de erro.
  - Dado um card da vitrine, Quando a pessoa olha o preço, Então vê o preço atual, sem preço riscado, e o acionar leva ao endereço de produto já usado pelo card.
  - Dado que a home abriu, Quando as requisições da página terminam, Então o catálogo completo não foi pedido.
- **Definição de pronto:** A home mostra somente as faixas que têm produto, na ordem e nos limites combinados, distingue falha de lista vazia, e abre sem baixar o catálogo inteiro. O total de quem está logado continua coerente com a Spec 02.
- **Dependências:** Spec 03 para as listas. Spec 02 para o total não quebrar quando o catálogo completo sair. Spec 01 para a faixa GTA VI encontrar os produtos antigos.
- **Fora do escopo desta spec:** Criar a página de produto, a coleção e a busca. Inventar texto de Marvel, DC ou do spotlight. Esqueleto de carregamento. Reescrever categoria `GTAIV`.

## 14. Ordem recomendada de implementação

1. Spec 01 — Franquia no produto e produtos GTA já cadastrados
2. Spec 02 — Preço em cada item do carrinho
3. Spec 03 — Uma consulta com as quatro listas
4. Spec 04 — Faixas na página inicial

A Spec 01 vem primeiro porque, sem franquia, a lista de GTA VI não acha o catálogo atual. A Spec 02 pode ser feita em paralelo com a 01, mas precisa estar pronta antes da 04: é ela que impede o total do carrinho de quebrar quando o catálogo completo sai. A Spec 03 depende da 01 e entrega o contrato que a Spec 04 só consome. Implementar a home antes das três primeiras obrigaria a página a filtrar a lista completa de novo, que é o comportamento que esta feature substitui.
