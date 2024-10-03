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
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardCommentDto;
import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentResponse;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentsResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
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

    @Test
    @DisplayName("동행 게시글 댓글 조회")
    void getCommentsByAccompanyBoardArticleIdTest() throws Exception {
        AccompanyBoardCommentDto accompanyBoardCommentDto = new AccompanyBoardCommentDto(
                1L,
                1L,
                1L,
                "http://example.com/profile.jpg",
                "김민주",
                "testContent"
        );

        Long requestId = 1L;

        AccompanyBoardCommentsResponse response = AccompanyBoardCommentsResponse.of(List.of(accompanyBoardCommentDto));

        given(accompanyBoardCommentService.getCommentsByAccompanyBoardArticleId(requestId)).willReturn(response);

        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/accompanyboards/comments/{accompanyBoardArticleId}", requestId)
        )
                .andExpect(status().isOk())
                .andDo(document("get-comments-by-accompanyboard-article-id",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("accompanyBoardArticleId").description("동행 게시글 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.comments[].id").type(JsonFieldType.NUMBER)
                                        .description("댓글 ID"),
                                fieldWithPath("response.comments[].userId").type(JsonFieldType.NUMBER)
                                        .description("댓글 작성자 ID"),
                                fieldWithPath("response.comments[].accompanyBoardArticleId").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.comments[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("작성자 프로필 사진 경로"),
                                fieldWithPath("response.comments[].name").type(JsonFieldType.STRING)
                                        .description("작성자 이름"),
                                fieldWithPath("response.comments[].content").type(JsonFieldType.STRING)
                                        .description("댓글 내용"),
                                fieldWithPath("error").description("에러 메시지")
                        )));
    }
}
