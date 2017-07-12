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

describe('Write a function twice that takes a binary function and reutrns a unary function that passes its arg to the binary function twice', () => {
  it('add', () => {
    expect(add(11, 11)).toBe(22);
  });

  it('doubl', () => {
    const doubl = twice(add);
    expect(doubl(11)).toBe(22);
  });

  it('square', () => {
    const square = twice(mul);
    expect(square(11)).toBe(121);
  });
});
