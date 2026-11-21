# Plano técnico — Navegação global

> Fonte de comportamento: [feature-navegacao-global.md](../prd/feature-navegacao-global.md)
> Data: 2026-11-12
> Status: pronto para implementar, na ordem das tarefas abaixo

O PRD define o que a navegação faz. Este plano define onde isso mora, o que reutilizar e o que não criar. Não adiciona comportamento novo.

## 1. Correção em relação ao PRD

O PRD pede para reutilizar a marca já presente no projeto. O arquivo `public/logo.png` é o logo **Forever** (template antigo), não a Caverna do Nerd. Os PNGs de carrinho, busca, perfil e menu em `public/` são do mesmo template.

Decisão: não usar esses arquivos na navegação. A marca desta entrega é um wordmark em SVG, duas linhas (`CAVERNA` / `DO NERD`), preenchimento verde, contorno preto, link para `/`, nome acessível "Caverna do Nerd". Quando existir o arquivo oficial, troca só esse componente.

## 2. Decisões

- A navegação entra no root layout (`src/app/layout.tsx`), acima de `{children}`, em todas as páginas, inclusive no 404. O App Router renderiza o `not-found` dentro desse layout, então o endereço continua o que a pessoa pediu e o destaque de categoria funciona mesmo sem página.
- Não criar páginas para `/produtos`, `/produtos/camisetas`, `/produtos/agasalhos`, `/produtos/bermudas`, `/buscar`, `/conta` ou `/carrinho`. O link muda o endereço; a página pode ser o 404 atual.
- Componente global em `src/components/site-header/`. Não fica em `_components` de uma página: aparece no site inteiro.
- Server Component no layout. Ilhas client só onde há estado ou URL: faixa, busca, categorias e menu.
- `cacheComponents` está ligado. O layout não re-renderiza na navegação do cliente. Destaque de categoria e termo da busca leem a URL no cliente (`usePathname`, `useSearchParams`), cada um atrás de `<Suspense>`. Sem isso, uma rota dinâmica futura quebra o build.
- Carrinho: função síncrona `getCartIndicator()` em `src/lib/cart-indicator.ts`, retornando `{ hasItems: false }`. Sem `cookies()`, sem fetch. A bolinha fica oculta. Entrega futura de carrinho altera só essa função e, se passar a ler pedido, isola essa leitura num `<Suspense>` — não no layout inteiro.
- Sem shadcn, Radix ou outra dependência. O projeto não tem `components.json`, e o PRD não pede biblioteca nova. Ícones são SVG no próprio código.
- Breakpoint único: `lg` (1024px). Abaixo disso valem a faixa rotativa e o menu. De `lg` para cima, a referência (três frases, busca, conta, carrinho e categorias na barra).
- A barra rola com a página. Não usar `sticky` nem `fixed`.
- `html` passa a `lang="pt-BR"`. O título da aba passa a "Caverna do Nerd". O miolo da home atual permanece como está.
- Fonte da interface: Geist, já carregada. O wordmark não usa a fonte do corpo; é SVG.

## 3. Arquivos

| Arquivo | Papel |
| --- | --- |
| `src/lib/navigation.ts` | Categorias, frases da faixa, `getActiveCategoryHref`, `normalizeSearchTerm` |
| `src/lib/cart-indicator.ts` | `{ hasItems: boolean }` para a bolinha |
| `src/components/site-header/site-header.tsx` | Composição server. Recebe `hasItems` e monta as ilhas com Suspense |
| `src/components/site-header/brand-mark.tsx` | Wordmark + link para `/` |
| `src/components/site-header/promo-bar.tsx` | Client. Specs 01 e 04 |
| `src/components/site-header/search-form.tsx` | Client. Envio da busca |
| `src/components/site-header/category-nav.tsx` | Client. Quatro links e destaque |
| `src/components/site-header/account-link.tsx` | Link `/conta` |
| `src/components/site-header/cart-link.tsx` | Link `/carrinho` e bolinha |
| `src/components/site-header/mobile-menu.tsx` | Client. Spec 05 |
| `src/components/site-header/icons.tsx` | SVGs: entrega, troca, coração, lupa, pessoa, carrinho, menu, fechar |
| `src/app/layout.tsx` | Idioma, título, header, invólucro `#page-content` |
| `src/app/globals.css` | Tokens da navegação no `@theme` já existente |

Nada em `src/app/**/page.tsx` além do layout. Nada em `public/assets.ts`.

## 4. Contratos

### Categorias

Checar caminhos específicos antes de `/produtos`. Se `/produtos` for testado com `startsWith` primeiro, todas as categorias filhas acendem "Todos produtos".

| Caminho | Destaque |
| --- | --- |
| `/produtos` | Todos produtos |
| `/produtos/camisetas` e o que começar com `/produtos/camisetas/` | Camisetas |
| `/produtos/agasalhos` e prefixo com `/` | Agasalhos |
| `/produtos/bermudas` e prefixo com `/` | Bermudas |
| `/`, `/buscar`, `/conta`, `/carrinho` e qualquer outro | nenhum |

`aria-current="page"` no link ativo. O ativo também leva sublinhado. Os quatro continuam brancos: a diferença não pode ser só cor.

### Busca

`normalizeSearchTerm` devolve o texto sem espaços nas pontas, ou `null` se sobrar string vazia.

- `null`: não chama o router, não mostra erro, não fecha o menu.
- Texto: `router.push` para `/buscar?q=` + `encodeURIComponent(termo)`. O destino é sempre a busca, mesmo que o texto seja `/conta`.
- Enter e a lupa usam o mesmo submit.
- Não buscar a cada tecla. Sem sugestões.
- Se o endereço já é `/buscar` com `q`, o campo mostra esse valor. Fora da busca, o campo começa vazio.
- Dois formulários podem existir (barra e menu). `useId()` em cada um. Só um fica visível por vez.

### Carrinho e conta

- Conta: nome acessível "Conta", href `/conta`.
- Carrinho: href `/carrinho`. Sem itens, nome "Carrinho" e sem bolinha. Com itens, bolinha verde sem número e nome acessível informando que há itens.
- A bolinha não é um controle separado.

### Faixa

Frases, nesta ordem, sem link:

1. Envio grátis para todo o Brasil
2. Trocas e devoluções em até 7 dias!
3. Parcele suas compras em até 12x!

As três estão sempre no DOM, numa lista, para o leitor de tela achar as três sem aviso a cada troca. Sem `aria-live`.

- De `lg` para cima, CSS mostra as três na mesma linha (esquerda, centro, direita), com ícone. A troca automática não roda.
- Abaixo de `lg`, a primeira frase é a visível no HTML inicial. As outras ficam só para tecnologia assistiva. Depois da hidratação, um intervalo de 4 segundos avança a frase e volta à primeira depois da terceira.
- Pausa em `pointerenter` / `focusin`; retoma quando ponteiro e foco saem. Não pular frase.
- `prefers-reduced-motion: reduce`: não criar o intervalo; CSS empilha as três.
- Ao cruzar para `lg`, parar o intervalo. Ao voltar para estreito, recomeçar na primeira frase.

O HTML inicial já deixa a primeira frase visível no celular e as três visíveis no desktop via CSS, para não haver flash nem divergência de hidratação. O client só liga o ciclo.

### Menu

Abaixo de `lg`, a barra preta mostra o wordmark e o botão do menu. Busca, categorias, conta e carrinho não aparecem até abrir.

- Estado inicial: fechado.
- Botão com `aria-expanded` e `aria-controls`. Nome acessível que diga se o menu está aberto ou fechado.
- Ao abrir, o foco vai para o campo de busca. `#page-content`, a faixa e o wordmark ficam `inert`. O botão do menu continua utilizável.
- Fecha ao seguir um link (categoria, conta, carrinho, marca), ao enviar uma busca válida, ao pressionar Escape ou ao apontar fora do painel e do botão. O foco volta ao botão.
- Busca vazia não fecha e não navega.
- Só um painel. Abrir de novo não duplica.
- Se a largura passa a `lg` com o painel aberto, fecha e não envia o texto que ainda não foi submetido. Na direção contrária, nasce fechado.
- Em `lg` o botão não é renderizado de forma visível (`lg:hidden`), e o painel também não.

Foco preso no botão + painel enquanto aberto. Controles com foco visível.

## 5. Visual

Tokens no `@theme` de `globals.css`, usados pelos componentes (sem cor solta repetida em cada arquivo):

| Token | Uso | Valor |
| --- | --- | --- |
| `promo` | Faixa e bolinha | `#1a9f45` |
| `promo-foreground` | Texto e ícones da faixa | `#ffffff` |
| `header` | Área da marca, busca e categorias | `#000000` |
| `header-foreground` | Ícones, wordmark de apoio e categorias | `#ffffff` |
| `search` | Campo | `#ffffff` |
| `search-foreground` | Texto digitado | `#171717` |
| `search-placeholder` | Placeholder | `#8a8a8a` |

Campo de busca: pílula, placeholder "Buscar produtos...", lupa à direita dentro do campo. Categorias: maiúsculas, espaçamento largo, centralizadas, texto pequeno — como na referência. Wordmark à esquerda; conta e carrinho à direita, só ícone.

## 6. Layout

`src/app/layout.tsx`:

- `lang="pt-BR"`.
- `metadata.title`: "Caverna do Nerd".
- `<SiteHeader hasItems={getCartIndicator().hasItems} />` como primeiro filho do `body`.
- `{children}` dentro de `<div id="page-content" class="flex min-h-0 flex-1 flex-col">`. Esse id é o alvo do `inert` com o menu aberto. Não remover.

`SiteHeader` envolve a navegação de categorias em `<Suspense>` com fallback dos quatro links sem destaque, e cada `SearchForm` em `<Suspense>` com fallback do campo vazio. Os fallbacks ocupam o mesmo espaço da versão real.

## 7. Fora deste plano

- Páginas de destino, filtro do catálogo e reclassificação dos produtos em inglês.
- Instalar shadcn ou qualquer pacote.
- Usar `public/logo.png` e os ícones PNG do template Forever.
- Sacola, quantidade, autocomplete, faixa fixa, submenu.
- Reescrever a home.
- Configurar Jest. Ainda não há runner no projeto; a checagem desta entrega é a lista da seção 9.

## 8. Ordem de implementação

Cada tarefa termina com a navegação ainda coerente. Não antecipar o menu antes da busca e das categorias existirem.

### Tarefa 1 — Base

Criar `navigation.ts`, `cart-indicator.ts`, tokens, `SiteHeader` vazio no layout, idioma e título. Critério: toda página mostra um topo vazio sem quebrar a home.

### Tarefa 2 — Spec 01

`PromoBar` no desktop: três frases, ícones, sem link, rola com a página.

### Tarefa 3 — Spec 02

Wordmark, `SearchForm`, conta e carrinho na barra `lg`. Busca vazia não navega. Bolinha só se `hasItems` for verdadeiro (hoje, falsa). Suspense no formulário.

### Tarefa 4 — Spec 03

`CategoryNav` com a tabela da seção 4 e Suspense. No `lg`, a linha de categorias aparece sob a área preta.

### Tarefa 5 — Spec 04

Completar a `PromoBar` estreita: ciclo de 4 segundos, pausa, menos movimento, três frases no DOM, sem `aria-live`.

### Tarefa 6 — Spec 05

`MobileMenu` reutilizando `SearchForm`, `CategoryNav`, `AccountLink` e `CartLink`. Abaixo de `lg`, esconder a versão da barra. Cumprir abertura, fechamento, `inert` e foco da seção 4.

## 9. Verificação

Subir o dev server e percorrer no navegador, não só olhar um print.

Desktop largo:

- Faixa verde com as três frases; clicar nelas não muda o endereço.
- Wordmark vai para `/`. Conta vai para `/conta`. Carrinho vai para `/carrinho`. Sem bolinha.
- "camisa" + Enter e "camisa" + lupa vão para `/buscar?q=camisa`. O campo mostra o termo.
- Campo vazio ou só com espaços não muda o endereço.
- O termo `/conta` vai para a busca, não para a conta.
- Camisetas vai para `/produtos/camisetas` e só ela fica destacada. O mesmo para agasalhos e bermudas.
- `/produtos` destaca só Todos produtos. `/`, busca, conta e carrinho não destacam ninguém.
- Rolar a home leva a faixa junto. Não fica presa.

Celular (largura abaixo de 1024):

- Uma frase por vez, na ordem, cerca de 4 segundos. Pausa com o ponteiro ou o foco na faixa.
- Barra mostra wordmark e botão. Busca e categorias só dentro do menu.
- Busca válida fecha o menu e navega. Busca vazia não.
- Escape, toque fora e um link de categoria fecham o menu. O foco volta ao botão.
- Alargar a janela com o menu aberto fecha o painel e mostra a barra da referência, sem disparar a busca.

Reduzir movimento no sistema: as três frases empilham e não trocam sozinhas.

Teclado: dá para chegar em todos os controles, o foco é visível, e o painel aberto não deixa o foco cair no miolo da página.
