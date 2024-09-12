package com.ssafy.handam.user;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import com.ssafy.handam.user.presentation.UserController;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

    @WebMvcTest(UserController.class)
    @AutoConfigureRestDocs // REST Docs 사용
    class UserControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Test
        @DisplayName("id로 사용자 정보 조회")
        void
        @Test
        @DisplayName("id로 사용자 정보 조회")
        void getUserInfo() throws Exception {
            // 실제 컨트롤러에서 반환하는 응답을 검증
            mockMvc.perform(get("/api/user/users/{id}", 1L)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    // JSON 데이터 타입 검증
                    .andExpect(jsonPath("$.response.username").isString())
                    .andExpect(jsonPath("$.response.birth").isString())
                    .andExpect(jsonPath("$.response.gender").value(Gender.FEMALE.name()))
                    .andExpect(jsonPath("$.response.residence").isString())
                    .andDo(print())
                    .andDo(document("get-user-info",
                            pathParameters(
                                    parameterWithName("id").description("사용자 ID")  // 경로 파라미터 문서화
                            ),
                            responseFields(
                                    fieldWithPath("success").description("응답의 성공 여부 (true 또는 false)"),
                                    fieldWithPath("response").description("응답 객체"),
                                    fieldWithPath("response.username").description("사용자의 이름"),
                                    fieldWithPath("response.birth").description("사용자의 생년월일"),
                                    fieldWithPath("response.gender").description("사용자의 성별 ENUM타입: " + Arrays.toString(Gender.values())),
                                    fieldWithPath("response.residence").description("사용자의 거주지"),
                                    fieldWithPath("error").description("오류 정보 (있다면, null일 수 있음)")
                            )
                    ));
        }
    }