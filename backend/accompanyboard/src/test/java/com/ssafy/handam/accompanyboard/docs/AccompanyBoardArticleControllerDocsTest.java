package com.ssafy.handam.accompanyboard.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class AccompanyBoardArticleControllerDocsTest extends RestDocsSupport {

    @DisplayName("동행 게시판 게시글 등록 API")
    @Test
    void createArticleTest() throws Exception {
        AccompanyBoardArticleCreationRequest request = new AccompanyBoardArticleCreationRequest(
                1L,
                1L,
                "testTitle",
                "testDescription"
        );

        AccompanyBoardArticleDetailResponse response = new AccompanyBoardArticleDetailResponse(
                1L,
                1L,
                1L,
                "testTitle",
                "testDescription"
        );

        given(accompanyBoardArticleService.createArticle(any())).willReturn(response);

        String requestBody = objectMapper.writeValueAsString(request);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/accompanyboards/articles/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(requestBody)
                )
                .andExpect(status().isOk())
                .andDo(document("create-article",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("scheduleId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("description").type(JsonFieldType.STRING)
                                        .description("동행 게시글 내용")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.scheduleId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.description").type(JsonFieldType.STRING)
                                        .description("동행 게시글 내용"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

}
