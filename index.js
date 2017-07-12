function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

console.log(add(3, 4));   // 7
console.log(sub(3, 4));   // -1
console.log(mul(3, 4));   // 12



console.log('\n identityf\n------');
/**
 * Write a function identifyf that takes an arg and returns a function that returns that arg
 */
function identityf(x) {
  return function () {
    return x;
  }
}

const three = identityf(3);
console.log(three());  // 3


console.log('\n addf\n------');
/**
 * Write a function addf that takes an arg and returns a function that adds a second arg
 */
function addf(first) {
  return function (second) {
    return first + second;
  }
}

const sum = addf(3)(4);
console.log(sum);  // 7



console.log('\n curry\n------');
/*
  Write a function curry that takes a binary function and an argument
  and returns a function that can take a second argument
*/
function curry(fn, first) {
  return function (second) {
    return fn(first, second);
  }
}

var add3 = curry(add, 3);
console.log(add3(4)); // 7
console.log(curry(mul, 5)(6));  // 30

// Multiple args
function curry(fn, ...first) {
  return function (...second) {
    return fn(...first, ...second);
  }
}


console.log('\n curryr\n-----');
/*
  Write a function curryr that takes a binary function and a second arg
  and returns a function that can takes a 1st argument
*/
function curryr(binary, second) {
  return function (first) {
    return binary(first, second);
  }
}
const sub3 = curryr(sub, 3);
console.log(sub3(11));  // 8
console.log(sub3(3));   // 0





console.log('\n liftf\n------');
/*
  Write a function liftf that takes a binary function and makes it callable with 2 invocations
*/
function liftf(binary) {
  return function (first) {
    return function (second) {
      return binary(first, second);
    }
  }
};
const addliftf = liftf(add);
console.log(addliftf(3)(4));        // 7
console.log(liftf(mul)(5)(6));  // 30


// Without writing any new functions, show four ways to create the inc function
const inc1 = addf(1)
console.log(inc1(5));        // 6
console.log(inc1(inc1(5)));   // 7

const inc2 = curry(add, 1)
console.log(inc2(5));        // 6
console.log(inc2(inc2(5)));   // 7

const inc3 = curryr(add, 1)
console.log(inc3(5));        // 6
console.log(inc3(inc3(5)));   // 7

const inc4 = liftf(add)(1)
console.log(inc4(5));        // 6
console.log(inc3(inc3(5)));   // 7


console.log('\n twice\n------');
/**
 * Write a function twice that takes a binary function and reutrns a unary function that passes its arg to the biunary function twice
 */
function twice(binary) {
  return function (first) {
    return binary(first, first);
  }
}
console.log(add(11, 11));   // 22

const doubl = twice(add);
console.log(doubl(11));     // 22

const square = twice(mul);
console.log(square(11));               // 121


console.log('\n reverse\n------');
/**
 * Write reverse, a function that reverses the args of a binary function
 */
function reverse(binary) {
  return function (first, second) {
    return binary(second, first);
  }
};
const bus = reverse(sub);
console.log(bus(3, 2));     // -1

function reverse(binary) {
  return function (...args) {
    return binary(...args.reverse());
  }
};


console.log('\n composeu\n------');
/**
 * Write a function composeu that takes two unary functions and
 * returns a unary function that calls them both.
 */
function composeu(func1, func2) {
  return function (value) {
    return func2(func1(5));
  }
}
console.log(composeu(doubl, square)(5));   // 100



/**
 * Write a function compoaseb that takes 2 binary functions and
 * returns a function that calls them both
 */
function composeb(f, g) {
  return function (x, y, z) {
    return g(f(x, y), z);
  }
}
const cb = composeb(add, mul)(2, 3, 7)  // 35
console.log(cb);




console.log('\n limit\n------');
/**
 * Write a limit funciton that allows a binary funcion to be called a limited number of times
 */
function limit(func, max) {
  let times = 0;
  return function (x, y) {
    times += 1;
    return (times > max) ? undefined : func(x, y)
  }
}
const add_ltd = limit(add, 1);
console.log(add_ltd(3, 4));     // 7
console.log(add_ltd(3, 5));     // undefined

// His solution
function limit(func, count) {
  return function (x, y) {
    if (count >= 1) {
      count -= 1;
      return func(x, y);
    }
    return undefined;
  }
}


// Generators : Afunction returns a number from a series

console.log('\n from\n------');
/**
 * Write a from factory that produces a generator that will produce a series of values.
 */
function from(seed) {
  let next = seed;
  return function () {
    const current = next;
    next += 1;
    return current;
  }
}
const gen = from(0);
console.log(gen());   // 1
console.log(gen());   // 2
console.log(gen());   // 3



console.log('\n to\n------');
console.log('Write a to factory that takes a generator and an end value and returns a generator that will produce numbers up to that limit');
/**
 * Write a to factory that takes a generator and an end value and
 * returns a generator that will produce numbers up to that limit
 */
function to(gen, max) {
  return function () {
    const result = gen();
    return result > max ? undefined : result;
  }
}
let gento = to(from(3), 5);
console.log(gento());   //  3
console.log(gento());   //  4
console.log(gento());   //  undefined

// his
function to(gen, end) {
  return function () {
    const value = gen();
    if (value < end) {
      return value;
    }
    return undefined;
  }
}
gento = to(from(3), 5);
console.log(gento());   //  3
console.log(gento());   //  4
console.log(gento());   //  undefined


console.log('\n fromTo\n------');
/**
 * Write a fromTo factory that produces a generator that will produce values in a range
 */
function fromTo(start, end) {
  return to(from(start), end);
}
const genft = fromTo(0, 3);
console.log(genft());    // 0
console.log(genft());    // 1
console.log(genft());    // 2
console.log(genft());    // undefined



console.log('\nelement\n------');
/**
 * Write an elemnt factory that takes an array and a generator and
 * returns a generator that will produce elements from the array
 */
function element(arr, gen) {
  return function () {
    return arr[gen()];
  }
}
const gene = element(['a', 'b', 'c', 'd'], fromTo(1, 3));
console.log(gene());   // 'b'
console.log(gene());   // 'c'
console.log(gene());   // 'undefined'

// his
// without this javascript converts to the string 'undefined' and looks for that.  Is security flaw.
function element(arr, gen) {
  return function () {
    const idx = gen();
    if (idx !== undefined) {
      return arr[idx];
    }
  }
}



console.log('\nelement2\n------');
/**
 * Modify the element factory so that the generator arg is optional.
 * If a generator is not provided then each of the elements odf the array will be produced.
 */
function element(arr, gen) {
  if (!gen) {
    gen = fromTo(0, arr.length);
  }
  return function () {
    const idx = gen();
    if (idx !== undefined) {
      return arr[idx];
    }
  }
}
const gene2 = element(['a', 'b', 'c', 'd']);
console.log(gene2());   // 'a'
console.log(gene2());   // 'b'
console.log(gene2());   // 'c'
console.log(gene2());   // 'd'
console.log(gene2());   // 'undefined'



console.log('\ncollect\n------');
/**
 * Write a collect generator that takes a generator and an array and produces a function that will collect the results in the array
 */
function collect(gen, array) {
  return function () {
    const result = gen();
    if (result !== undefined) {   // 0 is undefined falsey so cannot use !result
      array.push(result);
    }
    return result;
  }
}
const array = [];
const genc = collect(fromTo(0, 2), array);
console.log(genc());  // 0
console.log(genc());  // 1
console.log(genc());  // undefined
console.log(array);  // [0, 1]


console.log('\nfilter\n------');
/**
 * Write a filter factory that takes a generator and a predicate and produces a generator that produces only the values approved by the predicate.
 * Can also use recursion.  Gets optimised to run the same.
 */
function filter(gen, filter) {
  return function () {
    let result = gen();
    while (result && !filter(result)) {
      result = gen();
    }
    return result;
  }
}
const genF = filter(
  fromTo(0, 5),
  (value) => (value % 3) === 0
);
console.log(genF()); // 0
console.log(genF()); // 3
console.log(genF()); // undefined


function filter(gen, filter) {
  return function recur() {
    let result = gen();
    if (result == undefined || filter(result)) {
      return result
    }
    return recur();
  }
}
const genFr = filter(
  fromTo(0, 5),
  (value) => (value % 3) === 0
);
console.log(genFr()); // 0
console.log(genFr()); // 3
console.log(genFr()); // undefined


console.log('\n\concat\n------');
/**
 * Write a concat factory that takes 2 generators and produces a generator that combines the sequences.
 */
function concat(gen1, gen2) {
  return function () {
    const result1 = gen1();
    if (result1 === undefined) {
      return gen2();
    }
    return result1;
  }
}
const gencon = concat(fromTo(0, 3), fromTo(0, 2));
console.log(gencon());    // 0
console.log(gencon());    // 1
console.log(gencon());    // 2
console.log(gencon());    // 0
console.log(gencon());    // 1
console.log(gencon());    // undefined


console.log('\n\gensymf\n------');
/**
 * Make a facorty gensymf that makes generators that make unique symbols.
 */
function gensymf(seed) {
  const map = {};
  return function () {
    const current = map[seed] || 1;
    map[seed] = current + 1;
    return `${seed}${current}`
  }
}
let geng = gensymf('G');
let genh = gensymf('H');
console.log(geng());  // 'G1'
console.log(genh());  // 'H1'
console.log(geng());  // 'G2'
console.log(genh());  // 'G2'

// his
function gensymf(prefix) {
  const gen = from(1);
  return function () {
    return `${prefix}${gen()}`
  }
}
geng = gensymf('G');
genh = gensymf('H');
console.log(geng());  // 'G1'
console.log(genh());  // 'H1'
console.log(geng());  // 'G2'
console.log(genh());  // 'G2'


console.log('\n\gensymff\n------');
/**
 * Make a factory factory gensymff that takes a starting value and returns a factory
 */
function gensymff(start) {
  return function (prefix) {
    const gen = from(start);
    return function () {
      return `${prefix}${gen()}`
    }
  }
}
let gensymf2 = gensymff(1);
let genffg = gensymf2('G');
let genffh = gensymf2('H');
console.log(genffg());  // 'G1'
console.log(genffh());  // 'H1'
console.log(genffg());  // 'G2'
console.log(genffh());  // 'G2'



console.log('\nfibonaccif\n------');
/**
 * Make a factory fibonaccif that returns a generator that will return the next fibonacci number
 * sum of previous 2 numbers
 */
// TODO WRONG
function fibonaccif(first, second) {
  let idx = 0;
  return function () {
    switch (idx) {
      case 0:
        return 0;
      case 1:
        return 1;
      default:
        return first + second;
    }

  }
  // function recur(first, second) {
  //   console.log('idx', idx);
  //   idx += 1;
  //   if (idx < 2) {
  //     return idx - 1;
  //   }
  //   const result = first + second;
  //   console.log(second, result);
  //   // return recur(second, result);
  // }
  // return function () {
  //   return recur(first, second);
  // }
}

const fib = fibonaccif(0, 1);
console.log(fib());   //  0
console.log(fib());   //  1
console.log(fib());   //  1
console.log(fib());   //  2
console.log(fib());   //  3
console.log(fib());   //  5


console.log('\n counter\n------');
/**
 * Write a counter constructor that returns an objet containing 2 functions that implement an up/down counter, hiding the counter
 */
function counter() {
  let counter = 0;
  return {
    up: function () {
      counter += 1;
      return counter;
    },
    down: function () {
      counter -= 1;
      return counter;
    }
  }
}
const object = counter();
var up = object.up;
var down = object.down;
console.log(up());  // 1
console.log(down());  // 0
console.log(down());  // -1
console.log(up());  // 0




console.log('\n counter \n------');
/**
 * Make a revocable constructor that takes a binary function and returns an object containg an invoke function that can invoke the binary function and a revoke funtion that disables the invoke function
 */
function revocable(fn) {
  let active = true;
  return {
    invoke: function (...args) {
      return active ? fn(...args) : undefined;
    },
    revoke: function () {
      active = false;
    }
  }
}
const rev = revocable(add);
const add_rev = rev.invoke;
console.log(add_rev(3, 4));     // 7
rev.revoke();
console.log(add_rev(5, 7));     // undefined





function m(value, source) {
  return {
    value: value,
    source: (typeof source === 'string') ? source : String(value)
  };
}


console.log('\n addm \n------');
function addm(a, b) {
  return m(
    a.value + b.value,
    '(' + a.source + '+' + b.source + ')'
  )
}
/**
 * Write a function addm that takes two m objects and returns an m object
 */
const addm1 = JSON.stringify(addm(m(3), m(4)));   // {"value": 7, "source": "(3+4)"}
const addm2 = JSON.stringify(addm(m(1), m(Math.PI, "pi")));   // {"value": 4.14159, "source": "(1+pi)"}
console.log('addm1', addm1);
console.log('addm2', addm2);


console.log('\n liftm \n------');
/**
 * Write a function liftm that takes a binary dunction an a string and reutrns a fdunction that acts on m objects
 *
 * This is a 'nonad'
 */
function liftm(fn, operator) {
  return function (a, b) {
    return m(
      fn(a.value, b.value),
      '(' + a.source + operator + b.source + ')'
    )
  }
}
let addml = liftm(add, '+');
let addml1 = JSON.stringify(addml(m(3), m(4)));   // {"value": 7, "source": "(3+4)"}
console.log('addml1', addml1);

let mulml = liftm(mul, "*");
let addml2 = JSON.stringify(mulml(m(3), m(4)));   // {"value": 12, "source": "(3*4)"}
console.log('addml2', addml2);



console.log('\n liftm 2 \n------');
/**
 * Modify function liftm so that the functions it produces can accept args that are either numbers or m objects.
 *
 * This is a 'nonad'
 */
function liftm(fn, operator) {
  return function (a, b) {
    if (typeof a === 'number') {
      a = m(a, a);
    }
    if (typeof b === 'number') {
      b = m(b, b);
    }
    return m(
      fn(a.value, b.value),
      '(' + a.source + operator + b.source + ')'
    )
  }
}
addml = liftm(add, '+');
addml1 = JSON.stringify(addml(m(3), m(4)));   // {"value": 7, "source": "(3+4)"}
console.log('addml1 object', addml1);

addml = liftm(add, '+');
addml1 = JSON.stringify(addml(3, 4));   // {"value": 7, "source": "(3+4)"}
console.log('addml1 number', addml1);



console.log('\n liftm 2 \n------');
/**
 * Make a function continuize that takes a unary function and returns a function that takes a callback and an arg
 *
 * About to be enabled in JS.  No return function but instead pass in continuation function that gets called after (callback) with result
 */
function continuize(fn) {
  return function (callback, ...args) {
    callback(fn(...args));
  }
}
const sqrtc = continuize(Math.sqrt);
sqrtc(console.log, 81);       // 9



/**
 * lower case because ethis one does not reuire new keyword.
 * Advocates having seperate objects, one for methods, and one for data.  Methods operate on methods.
 * Functional programming is the solution for distributed computing.
 */
function constructor(spec) {
  let { member } = spec;
  // Gorilla problem.  With inheritance you only wanted banana but got the whole jungle
  const { other } = other_constructor(spec);
  const method = function () {
    // spec, member, other, method
  };
  // not using 'this' and immutable
  return Object.freeze({
    method,
    other
  });
}
