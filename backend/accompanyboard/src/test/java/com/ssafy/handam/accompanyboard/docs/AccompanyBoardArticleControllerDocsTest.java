package com.ssafy.handam.accompanyboard.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
                "http://example.com/profile.jpg",
                "김민주",
                "testTitle",
                "testDescription",
                "2024-10-02",
                0
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
                                fieldWithPath("totalPlanId").type(JsonFieldType.NUMBER)
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
                                fieldWithPath("response.totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.profileImageUrl").type(JsonFieldType.STRING)
                                        .description("작성자 프로필 사진 경로"),
                                fieldWithPath("response.nickName").type(JsonFieldType.STRING)
                                        .description("작성자 이름"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.description").type(JsonFieldType.STRING)
                                        .description("동행 게시글 내용"),
                                fieldWithPath("response.createdDate").type(JsonFieldType.STRING)
                                        .description("작성 날짜"),
                                fieldWithPath("response.commentCount").type(JsonFieldType.NUMBER)
                                        .description("댓글 수"),
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
                "http://example.com/profile.jpg",
                "김민주",
                "testTitle",
                "2024-10-02"
        );

        AccompanyBoardArticlesResponse response = AccompanyBoardArticlesResponse.of(List.of(accompanyBoardArticlePreviewDto), 0, false);

        Pageable pageable = PageRequest.of(0, 10);

        given(accompanyBoardArticleService.getArticles(pageable)).willReturn(response);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/accompanyboards/articles")
                        .param("page", "0")
                        .param("size", "10")
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
                                fieldWithPath("response.articles[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.articles[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("작성자 프로필 사진 경로"),
                                fieldWithPath("response.articles[].nickName").type(JsonFieldType.STRING)
                                        .description("작성자 이름"),
                                fieldWithPath("response.articles[].title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.articles[].createdDate").type(JsonFieldType.STRING)
                                        .description("작성 날짜"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
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
                "http://example.com/profile.jpg",
                "김민주",
                "testTitle",
                "testDescription",
                "2024-10-02",
                5
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
                                fieldWithPath("response.totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.profileImageUrl").type(JsonFieldType.STRING)
                                        .description("작성자 프로필 사진 경로"),
                                fieldWithPath("response.nickName").type(JsonFieldType.STRING)
                                        .description("작성자 이름"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.description").type(JsonFieldType.STRING)
                                        .description("동행 게시글 내용"),
                                fieldWithPath("response.createdDate").type(JsonFieldType.STRING)
                                        .description("작성 날짜"),
                                fieldWithPath("response.commentCount").type(JsonFieldType.NUMBER)
                                        .description("댓글 수"),
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
                "http://example.com/profile.jpg",
                "김민주",
                "testTitle",
                "testDescription",
                "2024-10-02",
                5
        );

        Long requestUserId = 1L;

        AccompanyBoardArticlesByUserResponse response = AccompanyBoardArticlesByUserResponse.of(List.of(accompanyBoardArticleDetailDto), 0, false);

        Pageable pageable = PageRequest.of(0, 10);

        given(accompanyBoardArticleService.getArticlesByUser(requestUserId, pageable)).willReturn(response);

        mockMvc.perform(
                RestDocumentationRequestBuilders.get("/api/v1/accompanyboards/articles/user/{userId}", requestUserId)
                                        .param("page", "0")
                                        .param("size", "10")
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
                                fieldWithPath("response.articles[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.articles[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("작성자 프로필 사진 경로"),
                                fieldWithPath("response.articles[].nickName").type(JsonFieldType.STRING)
                                        .description("작성자 이름"),
                                fieldWithPath("response.articles[].title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.articles[].description").type(JsonFieldType.STRING)
                                        .description("동행 게시글 내용"),
                                fieldWithPath("response.articles[].createdDate").type(JsonFieldType.STRING)
                                        .description("작성 날짜"),
                                fieldWithPath("response.articles[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("댓글 수"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
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
                "http://example.com/profile.jpg",
                "김민주",
                "testTitle",
                "2024-10-02"
        );

        AccompanyBoardArticlesByTitleResponse response = AccompanyBoardArticlesByTitleResponse.of(List.of(accompanyBoardArticlePreviewDto), 0, false);

        Pageable pageable = PageRequest.of(0, 10);

        given(accompanyBoardArticleService.getArticlesByTitle(anyString(), eq(pageable))).willReturn(response);

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/v1/accompanyboards/articles/search")
                                .param("title", "Title")
                                .param("page", "0")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andDo(document("get-articles-by-title",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("title").description("검색 제목"),
                                parameterWithName("page").description("페이지 번호 (0부터 시작)").optional(),
                                parameterWithName("size").description("게시글 개수").optional()
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.articles[].id").type(JsonFieldType.NUMBER)
                                        .description("동행 게시글 ID"),
                                fieldWithPath("response.articles[].userId").type(JsonFieldType.NUMBER)
                                        .description("작성자 ID"),
                                fieldWithPath("response.articles[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.articles[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("작성자 프로필 사진 경로"),
                                fieldWithPath("response.articles[].nickName").type(JsonFieldType.STRING)
                                        .description("작성자 이름"),
                                fieldWithPath("response.articles[].title").type(JsonFieldType.STRING)
                                        .description("동행 게시글 제목"),
                                fieldWithPath("response.articles[].createdDate").type(JsonFieldType.STRING)
                                        .description("작성 날짜"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }
}
