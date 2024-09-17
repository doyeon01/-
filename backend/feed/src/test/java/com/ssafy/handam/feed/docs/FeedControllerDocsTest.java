package com.ssafy.handam.feed.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.feed.RestDocsSupport;
import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.presentation.response.feed.BestFeedsForUserResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

class FeedControllerDocsTest extends RestDocsSupport {

    @DisplayName("사용자 맞춤형 Best 피드 조회 API")
    @Test
    void getBestFeedsForUser() throws Exception {
        // Mock 응답 생성
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(1L, "image-url", 1L, 10);

        BestFeedsForUserResponse response = BestFeedsForUserResponse.of(List.of(feedPreviewDto));

        // Mock 서비스 호출 설정
        given(feedService.getBestFeedsForUser(any())).willReturn(response);

        // 요청 데이터 생성 (Request Body)
        String requestBody = """
                    {
                        "userId": 1,
                        "page": 1,
                        "size": 10
                    }
                """;

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/feeds/user/best-feeds")
                                .content(requestBody)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("best-feeds-for-user",
                        preprocessRequest(prettyPrint()),  // 요청 본문 정
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").description("사용자 ID"),
                                fieldWithPath("page").description("조회할 페이지 번호"),
                                fieldWithPath("size").description("페이지당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feedsBest[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feedsBest[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feedsBest[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feedsBest[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }
}
