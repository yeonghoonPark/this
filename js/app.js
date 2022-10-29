"use strict";

/**
 * this
 *
 * javaScript내에서의 this의 4가지 동작 방식
 * context객체 = this가 바로보고 있는 객체
 *
 * 1. 일반함수(function) 호출
 *   - context객체 = 전역객체, window객체
 *
 * 2. 메서드(method) 호출
 *   - context객체 = 메서드를 호출한 객체
 *
 * 3. 생성자함수(constructor function) 호출
 *   - 생성자함수가 (미래에) 생성하는 인스턴스
 *
 *  4. Function.protorype.aplly(), call(), bind()메서드들에 의한 명시적 간접 호출
 *   - apply(), call(), bind()
 *
 * 참조사이트
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
 * https://velog.io/@kimwanyoung/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this-%EC%A0%95%EB%A6%AC
 * https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D
 */

/**
 *  1. 일반함수(function) 호출
 *    - 일반 함수일 경우에 this에는 전역객체인 window객체가 context객체가 된다.
 *    - 일반 함수로 호출 된 모든 함수(중첩함수, 콜백함수 포함) 내부의 this에는 전역객체인 window객체가 context객체가 된다.
 *
 */

// arrow function
const testFunc1 = () => {
  console.log(this, "arrow function");
};
testFunc1();

// function declare
function testFunc2(디스) {
  // console.log(this, "function declare");
  console.log(디스);
}
testFunc2(this);
console.log("--------------- Boundary line ---------------");

/**
 *  2. 메서드(method) 호출
 *    - 메서드 내부의 this는 메서드를 포함하고 있는 객체 또는 그 메서드를 부르는 객체가 context객체가 된다.
 *
 *  🧨. 주의점 (feat. 메서드에서 arrow function이 아닌 function declare를 사용해야하는 이유)
 *    - arrow function으로 메서드를 정의할 경우 this는 메서드를 소유한 객체나 메서드를 호출한 객체가 아닌 상위의 전역객체 window객체를 context객체로 갖는다, 이러한 이유로 메서드는 function declare방식을 이용하여 선언해주는 것이 좋다
 */

const obj1 = {
  a: 1,
  // function declare, context객체는 obj1이 된다.
  b: function () {
    console.log(this.a);
  },
  // arrow function, context객체는 window객체가 된다.
  c: () => {
    console.log(this.a);
  },
  d: function () {
    console.log(this.b);
    console.log(typeof this.b);
  },
};

obj1.b(); // 1
obj1.c(); // undefined
obj1.d(); // method인 b, type은 function
console.log("--------------- Boundary line ---------------");

/**
 *  3. 생성자함수(constructor function) 호출
 *    - 생성자함수 내부의 this는 후에 new로 생성할 인스턴스가 this의 context객체가 된다.
 *    - new연산자를 이용해 호출해야 생성자함수로 동작한다.
 *
 *  🧨. 주의점
 *    - new연산자를 붙이지 않고 호출한다면 일반함수로 동작하여 이때의 this는 전역객체 window객체를 context객체로 갖는다.
 */

class Person {
  // constructor내부의 this는 미래의 생성 될 새로운 인스턴스를 context객체로 가진다.
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  sayHello() {
    console.log(`안녕하세요 ${this.name}입니다`);
  }
}

const jasper = new Person("Jasper", 35, "Inchon");
jasper.sayHello(); // '안녕하세요 Jasper 입니다
console.log(jasper.address); // Inchon
console.log("--------------- Boundary line ---------------");

/**
 *  4. Function.protorype.aplly(), call(), bind()메서드들에 의한 명시적 간접 호출
 *    4-1. apply(), call()
 *        - 본질적 기능은 함수를 호출하는 것이다.
 *        - 함수를 호출하면서 첫번째 아규먼트로 전달한 특정 객체가 context객체에 해당되며 호출한 함수의 this에 바인딩한다.
 *    4-2. bind(),
 *        - bind메서드는 aplly, call메서드와 달리 함수를 호출하지 않는다, 다만 첫번째 파라미터로 전달한 값으로 this바인딩이 교체 된 함수를 새롭게 생성해 반환한다.
 *        - bind메서드는 메서드의 this와 메서드 내부의 중첩함수 또는 콜백함수의 this가 불일치하는 문제를 해결하기 위해 사용된다.
 *
 *  🧨. 주의점
 *    -
 */

// 4-1, 4-2
// 'use strict' 사용시 undefined, 아닌 경우에는 window객체를 가르킨다.
function test() {
  return this;
}

const test2 = () => {
  return this;
};

const me = { name: "Jasper", age: 35 };

console.log(test()); // 'use strict' 사용하고 있기 때문에 undefined
console.log(test2()); // arrow function은 상위객체인 window객체를 context로 가진다.

// apply()나 call()메서드를 사용하여 객체를 첫번째 아규먼트로 전달하면 context객체는 메서드에서 첫번째 아규먼트로 전달받은 객체가 된다.
console.log(test.apply(me));
console.log(test.call(me).name);
// apply메서드는 함수의 인수를 배열로 묶어 전달한다.
// call메서드는 함수의 아규먼트를 쉼표로 구분한 리스트 형식으로 전달한다.

// 4-3
const person = {
  name: "Jasper",
  testFunc3(callback) {
    setTimeout(callback, 1000);
  },
};

person.testFunc3(function () {
  // 현재 this의 name은 person이 아니라 window.name이다, 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ' '을 갖기 때문에 공백으로 출력되는 것을 볼 수 있다.
  console.log(`My name is ${this.name}`);
});

// bind메서드를 통해 콜백함수 내부의 this와 외부함수 this와 일치시킬 수 있다.
const person2 = {
  name: "Jasper",
  testFunc4(callback) {
    // callback함수 내부의 this를 bind로 묶어 전달
    setTimeout(callback.bind(this), 1000);
  },
};

person2.testFunc4(function () {
  // 만약 arrow function이라면 위의 testFunc3과 마찬가지로 window객체를 context객체로 가지기 때문에 공백으로 출력된다.
  console.log(`My name is ${this.name}`);
});
