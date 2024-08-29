#### 타입스크립트란?
 - 자바스크립트의 수퍼셋
 - 자바스크립트의 코드 작성이 더 쉽고 강력해짐
 - 단점
 	- 브라우저 같은 자바스크립트 환경에서는 실행되지 않음
 - 코드를 작성해서 실행하면 자바스크립트 코드로 변환해주는 컴파일러
 
#### 자바스크립트 전역설치
 - node.js 설치
 - 타입스크립트 전역 설치 (컴파일러)
 ```vscode
  npm install -g typescript
 ```
 
#### 기초 사용
- 타입스크립트를 jsx로 컴파일
```
//파일 경로에서
tsc '파일명'
```
	-> 실제로 사용할 js 파일이 생성됨
- 작동방식을 명확하게 하여 원치않는 오류를 제거
- 컴파일 하기 전에 오류 사전에 확인 가능
- 타입스크립트 지원이 내장된 IDE 사용 가능
- 인터페이스나 제네릭 같은 타입스크립트만 이해가능한 기능이 들어가기도함 ( 더 많은 오류 감지 기능)
- 유용한 설정이 가능
=> 기존의 틀을 벗어난 방대한 기능 사용 가능

### Core Type
- number : 정수나 실수를 나타내는 특별한 타입없이 하나로 나타내짐
```ts
      function add(n1: number ,n2:number, bool:boolean){
          return(
              <div>
                  {n1+n2}
                  {bool ? <div>True</div>:<div>False</div>}
              </div>
          )
      }
      export default add
```
- string : 텍스트 구문
- boolean : 참, 거짓
- object : 객체, 속성을 가진 프로퍼티
- array : 유연한 배열 지원
	- string[], number[], any[](다른 단일형 배열에서 주는 이점을 상실함)
```ts
    const Person : {
      name : string
      age : number
      parent : string[];
      details : {
          married : boolean;
          job : string;
          };
    }={
    	name:'Max',
        age : 30,
        parent : ['jennie','shultze']
        details : {
        	married : True,
            job : developer
        }
    }
```
- tuple : **타입스크립트에서 추가됨** 고정된 길이, 고정된 타입 값을 가진 배열
	- 정확히 두 개의 값을 가진 배열임을 알려줌
    - 다른 타입으로 변경 불가
    **- push로는 값이 들어갈 수 있음(오류로 추정)**
    - 새로 값을 지정할 때도 정해진 타입을 맞춰야 함
```ts
const Person:{hobbies:string[],role:[number,string]}={
    hobbies:['Sport','Game'],
    role : [2,'Author']
}

export default Person
```
- enum : **타입스크립트에서 추가됨** 람이 읽을 수 있는식별자를 가지고 있고, 전역 상수를 라벨로 가짐
	- 전역 상수는 0부터 시작해서 1씩 증가
    - 전역 상수를 지정하는 것도 가능함. 지정할 경우 지정한 수부터 1씩 증가
    - 문자열도 할당가능
```ts
enum Role {ADMIN =5, AUTHOR, DEVELOPER}

const Person:{hobbies:string[],role:Role}={
    hobbies:['Sport','Game'],
    role : Role.ADMIN
}

export default Person
```
- Any : 어떤 값이든 가능함. 유연하지만, 타입스크립트의 장점을 전혀 활용하지 못함.
- Union : 여러개의 타입을 지정할 수 있다.
	- 예제에서는 런타임 타입체크를 해서 각 값이 어떤 값인지에 따라 다른 연산을 수행하도록 했으나, 작성 로직에 따라 그렇게 하지 않아도 됨.
	- Literal : 유니온 타입의 확장 기능으로, 여러 개의 변수를 보낼 수 있다. 그 값이 일치하는지를 볼 수 있다. enum과 유사하나 따로 선언하지 않아도 되고, 편리함.
	- alias : 유니온 타임의 확장 기능으로, 유니온 타입을 여러번 중복해서 쓸 필요없이 특정 유니온 타입을 선언해서 사용가능. 타입에 제한 없음. Literal도 가능.
```ts
type Combinable = number | string // alias

function combine(
    input1: Combinable,
    input2: Combinable,
    resultType: 'isNum'|'isStr' //Literal
    ) {
        let result;
      
        if (typeof input1 === 'number' && typeof input2 === 'number' && resultType =='isNum') {
          result = input1 + input2;
        } else {
          result = input1.toString()+input2.toString();
        }
      
        return <div>{result}</div>;
      }
      
      export default combine;
  
```
- function : 타입으로 다른 함수를 지정가능하다. 하지만 변수에 할당하는 만큼 값이 함수에서 다른 것으로 바뀌는 것을 방지하기 위해 명시적으로 지정가능함.
	- 매개변수와 반환형식까지 지정가능함  
```ts
let combine : (a: number, b: number) => number
```
   - 콜백으로 지정 가능. 단, void로 반환하는 경우에 return으로 값을 반환해도 암묵적으로 반환값을 신경쓰지 않겠다고 표현한 것과 다름이 없기때문에 return으로 값을 반환해도 값이 반환되고 에러가 발생 안함.
```ts
 function handler(
a:number,
 b:number,
 callback:(num:number)=>void
){
 result = a+b
  callback(result)
 }
```
- unknown : any와 비슷하게 어떤 값이든 할당 가능하지만, 모든 것을 허용하지는 않음. 다른 타입에 값을 할당할 때는 type을 검사하고 일치시켜야함. any와 유사하게 아무때나 사용하는 것은 아님.
```ts
let userInput: unknown
  let userName : string

  userInput = 5
  userInput = 'Kang'
  
  if(typeof userInput == "string")
    {
      userName = userInput
    }
```
- never : void와 유사하나 아무런 값도 '절대' 반환하지 않음. 오류 메세지를 반환하는 함수 같은 경우에 이런 타입으로 추정됨.

**node.js 의 CRA, Vite 로 만들면 자체적으로 tsx파일을 감시하고 바뀔때마다 컴파일을 자동으로 해준다.**

- 타입을 지정하면 다른 타입을 값으로 넣을때 오류가 발생한다.

### 반환 타입
- 기본적으로 타입스크립트눈 return문에 들어가는 함수를 추론해 적절한 타입을 반환하지만, 명시적으로 설정 가능하다.
- 반환값이 없을 경우에는 void를 반환한다.