# Status dos transportadores — ENESA × Vale

Dashboard web estático inspirado no visual Power BI. Não é um arquivo PBIX e não depende de Power BI, instalação, login, bibliotecas externas ou internet para carregar os recursos.

## Abrir no computador

Extraia o ZIP e abra `index.html` no navegador. Os dados são carregados por `data.js`, permitindo uso por arquivo local, sem servidor.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **o conteúdo desta pasta**, incluindo `index.html`, `styles.css`, `app.js`, `data.js`, `.nojekyll`, `assets/` e `data/`, para a raiz do repositório. Não envie apenas o ZIP.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e salve.
4. Acesse a URL exibida pelo GitHub após a publicação.

Todos os caminhos são relativos, compatíveis com repositórios GitHub Pages em subdiretórios.

## Funcionalidades

- Indicadores calculados a partir dos dados, matriz dos 12 TRs, busca, filtros e detalhes por TR.
- Quatro blocos, cartões clicáveis, exportação do checklist CSV, visual responsivo.
- Logos fornecidos e imagens 3D ilustrativas incluídos no pacote.

## Base e premissas

A atualização mais recente do supervisor prevalece sobre o mockup anterior. O Bloco 1 usa TR-2036KS-09 ao 20 (corrigindo o prefixo 2026 da lista inicial). O Bloco 2 inclui TR-2036KS-26, 27 e 28, agora em desmontagem de componentes para liberar o lançamento. Blocos 3 e 4 permanecem sem dados de avanço. Não há status por atividade para o Bloco 2.

Bloco 1: 108 itens (12 TRs × 9 atividades); 86 concluídos, 4 em andamento, 1 “iniciando hoje”, 17 não informados. Seis TRs (09–14) têm 9/9 itens concluídos. O indicador de 79,6% é a contagem simples de itens concluídos, sem ponderação física ou financeira. Não equivale a entrega formal, liberação de Qualidade ou emissão de relatórios.

Campos vazios não foram convertidos em “não iniciado” ou “pendente”. “Iniciando hoje” em TR20 reproduz o relato, sem atribuir uma data não informada. O lançamento do Bloco 1 é dado anterior fornecido pelo usuário; pesagem e emenda são as duas primeiras atividades da matriz atual. Responsáveis dos TR14–20 não foram informados.

## Atualizar

Edite `data.js` para atualizar a página. `window.DASHBOARD_DATA` contém `atividades`, `transportadores` e `blocos`. Cada transportador possui nove estados na ordem de `atividades`: `ok`, `andamento`, `iniciando` ou `nao_informado`. Os indicadores são recalculados automaticamente. Ao editar, mantenha `data/status.json` e `data/checklist.csv` sincronizados; o CSV disponível para download é estático.

`data/status.json` é uma cópia de intercâmbio dos dados; a página usa `data.js` para funcionar também offline. Para atualizar apenas números e status não é necessário editar HTML ou CSS.

## Arquivos

- `index.html`: estrutura da página.
- `styles.css`: layout e versão móvel/impressão.
- `app.js`: filtros, cálculos, detalhes e download.
- `data.js`: dados carregados no navegador.
- `data/status.json` e `data/checklist.csv`: dados estruturados.
- `assets/`: logos e duas imagens 3D.

As imagens dos equipamentos são ilustrações, não registros fotográficos das frentes. Este pacote não publica nada automaticamente.
