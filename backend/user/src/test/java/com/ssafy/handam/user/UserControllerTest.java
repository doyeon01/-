package com.ssafy.handam.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import com.ssafy.handam.user.presentation.UserController;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

    @WebMvcTest(UserController.class)
    @AutoConfigureRestDocs // REST Docs 사용
    class UserControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        ObjectMapper objectMapper;

        @Test
        @DisplayName("설문조사 응답 제출")
        void submitSurvey() throws Exception {
            UserSurveyRequest request = UserSurveyRequest.initSurveyRequest();

            String requestBody = objectMapper.writeValueAsString(request);
            mockMvc.perform(post("/api/v1/user/{id}/survey", 1L)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("post-survey",
                            pathParameters(
                                    parameterWithName("id").description("사용자 ID")  // 경로에서 가져오는 사용자 ID
                            ),
                            requestFields(
                                    fieldWithPath("questions").description("질문 번호와 응답을 담은 Map (예: {1: A, 2: B})"),  // 질문 응답 문서화
                                    fieldWithPath("questions.1").description("질문 1에 대한 응답 (A 또는 B)"),
                                    fieldWithPath("questions.2").description("질문 2에 대한 응답 (A 또는 B)"),
                                    fieldWithPath("questions.3").description("질문 3에 대한 응답 (A 또는 B)"),
                                    fieldWithPath("questions.4").description("질문 4에 대한 응답 (A 또는 B)"),
                                    fieldWithPath("photoSelections").description("선택한 장소 ID 목록을 담은 Map (예: {1: [101], 2: [102]})"),  // 사진 선택 문서화
                                    fieldWithPath("photoSelections.1").description("사진 선택 1에 해당하는 장소 ID 목록"),
                                    fieldWithPath("photoSelections.2").description("사진 선택 2에 해당하는 장소 ID 목록"),
                                    fieldWithPath("photoSelections.3").description("사진 선택 3에 해당하는 장소 ID 목록"),
                                    fieldWithPath("photoSelections.4").description("사진 선택 4에 해당하는 장소 ID 목록")
                            ),
                            responseFields(
                                    fieldWithPath("success").description("응답의 성공 여부 (true 또는 false)"), // 성공 여부에 대한 응답 필드
                                    fieldWithPath("response").description("응답 데이터 (이 경우 null일 수 있음)"),  // response 필드 문서화
                                    fieldWithPath("error").description("오류 정보 (null일 수 있음)")
                            )
                    ));
        }

        @Test
        @DisplayName("id로 사용자 정보 조회")
        void getUserInfo() throws Exception {

            mockMvc.perform(get("/api/v1/user/{id}", 1L)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.response.username").isString())
                    .andExpect(jsonPath("$.response.birth").isString())
                    .andExpect(jsonPath("$.response.gender").value(Gender.FEMALE.name()))
                    .andExpect(jsonPath("$.response.residence").isString())
                    .andDo(print())
                    .andDo(document("get-user-info",
                            pathParameters(
                                    parameterWithName("id").description("사용자 ID")
                            ),
                            responseFields(
                                    fieldWithPath("success").description("응답의 성공 여부 (true 또는 false)"),
                                    fieldWithPath("response").description("응답 객체"),
                                    fieldWithPath("response.username").description("사용자의 이름"),
                                    fieldWithPath("response.birth").description("사용자의 생년월일"),
                                    fieldWithPath("response.gender").description("사용자의 성별 ENUM타입:(F 또는 M))"),
                                    fieldWithPath("response.residence").description("사용자의 거주지"),
                                    fieldWithPath("response.introduction").description("사용자의 자기소개"),
                                    fieldWithPath("response.accompanyTemperature").description("동행온도"),
                                    fieldWithPath("error").description("오류 정보 (있다면, null일 수 있음)")
                            )
                    ));
        }
        @Test
        @DisplayName("keyword로 사람 검색")
        void searchUsers() throws Exception {

            mockMvc.perform(get("/api/v1/user/search")
                            .param("keyword", "도연")  // 쿼리 파라미터로 keyword 전달
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("get-user-search",
                            // 쿼리 파라미터를 명시
                            queryParameters(
                                    parameterWithName("keyword").description("검색할 사용자 이름의 키워드")
                            ),
                            // 응답 필드 문서화
                            responseFields(
                                    fieldWithPath("success").description("응답의 성공 여부 (true 또는 false)"),
                                    fieldWithPath("response[].username").description("사용자의 이름"),
                                    fieldWithPath("response[].birth").description("사용자의 생년월일"),
                                    fieldWithPath("response[].gender").description("사용자의 성별 ENUM타입:(F 또는 M))"),
                                    fieldWithPath("response[].residence").description("사용자의 거주지"),
                                    fieldWithPath("response[].introduction").description("사용자의 자기소개"),
                                    fieldWithPath("response[].accompanyTemperature").description("동행온도"),
                                    fieldWithPath("error").description("오류 정보 (있다면, null일 수 있음)")
                            )
                    ));
        }
    }