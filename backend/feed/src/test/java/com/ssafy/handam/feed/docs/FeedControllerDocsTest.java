package com.ssafy.handam.feed.docs;

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

import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.presentation.request.feed.FeedCreationRequest;
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

class FeedControllerDocsTest extends RestDocsSupport {

    @DisplayName("사용자 맞춤형 피드 조회 API")
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

        given(feedService.getRecommendedFeedsForUser(any())).willReturn(response);

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

    @DisplayName("좋아요 API")
    @Test
    void likeFeedTest() throws Exception {

        FeedLikeResponse response = new FeedLikeResponse(1L, true, 1);

        given(feedService.likeFeed(any(Long.class), any(Long.class))).willReturn(response);

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/feeds/like/{feedId}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .param("userId", "1")
                )
                .andExpect(status().isOk())
                .andDo(document("like-feed",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.likeCount").type(JsonFieldType.NUMBER)
                                        .description("좋아요 수"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("피드 상세 보기 API")
    @Test
    void getFeedDetailDocsTest() throws Exception {

        FeedDetailResponse feedDetailResponse = new FeedDetailResponse(
                1L,
                1L,
                "username",
                "http://example.com/profile.jpg",
                "http://example.com/feed.jpg",
                "Test Title",
                "Test Content",
                "Test Address",
                127.123123,
                32.1323,
                "CAFE",
                0
        );

        given(feedService.getFeedDetails(any(Long.class))).willReturn(feedDetailResponse);

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/v1/feeds/{feedId}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .pathInfo("/1")
                )
                .andExpect(status().isOk())
                .andDo(document("get-feed-detail",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feedImageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.likeCount").type(JsonFieldType.NUMBER)
                                        .description("좋아요 수"),
                                fieldWithPath("response.username").type(JsonFieldType.STRING)
                                        .description("사용자 닉네임"),
                                fieldWithPath("response.profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("장소 내용"),
                                fieldWithPath("response.address").type(JsonFieldType.STRING)
                                        .description("장소 주소"),
                                fieldWithPath("response.latitude").type(JsonFieldType.NUMBER)
                                        .description("위도"),
                                fieldWithPath("response.longitude").type(JsonFieldType.NUMBER)
                                        .description("경도"),
                                fieldWithPath("response.placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("피드 생성 API")
    @Test
    void createFeedTest() throws Exception {
        FeedCreationRequest request = FeedCreationRequest.builder()
                .userId(1L)
                .title("Test Title")
                .content("Test Content")
                .feedImageUrl("http://example.com/feed.jpg")
                .address("Test Address")
                .longitude(127.123123)
                .latitude(32.1323)
                .placeType(PlaceType.CAFE)
                .build();

        FeedResponse response = new FeedResponse(
                1L,
                1L,
                "testUser",
                "http://example.com/profile.jpg",
                "Test Title",
                "Test Content",
                "http://example.com/feed.jpg",
                "Test Address",
                127.123123,
                32.1323,
                "CAFE",
                0
        );

        given(feedService.createFeed(any())).willReturn(response);

        String requestBody = objectMapper.writeValueAsString(request);

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/feeds/create")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                )
                .andExpect(status().isOk())
                .andDo(document("create-feed",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("feedImageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("address").type(JsonFieldType.STRING)
                                        .description("피드 주소"),
                                fieldWithPath("longitude").type(JsonFieldType.NUMBER)
                                        .description("피드 경도"),
                                fieldWithPath("latitude").type(JsonFieldType.NUMBER)
                                        .description("피드 위도"),
                                fieldWithPath("placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feedImageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.userProfileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.address").type(JsonFieldType.STRING)
                                        .description("피드 주소"),
                                fieldWithPath("response.likeCount").type(JsonFieldType.NUMBER)
                                        .description("좋아요 수"),
                                fieldWithPath("response.username").type(JsonFieldType.STRING)
                                        .description("사용자 닉네임"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING).
                                        description("장소 이름"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("장소 주소"),
                                fieldWithPath("response.latitude").type(JsonFieldType.NUMBER)
                                        .description("위도"),
                                fieldWithPath("response.longitude").type(JsonFieldType.NUMBER)
                                        .description("경도"),
                                fieldWithPath("response.placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("좋아요 취소 API")
    @Test
    void unlikeFeedTest() throws Exception {

        FeedLikeResponse response = new FeedLikeResponse(1L, true, 1);

        given(feedService.unlikeFeed(any(Long.class), any(Long.class))).willReturn(response);

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/v1/feeds/unlike/{feedId}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .param("userId", "1")
                )
                .andExpect(status().isOk())
                .andDo(document("like-feed",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.likeCount").type(JsonFieldType.NUMBER)
                                        .description("좋아요 수"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }
}

