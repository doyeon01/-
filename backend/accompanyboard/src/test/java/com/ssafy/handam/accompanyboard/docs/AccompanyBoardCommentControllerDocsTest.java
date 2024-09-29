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

import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class AccompanyBoardCommentControllerDocsTest extends RestDocsSupport {

    @Test
    @DisplayName("동행 게시판 댓글 등록 API")
    void createCommentTest() throws Exception {
        AccompanyBoardCommentCreationRequest request = new AccompanyBoardCommentCreationRequest(
                1L,
                1L,
                "testContent"
        );

        AccompanyBoardCommentResponse response = new AccompanyBoardCommentResponse(
                1L,
                1L,
                1L,
                "testContent"
        );

        given(accompanyBoardCommentService.createComment(any())).willReturn(response);

        String requestBody = objectMapper.writeValueAsString(request);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/accompanyboards/comments/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(requestBody)
        )
                .andExpect(status().isOk())
                .andDo(document("create-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("accompanyBoardArticleId").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("content").type(JsonFieldType.STRING)
                                        .description("댓글 내용")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("댓글 ID"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("댓글 작성자 ID"),
                                fieldWithPath("response.accompanyBoardArticleId").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));

    }
}
