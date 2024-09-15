package com.ssafy.handam.user.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.handam.user.RestDocsSupport;
import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInfoResponse;
import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.presentation.UserController;
import com.ssafy.handam.user.presentation.request.UserSurveyRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

    class UserControllerTest extends RestDocsSupport {

        @Test
        @DisplayName("설문조사 응답 제출")
        void submitSurvey() throws Exception {
            UserSurveyRequest request = createUserSurveyRequest();

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
            User user = createUser(); //DB 연결전 임시 데이터 생성
            UserInfoResponse response = UserInfoResponse.of(user);

            given(userService.findUserById(1L)).willReturn(user);
            given(userService.getUserInfo(1L)).willReturn(response);

            mockMvc.perform(get("/api/v1/user/{id}", 1L)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andDo(print())
                    .andDo(document("get-user-info",
                            pathParameters(
                                    parameterWithName("id").description("사용자 ID")
                            ),
                            responseFields(
                                    fieldWithPath("success").description("응답의 성공 여부 (true 또는 false)"),
                                    fieldWithPath("response").description("응답 객체"),
                                    fieldWithPath("response.id").description("사용자의 id"),
                                    fieldWithPath("response.nickname").description("사용자의 이름"),
                                    fieldWithPath("response.birth").description("사용자의 생년월일"),
                                    fieldWithPath("response.gender").description("사용자의 성별 ENUM타입:(F 또는 M))"),
                                    fieldWithPath("response.residence").description("사용자의 거주지"),
                                    fieldWithPath("response.introduction").description("사용자의 자기소개"),
                                    fieldWithPath("response.accompanyTemperature").description("동행온도"),
                                    fieldWithPath("error").description("오류 정보 (있다면, null일 수 있음)")
                            )
                    ));
        }
        public User createUser(){
            return User.builder()
                    .id(1L)
                    .nickname("고도연")
                    .birth(LocalDate.of(2000,1,2))
                    .gender(Gender.FEMALE)
                    .residence("MokPo")
                    .introduction("안녕하세요 저는 개발자 입니다.")
                    .accompanyTemperature(36.5)
                    .build();
        }
        public UserSurveyRequest createUserSurveyRequest() {
            Map<Integer, String> questions = new HashMap<>();
            Map<Integer, List<Integer>> photoSelections = new HashMap<>();

            questions.put(1, "A");
            questions.put(2, "B");
            questions.put(3, "A");
            questions.put(4, "B");

            photoSelections.put(1, List.of(101, 102));
            photoSelections.put(2, List.of(103, 104));
            photoSelections.put(3, List.of(105, 106));
            photoSelections.put(4, List.of(107, 108));

            return UserSurveyRequest.of(questions, photoSelections);
        }

    }