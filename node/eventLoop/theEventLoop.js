const exp1 = () => {
const bar = () => console.log('bar');

const baz = () => console.log('baz');

const foo = () => {
    console.log('foo');
    bar()
    baz()
}

foo()
}
exp1();

const exp2 = () => {
    const bar = () => console.log('bar')

    const baz = () => console.log('baz')

    const foo = () => {
        console.log('foo')
        setTimeout(bar, 0)
        baz()
    }
    foo()
}
exp2();


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