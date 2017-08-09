'use strict';

function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

describe('basic', () => {
  it('add 3 + 4', () => {
    expect(add(3, 4)).toBe(7);
  });
  it('sub 3 from 4', () => {
    expect(sub(3, 4)).toBe(-1);
  });
  it('mul 3 x 4', () => {
    expect(mul(3, 4)).toBe(12);
  });
});



function identityf(x) {
  return function () {
    return x;
  }
}
describe('Write a function identifyf that takes an arg and returns a function that returns that arg', () => {
  it('3 ', () => {
    const three = identityf(3);
    expect(three()).toBe(3);
  });
});



function addf(first) {
  return function (second) {
    return first + second;
  }
}
describe('Write a function addf that takes an arg and returns a function that adds a second arg', () => {
  it('3 + 4', () => {
    const sum = addf(3)(4);
    expect(sum).toBe(7);
  });
});



function curry(fn, first) {
  return function (second) {
    return fn(first, second);
  }
}
describe('Write a function curry that takes a binary function and an argument and returns a function that can take a second argument', () => {
  const add3 = curry(add, 3);
  it('add 4', () => {
    expect(add3(4)).toBe(7);
  });
});


function curryr(binary, second) {
  return function (first) {
    return binary(first, second);
  }
}
describe('Write a function curryr that takes a binary function and a second arg and returns a function that can takes a 1st argument', () => {
  const sub3 = curryr(sub, 3);
  it('sub 11', () => {

    expect(sub3(11)).toBe(8);

  });
  it('sub 3', () => {

    expect(sub3(3)).toBe(0);

  });
});


const liftf = (binary) =>
  (first) =>
    (second) => binary(first, second);

describe('Write a function liftf that takes a binary function and makes it callable with 2 invocations', () => {
  it('ad 3 and 4', () => {
    const addliftf = liftf(add);
    expect(addliftf(3)(4)).toBe(7);
  });

  it('multiply 5 and 6', () => {
    expect(liftf(mul)(5)(6)).toBe(30);
  });
});

const twice = (binary) =>
  (arg) => binary(arg, arg);
const doubl = twice(add);
const square = twice(mul);

describe('Write a function twice that takes a binary function and reutrns a unary function that passes its arg to the binary function twice', () => {
  it('add', () => {
    expect(add(11, 11)).toBe(22);
  });

  it('doubl', () => {
    expect(doubl(11)).toBe(22);
  });

  it('square', () => {
    expect(square(11)).toBe(121);
  });
});


const reverse = (binary) => {
  return (first, second) => {
    return binary(second, first);
  }
};
describe('Write reverse, a function that reverses the args of a binary function', () => {
  it('reverse', () => {
    const bus = reverse(sub);

    expect(bus(3, 2)).toBe(-1);
  });
});


const composeu = (func1, func2) => {
  return (value) => {
    return func2(func1(value));
  }
}
describe('Write a function composeu that takes two unary functions and returns a unary function that calls them both.', () => {
  it('double and square', () => {
    expect(composeu(doubl, square)(5)).toBe(100);
  });
});

const composeb = (func1, func2) => {
  return (first, second, third) => {
    return func2(func1(first, second), third);
  }
}
describe('Write a function compoaseb that takes 2 binary functions and returns a function that calls them both', () => {
  it('add, mul', () => {
    expect(composeb(add, mul)(2, 3, 7)).toBe(35);
  });
});


const limit = (f, l) => (
  x, y) => l-- > 0 ? f(x, y) : undefined
const add_ltd = limit(add, 1);
describe('Write a limit funciton that allows a binary funcion to be called a limited number of times', () => {
  it('add ok', () => {
    expect(add_ltd(3, 4)).toBe(7);
  });
  it('add undefined', () => {
    expect(add_ltd(3, 5)).toBe(undefined);
  });
});

const from = (start) => () => start++;
describe('Write a from factory that produces a generator that will produce a series of values.', () => {
  it('from 0', () => {
    const gen = from(0);
    expect(gen()).toBe(0);
    expect(gen()).toBe(1);
    expect(gen()).toBe(2);
  });
});

const to = (func, limit) =>
  () => {
    const result = func();
    return result >= limit ? undefined : result;
  }
describe('Write a to factory that takes a generator and an end value and returns a generator that will produce numbers up to but excluding that limit', () => {
  it('from 3 to 5', () => {
    const gen = to(from(3), 5);
    expect(gen()).toBe(3);
    expect(gen()).toBe(4);
    expect(gen()).toBe(undefined);
  });
});

const fromTo = (start, end) => to(from(start), end);
describe('Write a fromTo factory that produces a generator that will produce values in a range', () => {
  it('1 to 4', () => {
    const gen = fromTo(1, 4);
    expect(gen()).toBe(1);
    expect(gen()).toBe(2);
    expect(gen()).toBe(3);
    expect(gen()).toBe(undefined);
  });
});

// const element = (array, func) => () => array[func()];
const element = (array, func) =>
  () => {
    const idx = func();
    return idx === undefined ? undefined : array[idx];
  }
describe('Write an elemnt factory that takes an array and a generator and returns a generator that will produce elements from the array', () => {
  it('a, b, c, d', () => {
    const gen = element(['a', 'b', 'c', 'd'], fromTo(1, 3));

    expect(gen()).toBe('b');
    expect(gen()).toBe('c');
    expect(gen()).toBe(undefined);
  });
});


const element2 = (array, func = fromTo(0, array.length + 1)) => {
  return () => {
    const idx = func();
    return idx === undefined ? undefined : array[idx];
  }
}
describe('Modify the element factory so that the generator arg is optional.  If a generator is not provided then each of the elements odf the array will be produced.', () => {
  it('no generator provided', () => {
    const gen = element2(['a', 'b', 'c', 'd']);

    expect(gen()).toBe('a');
    expect(gen()).toBe('b');
    expect(gen()).toBe('c');
    expect(gen()).toBe('d');
    expect(gen()).toBe(undefined);
  });
});

const concat = (gen1, gen2) => {
  return function () {
    const result1 = gen1();
    if (result1 === undefined) {
      return gen2();
    }
    return result1;
  }
}
describe('Write a concat factory that takes 2 generators and produces a generator that combines the sequences.', () => {
  it('concat 2', () => {
    const gen = concat(fromTo(0, 3), fromTo(0, 2));
    expect(gen()).toBe(0);
    expect(gen()).toBe(1);
    expect(gen()).toBe(2);
    expect(gen()).toBe(0);
    expect(gen()).toBe(1);
    expect(gen()).toBe(undefined);
  });
});

function gensymf(prefix) {
  const gen = from(1);
  return function () {
    return `${prefix}${gen()}`
  }
}
describe('Make a factory gensymf that makes generators that make unique symbols.', () => {
  it('gensymf', () => {
    let geng = gensymf('G');
    let genh = gensymf('H');
    expect(geng()).toBe('G1');
    expect(genh()).toBe('H1');
    expect(geng()).toBe('G2');
    expect(genh()).toBe('H2');
  });
});
