package com.ssafy.handam.accompanyboard.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
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
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticleDetailDto;
import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardArticlePreviewDto;
import com.ssafy.handam.accompanyboard.presentation.request.article.AccompanyBoardArticleCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticleDetailResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByTitleResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesByUserResponse;
import com.ssafy.handam.accompanyboard.presentation.response.article.AccompanyBoardArticlesResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

public class AccompanyBoardArticleControllerDocsTest extends RestDocsSupport {

    @Test
    @DisplayName("동행 게시판 게시글 등록 API")
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
                                        .description("작성자 ID"),
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

    @Test
    @DisplayName("동행 게시글 전체 조회 API")
    void getArticlesTest() throws Exception {
        AccompanyBoardArticlePreviewDto accompanyBoardArticlePreviewDto = new AccompanyBoardArticlePreviewDto(
                1L,
                1L,
                1L,
                "testTitle"
        );

        AccompanyBoardArticlesResponse response = AccompanyBoardArticlesResponse.of(List.of(accompanyBoardArticlePreviewDto));

        given(accompanyBoardArticleService.getArticles()).willReturn(response);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/accompanyboards/articles")
        )
                .andExpect(status().isOk())
                .andDo(document("get-articles",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.articles[].id").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.articles[].userId").type(JsonFieldType.NUMBER)
                                        .description("작성자 ID"),
                                fieldWithPath("response.articles[].scheduleId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.articles[].title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @Test
    @DisplayName("특정 동행 게시글 조회 API")
    void getArticleDetailsTest() throws Exception {
        AccompanyBoardArticleDetailDto accompanyBoardArticleDetailDto = new AccompanyBoardArticleDetailDto(
                1L,
                1L,
                1L,
                "testTitle",
                "testDescription"
        );

        Long requestId = 1L;

        AccompanyBoardArticleDetailResponse response = AccompanyBoardArticleDetailResponse.of(accompanyBoardArticleDetailDto);

        given(accompanyBoardArticleService.getArticleDetails(requestId)).willReturn(response);

        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/accompanyboards/articles/{articleId}", requestId)
        )
                .andExpect(status().isOk())
                .andDo(document("get-article-details",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("articleId").description("동행 게시글 ID") // 경로 변수 문서화
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("작성자 ID"),
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

    @Test
    @DisplayName("특정 사용자가 작성한 전체 동행 게시글 조회 API")
    void getArticlesByUserTest() throws Exception {
        AccompanyBoardArticleDetailDto accompanyBoardArticleDetailDto = new AccompanyBoardArticleDetailDto(
                1L,
                1L,
                1L,
                "testTitle",
                "testDescription"
        );

        Long requestUserId = 1L;

        AccompanyBoardArticlesByUserResponse response = AccompanyBoardArticlesByUserResponse.of(List.of(accompanyBoardArticleDetailDto));

        given(accompanyBoardArticleService.getArticlesByUser(requestUserId)).willReturn(response);

        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/accompanyboards/articles/user/{userId}", requestUserId)
        )
                .andExpect(status().isOk())
                .andDo(document("get-articles-by-user",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("userId").description("사용자 ID") // 경로 변수 문서화
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.articles[].id").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.articles[].userId").type(JsonFieldType.NUMBER)
                                        .description("작성자 ID"),
                                fieldWithPath("response.articles[].scheduleId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.articles[].title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.articles[].description").type(JsonFieldType.STRING)
                                        .description("동행 게시글 내용"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));

    }

    @Test
    @DisplayName("제목 검색 조회 API")
    void getArticlesByTitleTest() throws Exception {
        AccompanyBoardArticlePreviewDto accompanyBoardArticlePreviewDto = new AccompanyBoardArticlePreviewDto(
                1L,
                1L,
                1L,
                "testTitle"
        );

        AccompanyBoardArticlesByTitleResponse response = AccompanyBoardArticlesByTitleResponse.of(List.of(accompanyBoardArticlePreviewDto));

        given(accompanyBoardArticleService.getArticlesByTitle(anyString())).willReturn(response);

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/v1/accompanyboards/articles/search")
                                .param("title", "검색제목")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andDo(document("get-articles-by-title",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("title").description("검색 제목")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.articles[].id").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.articles[].userId").type(JsonFieldType.NUMBER)
                                        .description("작성자 ID"),
                                fieldWithPath("response.articles[].scheduleId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.articles[].title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }
}
