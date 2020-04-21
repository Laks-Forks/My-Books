# Modules Exports

Você pode exportar uma funcionalidade de um arquivo de duas maneiras, a primeira é assinalar um objeto para module.exports, e isso fara com que seu arquivo exporte EXATAMENTE esse objeto. 
A segunda maneira é adicionar ao objeto exportado a propriedade exports, isso vai faz com que você possa exportar diversas funções, objetos ou dados.

A maior diferença é que module.exports exporta o objeto, e o exports exporta diretamente as propriedades do objeto.