# Introdução 

* Overview
* Melhores features do Node.JS
* Exemplo Node.js app
* Frameworks e ferramentas

## Programação Async

Em linguagens de programação normais (C, Java, Python, PHP) todas as intruções são bloqueadas por padrão, a menos que você aceite programação explicitamente o uso de programação Assincrona. 

Se você executar uma request para ler algum JSON, a execução dele é bloqueada até que a resposta esteja pronta. O Javascript permite criar código assíncrono e sem bloqueio de uma maneira muito simples, usando single thread, callback functions e event-driven programming. 

Toda vez que uma operação ocorre, passamos uma função callback que vai ser chamada quando pudermos continuar com o processo. Não vamos esperar que isso termine antes de continuar com o resto do programa. Não podemos esperar que alguma coisa carregue de um AJAX antes de interceptar eventos de clique na página, tudo deve acontecer no verdadeiro tempo para uma melhor experiencia do usuario.

Isso permite que o Node carregue milhares de conexões simultâneas ao mesmo tempo, sem introduzir a mecanica de Multi Thread que gera varios casos de BUG.

O node fornece uma primativa de I/O e, geralmente as libs são feitas usando no-block, tornando block uma exceção e não o normal.

Quando o Node.js precisa executar uma operação I/O, como rede, acessar um banco de dados ou sistema de arquivo, em vez de bloquear as threads, ele simplesmente volta a operação quando a resposta chega, em vez de desperdiçar o ciclo de espera da CPU.


