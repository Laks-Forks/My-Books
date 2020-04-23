# The Event Loop

O EventLoop é um dos aspectos mais importantes quando se fala de NodeJS. O objetivo é explicar os detalhes internos de como o Javascript funciona com um único thread e como ele lida com funções assíncronas. O Código Javascript é executado em uma única thread, então há apenas uma coisa acontecendo de cada vez, essa limitação é muito útil, pois simplifica muito a maneira de como você programa sem se preocupar com problemas de concorrência. Mas é importante prestar atenção em como você escreve seu código e evitar qualquer coisa que possa bloquear a thread, como chamadas de redes síncronas ou loops infinitos.

Em geral, na maioria dos browsers, há um loop de eventos para todas as guias do navegador, para tornar cada processo isolado e evitar uma página com loops infinitos ou processamento pesado para bloquear seu navegador inteiro.

## Blocking

Qualquer código JavaScript que demore muito para retornar o controle ao eventloop bloqueará a execução de qualquer código JavaSript na página, até mesmo bloquear a thread de UI, e o usuário não vai poder clicar ou scrollar a página e assim por diante. Quase todas as primitivas I/O do javascript são non-blocking. Networkong request, FO, etc. O blocking é exceção no JavaScript, e é por isso que o Javascript é baseado tanto em callbacks, e async/await.

## Call Stack