## Spring MVC

## DispatcherServlet 구조 살펴보기

> 앞서 구현했던 FrontController가 Spring MVC에서는 DispatcherServlet이다.
> 

- 부모 클래스에서 HttpServlet을 상속받아 Servlet으로 동작한다.
- DispatcherServlet을 자동으로 등록하면서 모든 경로(UrlPatterns=”/”)에 대해 맵핑한다.

## Spring MVC 동작 순서

1. 핸들러 조회: 핸들러 매핑을 통해 요청 URL에 매핑된 핸들러를 조회한다.
2. 핸들러 어댑터 조회: 핸들러를 실행할 수 있는 핸들러 어댑터를 조회한다.
3. 핸들러 어댑터 실행: 핸들러 어댑터를 실행한다.
4. 핸들러 실행: 핸들러 어댑터가 실제 핸들러를 실행한다.
5. ModelAndView 반환: 핸들러 어댑터는 핸들러가 반환하는 정보를 ModelAndView로 변환해서 반환한다.
6. viewResolver 호출: viewResolver를 찾고 실행한다.
    - JSP의 경우: InternalResourceViewResolver가 자동으로 등록되고,사용한다.
7. View 반환: viewResolver는 view의 논리 이름을 물리 이름을 바꾸고, 렌더링 역할을 담당하는 view 객체를 반환한다.
    - JSP의 경우: InternalResourceView(JstlView)를 반환하는데, 내부에 forward() 로직이 있다.

## Handler Mapping과 Handler Adapter

> 요청에 맞는 Controller를 찾고, 형태가 다른 Controller를 실행하기 위해 필요하다.
> 

- Spring Boot가 자동으로 등록하는 handler mapping과 handler adapter
    - HandlerMapping
        - RequestMappingHandlerMapping
            
            → Annotation 기반의 Controller인 @RequestMapping에서 사용한다.
            
        - BeanNameUrlHandlerMapping
            
            → Spring Bean의 이름으로 Handler를 찾는다.
            
    - HandlerAdapter
        - RequestMappingHandlerAdapter
            
            → Annotation 기반의 Controller인 @RequestMapping에서 사용한다.
            
        - HttpRequestHandlerAdapter
            
            → HttpRequestHandler 처리
            
        - SimpleControllerHandlerAdapter
            
            → Controller(Annotation이 아닌 과거에 사용하던 것) 인터페이스 처리

<br>

```java
// controller 예시
package hello.springmvc.basic.requestmapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;


@RestController
public class MappingController {

    private Logger log = LoggerFactory.getLogger(getClass());

    @RequestMapping({"/hello-basic", "/hello-go"})
    public String helloBasic() {
        log.info("hello-basic");
        return "ok";
    }

    /**
     * method 특정 HTTP 메서드 요청만 허용
     * GET, HEAD, POST, PUT, PATCH, DELETE
     */a
    @RequestMapping(value = "/mapping-get-v1", method = RequestMethod.GET)
    public String mappingGetV1() {
        log.info("mappingGetV1");
        return "ok";
    }

    /**
     * 편리한 축약 애노테이션 (코드보기)
     * @GetMapping
     * @PostMapping
     * @PutMapping
     * @DeleteMapping
     * @PatchMapping
     */
    @GetMapping(value = "/mapping-get-v2")
    public String mappingGetV2() {
     log.info("mapping-get-v2");
     return "ok";
    }


    /**
     * PathVariable 사용
     * 변수명이 같으면 생략 가능
     * @PathVariable("userId") String userId -> @PathVariable userId
     * /mapping/userA
     */
    @GetMapping("/mapping/{userId}")
    public String mappingPath(@PathVariable("userId") String data) {
        log.info("mappingPath: " + data);
        return "ok";
    }


    /**
     * PathVariable 사용 다중
     */
    @GetMapping("/mapping/users/{userId}/orders/{orderId}")
    public String mappingPath(@PathVariable String userId, @PathVariable Long
    orderId) {
        log.info("mappingPath userId={}, orderId={}", userId, orderId);
        return "ok";
    }

    /**
     * 파라미터로 추가 매핑
     * params="mode",
     * params="!mode"
     * params="mode=debug"
     * params="mode!=debug" (! = )
     * params = {"mode=debug","data=good"}
     */
    @GetMapping(value = "/mapping-param", params = "mode=debug")
    public String mappingParam() {
        log.info("mappingParam");
        return "ok";
    }


    /**
     * Content-Type 헤더 기반 추가 매핑 Media Type
     * consumes="application/json"
     * consumes="!application/json"
     * consumes="application/*"
     * consumes="*\/*"
     * MediaType.APPLICATION_JSON_VALUE
     */
    @PostMapping(value = "/mapping-consume", consumes = "application/json")
    public String mappingConsumes() {
        log.info("mappingConsumes");
        return "ok";
    }

}
```

<br>

## Request Mapping

> 둘 다 허용
> 
- Spring은 다음 URL 요청들을 같은 요청으로 mapping 한다.
    
    → /hello-basic, /hello-basic/
    

> HTTP 메서드
> 
- @RequestMapping은 method를 지정하지 않으면 모든 요청을 받는다

> PathVariable(경로 변수) 사용
> 
- 변수명이 같으면 생략이 가능하다.
    
    → @PathVariable(”userId”) String userId == @PathVariable userId

<br>

```java
// Request Mapping Controller
package hello.springmvc.basic.requestmapping;

import org.springframework.web.bind.annotation.*;

@RestController("/mapping/users")
public class MappingClassController {

    @GetMapping
    public String user() {
        return "get users";
    }

    @PostMapping
    public String addUser() {
        return "post user";
    }

    @GetMapping("/{userId}")
    public String findUser(@PathVariable String userId) {
        return "get userId" + userId;
    }

    @PatchMapping("/{userId}")
    public String updateUserUser(@PathVariable String userId) {
        return "get userId" + userId;
    }


    @DeleteMapping("{userId}")
    public String deleteUserUser(@PathVariable String userId) {
        return "delete userId" + userId;
    }
}
```