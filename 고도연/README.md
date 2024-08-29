# 타입스크립트와 타입 시스템

## 타입스크립트란?

타입스크립트는 복잡한 상황에서 대규모의 프로그램을 만들기 위해 자바스크립트를 안정적으로 사용할 수 있도록 `타입`이라는 안전장치를 하나 추가한 언어입니다.

## 타입 시스템이란?

타입 시스템은 프로그래밍 언어를 사용할 때 타입과 관련해서 지켜야 하는 규칙들을 모아둔 체계로, 언어의 타입 관련된 문법 체계입니다.

- **동적 타입 시스템**: 예를 들어 파이썬, 자바스크립트
- **정적 타입 시스템**: 예를 들어 C, JAVA

### 1. 동적 타입 시스템

- 변수의 타입들이 코드가 실행되는 도중에 결정됩니다. 즉, 변수의 타입을 우리가 직접 정의하지 않습니다.
- 변수의 타입이 하나로만 고정되지 않으며, 아무 타입의 값이나 자유롭게 담을 수 있습니다.

#### 점진적 타이핑

변수의 타입을 직접 정의하지 않아도 변수에 담기는 초기값을 기준으로 자동으로 타입을 알아서 추론합니다.

- **기본 타입 (Basic Types)**: 타입스크립트가 자체적으로 제공하는 타입(내장 타입)
- **원시타입 (Primitive Type)**: 동시에 한 개의 값만 저장할 수 있는 타입들

cf. 비원시타입: 동시에 여러 개의 값을 저장할 수 있음(배열, 객체)

각 타입으로 정의한 변수에는 이를 제외한 값을 할당할 수 없으며, 해당 타입의 값이 사용할 수 없는 메서드 또한 사용할 수 없습니다.

## 기본 타입 예시

### 1. number 타입

```ts
// number
let num1: number = 123; // 타입 주석(annotation)
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;
```

 

### 2. string, boolean, null, undefined 타입

 
```ts
// string

let str1 : string = "hello";
let str2 : string = "hello";
let str3 : string = `hello`;
let str4 : string = `hello ${num1}`
```

```
// boolean

let bool1 : boolean = true;
let bool2 : boolean = false;
```

```
// null

let null1 : null = null;

// undefined

let unde1 : undefined = undefined;
 ```

※ null 값을 다른 타입의 변수에 할당하기(null 값을 변수의 임시값으로 싶다면?)

→ strictNullChecks: 타입스크립트에서 null 값을 null 타입 이외의 타입의 변수에 할당하는 것을 금지할지 허락할지 여부를 결정하는 옵션(strict 옵션의 하위 옵션, 즉 strict 옵션이 false이면 자동으로 false로 설정됨)

```
{
  "compilerOptions": {
    ...
    "strictNullChecks": true, // 또는 삭제하세요
		...
  },
  "ts-node": {
    "esm": true
  },
  "include": ["src"]
}
```

 

- 리터럴 타입(Literal Type): 딱 하나의 값만 포함하는 타입

 ```
// 리터럴 타입
// 리터럴 -> 값
let numA : 10 = 10
let strA : 'hello' = 'hello';
let boolA : true = true
```





 


 

 

