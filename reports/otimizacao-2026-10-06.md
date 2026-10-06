# Relatório de otimização — 6 de outubro de 2026

As 21 imagens utilizadas pelo site passaram de **79,98 MB para 620,6 KB**, uma redução de **99,2%**. O build de produção compilou com sucesso e os testes passaram.

**Imagens e ícones**

- Converti os 16 screenshots dos projetos e as quatro logos para WebP, a partir dos arquivos originais. As composições e transparências foram preservadas. Os screenshots têm 480 px de largura; as logos têm até 512 px.
- Converti a foto do About para WebP de 800 × 800 px, adequada ao círculo de até 320 px exibido na página.
- Redimensionei os ícones públicos: PNGs de 192 e 512 px e um favicon ICO com tamanhos de 16, 32 e 48 px. Antes, os três arquivos eram imagens de 1024 × 1024 px com aproximadamente 1,3 MB cada.
- Removi as versões substituídas das imagens, as fotos antigas, o Memoji e os arquivos de splash/capa que não tinham mais referências. Removi também a propriedade `mockImage`, que já não era usada pelos banners.

| Arquivo ou grupo | Antes | Depois |
| --- | ---: | ---: |
| 21 imagens utilizadas: screenshots, logos e foto | 79,98 MB | 620,6 KB |
| Foto do About | 1,86 MB | 34,2 KB |
| Screenshot maior do Coffee Overflow | 36,43 MB | 33,9 KB |
| Primeiro screenshot do Glyptis | 13,36 MB | 37,0 KB |
| Logo do Food Swap | 1,25 MB | 21,0 KB |
| Logo do Glyptis | 2,16 MB | 14,6 KB |
| Favicon | 1,30 MB | 1,6 KB |
| Ícone de 192 px | 1,30 MB | 4,0 KB |
| Ícone de 512 px | 1,30 MB | 16,8 KB |

Os tamanhos de imagens acima usam unidades decimais e representam o conjunto de arquivos, não o download inicial da página inteira.

**Carregamento sob demanda**

- Separei o modal dos projetos e o modal do currículo em arquivos de JavaScript e CSS carregados somente quando são abertos, usando `React.lazy` e `Suspense`.
- Dentro do modal, os screenshots laterais usam `loading="lazy"` e decodificação assíncrona. O screenshot central tem prioridade de carregamento para aparecer prontamente.
- Defini dimensões nas imagens da foto, banners e carrossel para reservar espaço durante o carregamento.
- A verificação no navegador confirmou zero requisições de screenshots e nenhuma requisição do código do modal de projetos antes de abrir um projeto. O carregamento tardio também funciona dentro do modal; anteriormente, os screenshots já eram renderizados apenas ao abri-lo.

| Arquivo inicial, compactado com gzip | Antes | Depois |
| --- | ---: | ---: |
| JavaScript principal | 132,03 KB | 125,31 KB |
| CSS principal | 5,88 KB | 3,38 KB |

Esses valores são os informados pelo build. Os arquivos dos modais continuam disponíveis em chunks separados; a redução acima se refere ao carregamento inicial.

**Correções e acessibilidade**

- Corrigi as dependências de `useEffect` e `useCallback` no carrossel, eliminando os avisos de hooks.
- Corrigi as chaves dos botões de navegação do modal para evitar avisos de filhos duplicados no React.
- Ativei o respeito a `prefers-reduced-motion` no Framer Motion, no CSS e na rolagem por JavaScript. O carrossel mantém a navegação funcionando com movimento reduzido.
- Adicionei nomes acessíveis aos controles de fechamento e seleção de screenshots, com indicação do screenshot atual.
- Ajustei o nome acessível do botão de idioma para incluir o texto visível EN/PT, adicionei o elemento `main` e sincronizei o idioma do documento com a seleção de inglês ou PT-BR.

**Validação**

- `npm test -- --watchAll=false --runInBand`: duas suítes e dois testes passaram. O novo teste cobre navegação contínua do carrossel e reinicialização ao trocar de projeto.
- `npm run build`: compilação de produção bem-sucedida, sem os avisos de hooks e de SVGs gigantes. Permanece o aviso sobre a base de compatibilidade Browserslist estar desatualizada.
- `git diff --check`: passou.
- Chrome: abertura dos quatro projetos, seleção consecutiva de screenshots, troca de projeto, fechamento dos modais e abertura do currículo passaram com movimento normal e reduzido.
- Conferi os banners em desktop, o menu e o modal em celular de 390 × 844 px, os screenshots convertidos e a leitura das tecnologias do Food Swap no tema claro. Não houve erros de JavaScript durante essas verificações nem transbordamento horizontal no celular.

**Lighthouse 13.5.0 — build local de produção**

| Medida | Celular | Desktop |
| --- | ---: | ---: |
| Desempenho | 91/100 | 100/100 |
| Acessibilidade | 100/100 | 100/100 |
| Boas práticas | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| Primeira exibição de conteúdo — FCP | 0,8 s | 0,2 s |
| Maior conteúdo visível — LCP | 3,4 s | 0,7 s |
| Mudança de layout — CLS | 0 | 0 |
| Tempo total de bloqueio — TBT | 10 ms | 0 ms |

As auditorias foram executadas separadamente no Chrome headless, em `http://127.0.0.1:4173`, com os perfis padrão móvel e desktop do Lighthouse. O servidor local não aplica compressão HTTP nem políticas de cache da hospedagem. As notas podem variar conforme dispositivo, rede e servidor. Não foi feita uma auditoria Lighthouse do estado original anterior às otimizações; a comparação de tamanhos usa os arquivos originais e os registros dos builds.

O LCP móvel ainda apresenta margem de melhoria. A auditoria também aponta cache, JavaScript não utilizado nessa primeira tela e oportunidades adicionais de entrega de imagens. O INP não foi medido por estas auditorias de navegação; requer medição de interações ou dados reais de uso.

Relatórios completos: [Lighthouse celular](/Users/guilhermeghiserossoni/Desktop/Guilherme/guilhermeghise.github.io/reports/lighthouse-mobile-2026-10-06.html) e [Lighthouse desktop](/Users/guilhermeghiserossoni/Desktop/Guilherme/guilhermeghise.github.io/reports/lighthouse-desktop-2026-10-06.html).

As alterações estão no projeto local. Nenhuma dependência foi adicionada ao aplicativo e o site ainda não foi publicado.
