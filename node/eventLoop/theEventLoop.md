# The Event Loop

O EventLoop é um dos aspectos mais importantes quando se fala de NodeJS. O objetivo é explicar os detalhes internos de como o Javascript funciona com um único thread e como ele lida com funções assíncronas. O Código Javascript é executado em uma única thread, então há apenas uma coisa acontecendo de cada vez, essa limitação é muito útil, pois simplifica muito a maneira de como você programa sem se preocupar com problemas de concorrência. Mas é importante prestar atenção em como você escreve seu código e evitar qualquer coisa que possa bloquear a thread, como chamadas de redes síncronas ou loops infinitos.

Em geral, na maioria dos browsers, há um loop de eventos para todas as guias do navegador, para tornar cada processo isolado e evitar uma página com loops infinitos ou processamento pesado para bloquear seu navegador inteiro.

## Blocking

Qualquer código JavaScript que demore muito para retornar o controle ao eventloop bloqueará a execução de qualquer código JavaSript na página, até mesmo bloquear a thread de UI, e o usuário não vai poder clicar ou scrollar a página e assim por diante. Quase todas as primitivas I/O do javascript são non-blocking. Networkong request, FO, etc. O blocking é exceção no JavaScript, e é por isso que o Javascript é baseado tanto em callbacks, e async/await.

## Call Stack

A callstack é uma fila Lifo(Last in, First Out). O EventLoop constantemente vai olhar a callstack para ver se tem alguma função que precisa ser executada, ao fazer isso ele adiciona qualquer função a callstack e executa cada uma delas em ordem.

Olhe esse exemplo:

```js
const bar = () => console.log('bar')
const baz = () => console.log('baz')
const foo = () => {
console.log('foo')
bar()
baz()
}
foo()
``` 

O código vai printar

```js
foo
bar
baz
```

Quando esse código é executado, o primeiro foo() é chamado, dentro do foo() chamamos primeiro bar(), depois chamamos baz(). Em cada iteração o eventloop verifica se há alguma coisa na call stack e executa: 

Iteration 1: foo()
Iteration 2: console.log('foo')
Iteration 3: bar()
Iteration 4: console.log('bar')
Iteration 5: baz()
Iteration 6: console.log('baz')

e então a call stack vai estar vazia.

## Queuing function execution

O exemplo acima parece normal, não há nada de especial nele: O JavaScript encontra coisas para executar, e as executa em ordem. 

Vamos ver como adiar uma função até que a call stack esteja limpa. O setTimeout vai chamar uma função, mas só vai executar ela depois que outra função já tenha sido executada. 

```js
const bar = () => console.log('bar')
const baz = () => console.log('baz')
const foo = () => {
console.log('foo')
setTimeout(bar, 0)
baz()
}
foo()
```

O código vai printar isso:

```js
foo
baz
bar
```

Quando esse código é executado, o primeiro foo() é chamado. Dentro de foo() chamamos primeiro setTimeout, passando bar como argumento, e nós o instruímos a executar imediatamente o mais rápido possível, passando 0 como cronômetro. Então chamamos baz().

A ordem de execução das funções vai ser:

Iteration 1: foo()
Iteration 2: console.log('foo')
Iteration 3: bar()
Iteration 4: console.log('bar')
Iteration 5: baz()
Iteration 6: console.log('baz')

## The message queue

Quando setTimeout() é chamado, o Browser ou o Node iniciam o cronômetro. Quando o cronômetro expirar, colocamos a função na Message Queue. A message queue também é aonde os eventos iniciados pelo usuário, como eventos de click ou DOM. O loop dá prioridade à call stack e primeiro processa tudo que encontra na call stack, e uma vez que não há nada lá, ele vai pegar as coisas no event queue. Não precisamos esperar que funções como setTimeout. fetch ou outras coisas façam seu próprio trabalho, pois eles são definidos pelo browser e estão nas suas proprias threads. Por exemplo, se você define o tempo limite do setTimeout para 2 segundos, não precisamos esperar 2 segundos, a espera acontece em outro lugar.

Promises são uma maneira de executar o resultado de uma função assíncrona assim que possível, em vez de ser colocado no final da call stack. As promises que resolverem antes que a função atual termine serão executadas logo após a função

```js
const bar = () => console.log('bar')
const baz = () => console.log('baz')
const foo = () => {
console.log('foo')
setTimeout(bar, 0)
new Promise((resolve, reject) =>
resolve('should be right after baz, before bar')
).then(resolve => console.log(resolve))
baz()
}
foo()
```

Isso vai printar:

```js
foo
baz
should be right after baz, before bar
bar
```

Essa é uma grande diferença entre Promises(e Async/Await, que se baseia em promises)e funções assíncronas antigas por meio de setTimeout() ou outras APIs.