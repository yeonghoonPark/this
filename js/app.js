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
 * 4. Function.protorype.apply(), call(), bind()메서드들에 의한 명시적 간접 호출
 *   - apply(), call(), bind()메서드에 첫번째 인수로 전달한 객체
 *
 * 참조사이트
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
 * https://velog.io/@kimwanyoung/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this-%EC%A0%95%EB%A6%AC
 * https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D
 */

/**
 *  1. 일반 함수 호출
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

/**
 *  2. 메서드 호출
 *    - 메서드 내부의 this는 메서드를 포함하고 있는 객체 또는 그 메서드를 부르는 객체가 context객체가 된다.
 *
 *  🧨. 주의점 (feat. 메서드에서 function declare를 사용해야하는 이유)
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
};

obj1.b(); // 1
obj1.c(); // undefined

// 생성자함수 개념
// https://developer-talk.tistory.com/281
