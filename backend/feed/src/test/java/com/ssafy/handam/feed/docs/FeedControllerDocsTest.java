package com.ssafy.handam.feed.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

class FeedControllerDocsTest extends RestDocsSupport {

    @DisplayName("사용자 맞춤형 Best 피드 조회 API")
    @Test
    void getRecommendedFeedsForUser() throws Exception {
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(
                1L,
                "title",
                "image-url",
                1L,
                10,
                "123 Main Street",
                37.7749,
                122.4194,
                "username",
                "profile-image-url"
        );
        RecommendedFeedsForUserResponse response = RecommendedFeedsForUserResponse.of(List.of(feedPreviewDto));

        given(feedService.getBestFeedsForUser(any())).willReturn(response);

        String requestBody = """
                    {
                        "userId": 1,
                        "page": 1,
                        "size": 10
                    }
                """;

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/feeds/user/recommended")
                                .content(requestBody)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("recommended-feeds-for-user",
                        preprocessRequest(prettyPrint()),  // 요청 본문 정
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").description("사용자 ID"),
                                fieldWithPath("page").description("조회할 페이지 번호"),
                                fieldWithPath("size").description("페이지당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].address").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].username").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].userProfileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("필터링된 피드 조회 API")
    @Test
    void getFeedsByFilters() throws Exception {

        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(
                1L,
                "title",
                "image-url",
                1L,
                10,
                "123 Main Street",
                37.7749,
                122.4194,
                "username",
                "profile-image-url"
        );
        FeedsByFiltersResponse response = FeedsByFiltersResponse.of(List.of(feedPreviewDto));

        given(feedService.getFeedsByFilters(any())).willReturn(response);

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/feeds/filter")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content("""
                                            {
                                                "placeType": "CAFE",
                                                "ageRange": 20,
                                                "gender": "MALE",
                                                "latitude": 37.7749,
                                                "longitude": 122.4194,
                                                "keyword": "coffee",
                                                "sortBy": ["likeCount", "distance"],
                                                "page": 0,
                                                "size": 10
                                            }
                                        """)
                )
                .andExpect(status().isOk())
                .andDo(document("get-feeds-by-filter",
                        preprocessRequest(prettyPrint()),  // 요청 본문을 보기 좋게 출력
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("placeType").type(JsonFieldType.STRING).optional()
                                        .description(
                                                "장소 타입 (CAFE, RESTAURANT, ACCOMMODATION, TOURIST_ATTRACTION, ETC 또는 null 가능)"),
                                fieldWithPath("ageRange").type(JsonFieldType.NUMBER).optional()
                                        .description("연령대 (10, 20, 30, ... 100 또는 null 가능)"),
                                fieldWithPath("gender").type(JsonFieldType.STRING).optional()
                                        .description("성별 (MALE, FEMALE 또는 null 가능)"),
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER).optional()
                                        .description("위도 (null 가능)"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER).optional()
                                        .description("경도 (null 가능)"),
                                fieldWithPath("keyword").type(JsonFieldType.STRING).optional()
                                        .description("검색어 (null 가능)"),
                                fieldWithPath("sortBy").type(JsonFieldType.ARRAY).optional()
                                        .description("정렬 기준 (likeCount , distance 는 위도 경도 있을 때"),
                                fieldWithPath("page").type(JsonFieldType.NUMBER)
                                        .description("페이지 번호 (0부터 시작)"),
                                fieldWithPath("size").type(JsonFieldType.NUMBER)
                                        .description("페이지 당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].address").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].username").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].userProfileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }
}

