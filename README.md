# Painel dos transportadores | Enesa e Vale

Página estática com visão geral, planejamento por transportador e checklist de campo.

## Abrir

Extraia o ZIP e abra `index.html` no navegador. A página funciona offline.

## Publicar no GitHub Pages

1. Envie o conteúdo extraído para a raiz do repositório, mantendo as pastas `assets/` e `data/`.
2. Em **Settings → Pages**, selecione **Deploy from a branch**.
3. Escolha a branch **main**, a pasta **/ (root)** e salve.
4. Abra o endereço de publicação exibido pelo GitHub.

## Atualizar a página

- `data.js` reúne os estados de campo e a situação de cada bloco.
- `planning-data.js` reúne os marcos, as janelas de execução e as especificações das correias.
- `data/checklist.csv` é o arquivo entregue pelo botão de exportação. Atualize-o junto com o checklist.
- `data/status.json` guarda uma cópia estruturada do checklist. Mantenha-o sincronizado com `data.js`.

Os indicadores de campo contam os estados registrados no checklist. Os marcos e as janelas da seção Planejamento representam datas programadas.
