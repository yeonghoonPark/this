"use strict";

/**
 * this
 *
 * javaScript내에서의 this의 4가지 동작 방식
 * context객체 = this가 바로보고 있는 객체
 *
 * 1. this의 첫번째 동작 방식 - 기본 바인딩(전역객체)
 *  - 기본 바인딩(전역객체)의 경우 this는 window객체를 context객체로 갖는다.
 *
 * 2. this의 두번째 동작 방식 - 암시적 바인딩
 *
 * 3. this의 세번째 동작 방식 - 명시적 바인딩
 *
 * 4. this의 네번째 동작 방식 - new 바인딩
 *
 * 참조사이트
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
 * https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D
 */

/**
 *  1. this의 첫번째 동작 방식 - 기본 바인딩(전역객체) = window객체
 *
 *  🧨. 주의점
 *    - this가 전역스코프에서 선언 될 경우, window객체를 context객체로 갖기 때문에 전역객체로 선언 된다.
 *      전역객체로 선언 될 경우 일반객체(object)와 같이 아무 제약 없이 동작하기 때문에 this를 전역적으로
 *      무분별하게 사용 할 경우에 전역상태에 영향을 줄 수 있기 때문에 주의해야한다.
 */

// 전역스코프에서의 this, = window
console.log(this, "전역객체");

// var변수의 경우 this는 전역객체인 window를 context객체로 갖는다.
var a = 1;
console.log(this.a, "var변수"); // 1

// let변수나 const변수의 경우는 undefined를 갖게 된다.
let b = 1;
const c = 1;
console.log(this.b, "let변수"); // undefined
console.log(this.c, "const변수"); // undefined

// 전역스코프에서의 this는 context객체로 window객체를 바라보기 때문에 전역적으로 객체에 등록된다.
const doSomething = () => {
  this.dummy2 = "더미2";
  console.log(this); // window객체, doSomething()을 호출할 시 전역적으로 dummy2의 값을 '더미2'로 선언하는 기능을 가지고 있는 함수나 마찬가지다.
};

// this.dummy1을 선언하지 않았기 때문에 undefined
console.log(this.dummy1); // undefined
// this.dummy2를 선언해주는 doSomething()을 호출하기 전이기 때문에 undefined
console.log(this.dummy2); // undefined

// window객체로 dummy1의 값을 선언
this.dummy1 = "더미1";

// this.dummy1을 선언 한 이후라서 값이 '더미1'로 출력된다.
console.log(this.dummy1); // 더미1
// this.dummy2를 선언해주는 doSomething()을 호출하기 전이기 때문에 undefined
console.log(this.dummy2); // undefined

// this.dummy2를 선언해주는 함수 호출
doSomething();

console.log(this.dummy1); // 더미1
console.log(this.dummy2); // 더미2
