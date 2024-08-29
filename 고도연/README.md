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

```ts
// boolean

let bool1 : boolean = true;
let bool2 : boolean = false;
```

```ts
// null

let null1 : null = null;

// undefined

let unde1 : undefined = undefined;
 ```

※ null 값을 다른 타입의 변수에 할당하기(null 값을 변수의 임시값으로 싶다면?)

→ strictNullChecks: 타입스크립트에서 null 값을 null 타입 이외의 타입의 변수에 할당하는 것을 금지할지 허락할지 여부를 결정하는 옵션(strict 옵션의 하위 옵션, 즉 strict 옵션이 false이면 자동으로 false로 설정됨)

```ts
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

 ```ts
// 리터럴 타입
// 리터럴 -> 값
let numA : 10 = 10
let strA : 'hello' = 'hello';
let boolA : true = true
```

```ts
let numArr : number[] = [1,2,3];

let strArr : string[] = ['hello','im','winterwood']

let boolArr : Array<boolean> = [true, false, true]

// 배열에 들어가는 요소들의 타입이 다양할 경우 ~ 유니온 타입
let multiArr : (number|string)[] = [1,'hello']

// 다차원 배열의 타입을 정의하는 방법
let doubleArr : number[][] = [
  [1, 2, 3],
  [4, 5]
]
```

```ts
// 튜플(길이와 타입이 고정된 배열)
let tup1 : [number, number] = [1, 2];

let tup2 : [number, string, boolean] = [1, '2', true]


const users : [string, number][] = [
  ['이정환', 1],
  ['이아무개', 2],
  ['김아무개', 3],
  ['박아무개', 4],
  // [5, '최아무개']
]
```

※ 튜플 = 배열, 배열 메서드인 push나 pop을 이용해 고정된 길이를 무시하고 요소를 추가 혹은 삭제 가능

### - 객체 리터럴 타입: 중괄호를 열고 객체가 갖는 프로퍼티를 직접 나열해 만드는 타입

 
```ts
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user.id;
```

 

## - 특수한 프로퍼티 정의


### 1. 선택적 프로퍼티(Optional Property): 특정 프로퍼티를 상황에 따라 생략하도록 만들고 싶을 때 사용

 
```ts
let user: {
  id?: number;
  name: string;
} = {
  id: 1,
  name: "이정환",
};

user = {
  id: "id", // 오류 발생!
  name: "홍길동",
};
```

→ 선택적 프로퍼티가 존재한다면, 그때의 value 타입은 반드시 정의한 타입과 동일해야 한다!

 

### 2. 읽기전용 프로퍼티( Readonly Property) : 프로퍼티의 값을 수정하지 않게 하기 위해 설정

 
```ts
let user: {
  id?: number;
  readonly name: string; // name은 이제 Readonly 프로퍼티가 되었음
} = {
  id: 1,
  name: "이정환",
};

user.name = "dskfd"; // 오류 발생
```

## - 타입 별칭(Type Alias): 타입 정의를 마치 변수처럼 하게 해줌

```ts
// 타입 별칭
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};
...
```

→ 동일한 스코프에 동일한 이름의 타입 별칭을 선언하는 것은 불가능(스코프가 다르다면 가능)


## - 인덱스 시그니처(Index Signature): 객체 타입을 유연하게 정의할 수 있도록 돕는 특수한 문법

 
```ts
type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedState: "us",
  UnitedKingdom: "uk",
  // (... 약 100개의 국가)
  Brazil : 'bz'
};
 

type CountryNumberCodes = {
  [key: string]: number;
  Korea: number;
};

type CountryNumberCodes = {
  [key: string]: number;
  Korea: string; // 오류!
};
```

→ 추가적인 프로퍼티를 정의할 때, 인덱스 시그니처의 value 타입과 직접 추가한 프로퍼티의 value 타입이 호환되거나 일치해야함

## - 열거형(Enum) 타입: 여러 개의 값을 나열하는 용도로 사용(오직 타입스크립트에서만 사용 가능)

```ts
// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

enum Role {
  ADMIN, // 0 할당(자동)
  USER,  // 1 할당(자동)
  GUEST, // 2 할당(자동)
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 0
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 1
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 2
};
 

// enum 타입
// 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입

enum Role {
  ADMIN = 10, // 10 할당 
  USER,       // 11 할당(자동)
  GUEST,      // 12 할당(자동)
}

const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 10
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 11
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 12
};
```

→ 멤버의 값이 모두 숫자인 enum을 숫자형 enum 혹은 숫자 열거형 타입 이라고 부름

 

cf. 문자열 열거형

```ts
enum Language {
  korean = "ko",
  english = "en",
}

enum Role {
  ADMIN,
  USER,
  GUEST,
}


const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 0
  language: Language.korean,// "ko"
};
```

 

cf. enum 컴파일 결과 = 객체

 
```ts
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["GUEST"] = 2] = "GUEST";
})(Role || (Role = {}));
var Language;
(function (Language) {
    Language["korean"] = "ko";
    Language["english"] = "en";
    Language["japanese"] = "jp";
})(Language || (Language = {}));
const user1 = {
  name: "이정환",
  role: Role.ADMIN, // 0
  language: Language.korean,// "ko"
};
```

- any : 타입 검사를 받지 않는 타입(타입스크립트에서만 제공) 

 
```ts
let anyVar: any = 10;
anyVar = "hello";

anyVar = true;
anyVar = {};

anyVar.toUpperCase();
anyVar.toFixed();
anyVar.a;

let num: number = 10;
num = anyVar;
```

→ 어떠한 타입 검사도 받지 않기 때문에 아무 타입의 값이나 범용적으로 담아 사용 가능

→ 다양한 타입의 메서드도 마음대로 호출해서 사용 가능

→ any 타입의 값은 어떤 타입으로 정의된 변수던 문제 없이 다 할당 가능

 

 

- Unknown: any타입과 비슷하지만 안전한 타입

 
```ts
let num: number = 10;
(...)

let unknownVar: unknown;
unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

num = unknownVar; // 오류 !
```

→ unknown 타입은 독특하게도 변수의 타입으로 정의되면 모든 값 할당 가능

→ 반대로 unknown 타입의 값은 그 어떤 타입의 변수에도 할당할 수 없고, 모든 연산에 참가할 수 없음

※ 오직 값을 저장하는 행위만 가능

 

cf. 조건문을 이용하여 unknown 타입의 값을 number 타입의 값임을 보장한다면 연산 가능

 
``` ts
if (typeof unknownVar === "number") {
	// 이 조건이 참이된다면 unknownVar는 number 타입으로 볼 수 있음
  unknownVar * 2;
}
```
## - void: 아무런 값도 없음을 의미하는 타입(아무런 값도 반환하지 않는 함수의 반환값 타입을 정의할 때 사용)

 
```ts
// void -> 공허(아무것도 없다), 아무것도 없음을 의미하는 타입

function func1(): string {
  return "hello"
}

function func2(): void {
  console.log('hello')
}

// null, undefined를 사용하면, return 값을 이와 동일하게 작성해줘야 하기 때문
 ```

→ return문 자체가 없는 함수의 반환값 타입을 정의해야 할 때 사용!

 

 

## - never: 함수가 어떠한 값도 반환할 수 없는 상황일 때 해당 함수의 반환값 타입을 정의할 때 사용(불가능을 의미하는 타입)

 
```ts
function func3(): never {
  while (true) {}
}

function func4(): never {
  throw new Error();
}

let anyVar: any;
(...)

let a: never;
a = 1;
a = null;
a = undefined;
a = anyVar;
```

→  any를 포함해 그 어떠한 타입의 값도 이 변수에 담을 수 없음

 

