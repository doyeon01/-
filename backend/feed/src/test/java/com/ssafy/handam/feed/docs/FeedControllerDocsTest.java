package com.ssafy.handam.feed.docs;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.cookies.CookieDocumentation.cookieWithName;
import static org.springframework.restdocs.cookies.CookieDocumentation.requestCookies;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.feed.application.dto.CommentDto;
import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.request.comment.CreateCommentServiceRequest;
import com.ssafy.handam.feed.application.dto.response.comment.CreateCommentServiceResponse;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.presentation.request.comment.CreateCommentRequest;
import com.ssafy.handam.feed.presentation.request.feed.FeedCreationRequest;
import com.ssafy.handam.feed.presentation.response.cluster.ClusterResponse;
import com.ssafy.handam.feed.presentation.response.comment.CreateCommentResponse;
import com.ssafy.handam.feed.presentation.response.feed.CommentsResponse;
import com.ssafy.handam.feed.presentation.response.feed.CreatedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.LikedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.NearbyClusterCenterResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.SearchedFeedsResponse;
import jakarta.servlet.http.Cookie;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;

class FeedControllerDocsTest extends RestDocsSupport {

    @DisplayName("사용자 맞춤형 피드 조회 API")
    @Test
    void getRecommendedFeedsForUser() throws Exception {
        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();

        RecommendedFeedsForUserResponse response = RecommendedFeedsForUserResponse.of(List.of(feedPreviewDto), 1, true);

        given(feedService.getRecommendedFeedsForUser(any())).willReturn(response);

        String requestBody = """
                    {
                        "userId": 1,
                        "page": 1,
                        "size": 10
                    }
                """;

        mockMvc.perform(
                        post("/api/v1/feeds/user/recommended")
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
                                fieldWithPath("response.feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response.feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response.feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지 번호"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("피드 검색 API")
    @Test
    void getFeedsByFilters() throws Exception {

        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();

        SearchedFeedsResponse response = SearchedFeedsResponse.of(List.of(feedPreviewDto), 0, false);

        given(feedService.searchFeedsByKeywordSortedByLikeCount(anyString(), anyInt(), anyInt(), any())).willReturn(
                response);

        mockMvc.perform(
                        get("/api/v1/feeds/search")
                                .param("keyword", "coffee")
                                .param("page", "0")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("get-feeds-by-filter",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("keyword").description("검색어"),
                                parameterWithName("page").description("페이지 번호 (0부터 시작)"),
                                parameterWithName("size").description("페이지 당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response.feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response.feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지 번호"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
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
                        post("/api/v1/feeds/like/{feedId}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .queryParam("userId", "1")
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
                "nickName",
                "http://example.com/profile.jpg",
                "http://example.com/feed.jpg",
                "Test Title",
                "Test Content",
                "Test Address1",
                "Test Address2",
                127.123123,
                32.1323,
                "CAFE",
                0,
                false
        );

        given(feedService.getFeedDetails(any(Long.class), any())).willReturn(feedDetailResponse);

        mockMvc.perform(
                        get("/api/v1/feeds/{feedId}", 1)
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
                                fieldWithPath("response.nickName").type(JsonFieldType.STRING)
                                        .description("사용자 닉네임"),
                                fieldWithPath("response.profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("장소 내용"),
                                fieldWithPath("response.address1").type(JsonFieldType.STRING)
                                        .description("장소 주소"),
                                fieldWithPath("response.address2").type(JsonFieldType.STRING)
                                        .description("장소 주소"),
                                fieldWithPath("response.latitude").type(JsonFieldType.NUMBER)
                                        .description("위도"),
                                fieldWithPath("response.longitude").type(JsonFieldType.NUMBER)
                                        .description("경도"),
                                fieldWithPath("response.placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response.isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("피드 생성 API")
    @Test
    void createFeedTest() throws Exception {
        FeedCreationRequest request = FeedCreationRequest.builder()
                .scheduleId(1L)
                .userId(1L)
                .title("Test Title")
                .content("Test Content")
                .address1("Test Address")
                .address2("Test Address")
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
                "Test Address1",
                "Test Address2",
                127.123123,
                32.1323,
                "CAFE",
                0
        );

        given(feedService.createFeed(any(), any(), any())).willReturn(response);

        // JSON 데이터 파트 생성
        String requestBody = objectMapper.writeValueAsString(request);
        MockMultipartFile data = new MockMultipartFile("data", "", "application/json", requestBody.getBytes());

        // 이미지 파일 파트 생성
        MockMultipartFile image = new MockMultipartFile("image", "image.jpg", "image/jpeg", "test image".getBytes());

        mockMvc.perform(
                        multipart("/api/v1/feeds/create")
                                .file(data) // JSON 데이터
                                .file(image) // 이미지 파일
                                .contentType(MediaType.MULTIPART_FORM_DATA) // Content-Type 설정
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("create-feed",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParts(
                                partWithName("data").description("피드 생성 요청 데이터"),
                                partWithName("image").description("피드 이미지 파일")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feedImageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.address1").type(JsonFieldType.STRING)
                                        .description("피드 주소"),
                                fieldWithPath("response.address2").type(JsonFieldType.STRING)
                                        .description("피드 주소"),
                                fieldWithPath("response.likeCount").type(JsonFieldType.NUMBER)
                                        .description("좋아요 수"),
                                fieldWithPath("response.nickName").type(JsonFieldType.STRING)
                                        .description("사용자 닉네임"),
                                fieldWithPath("response.title").type(JsonFieldType.STRING).
                                        description("장소 이름"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("장소 내용"),
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
                        post("/api/v1/feeds/unlike/{feedId}", 1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .queryParam("userId", "1")
                )
                .andExpect(status().isOk())
                .andDo(document("unlike-feed",
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

    @DisplayName("사용자가 좋아요한 피드 조회 API")
    @Test
    void getLikedFeedsByUserTest() throws Exception {
        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();

        LikedFeedsByUserResponse response = LikedFeedsByUserResponse.of(List.of(feedPreviewDto), 0, false);

        given(feedService.getLikedFeedsByUser(any(), any(), any())).willReturn(response);

        mockMvc.perform(
                        get("/api/v1/feeds/liked")
                                .param("userId", "1")
                                .param("page", "0")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("get-liked-feeds-by-user",
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("userId").description("사용자 ID"),
                                parameterWithName("page").description("조회할 페이지 번호"),
                                parameterWithName("size").description("페이지당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response.feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response.feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지 번호"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("유저가 생성한 피드 목록 조회 API")
    @Test
    void getCreatedFeedsByUserTest() throws Exception {
        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();

        CreatedFeedsByUserResponse response = CreatedFeedsByUserResponse.of(List.of(feedPreviewDto), 0, false);

        given(feedService.getCreatedFeedsByUser(any(), any(), any())).willReturn(response);

        mockMvc.perform(
                        get("/api/v1/feeds/users/created")
                                .cookie(new Cookie("accessToken", "token"))
                                .param("userId", "1")
                                .param("page", "0")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("get-created-feeds-by-user",
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("userId").description("사용자 ID"),
                                parameterWithName("page").description("조회할 페이지 번호"),
                                parameterWithName("size").description("페이지당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response.feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].placeType").type(JsonFieldType.STRING)
                                        .description(
                                                "장소 타입 (CAFE, RESTAURANT, ACCOMMODATION, TOURIST_ATTRACTION, ETC 또는 null 가능)"),
                                fieldWithPath("response.feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지 번호"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("댓글 생성 API")
    @Test
    void createCommentTest() throws Exception {
        // given
        Long feedId = 1L;
        Long userId = 1L;
        String content = "댓글 내용";

        // Create the request DTO
        CreateCommentRequest createCommentRequest = new CreateCommentRequest(userId, content);

        // Create the expected response
        CreateCommentServiceResponse serviceResponse = new CreateCommentServiceResponse(userId, content);
        CreateCommentResponse response = CreateCommentResponse.from(serviceResponse);

        // Mock the service layer
        given(commentService.save(any(CreateCommentServiceRequest.class))).willReturn(response);

        // Serialize the request DTO to JSON
        String requestJson = objectMapper.writeValueAsString(createCommentRequest);

        // then
        mockMvc.perform(
                        post("/api/v1/feeds/{feedId}/comments", feedId)
                                .cookie(new Cookie("accessToken", "token"))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .content(requestJson)  // 요청 본문에 JSON 추가
                )
                .andExpect(status().isOk())
                .andDo(document("create-comment",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("feedId").description("피드 ID")
                        ),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        requestFields(
                                fieldWithPath("userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("content").type(JsonFieldType.STRING)
                                        .description("댓글 내용")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.content").type(JsonFieldType.STRING)
                                        .description("댓글 내용"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("댓글 조회 API")
    @Test
    void getCommentsTest() throws Exception {
        // given
        CommentDto commentDto = new CommentDto(1L, 1L, 1L, "content", "nickName", "profileImageUrl",
                LocalDateTime.now());
        CommentsResponse response = CommentsResponse.of(List.of(commentDto));
        // when
        given(commentService.findAllByFeedId(any(), any())).willReturn(response);

        // then
        mockMvc.perform(
                        get("/api/v1/feeds/{feedId}/comments", 1)
                                .cookie(new Cookie("accessToken", "token"))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andDo(document("get-comments",
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("feedId").description("피드 ID")
                        ),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.comments[].id").type(JsonFieldType.NUMBER)
                                        .description("댓글 ID"),
                                fieldWithPath("response.comments[].feedId").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.comments[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.comments[].content").type(JsonFieldType.STRING)
                                        .description("댓글 내용"),
                                fieldWithPath("response.comments[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.comments[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.comments[].createdDate").type(JsonFieldType.STRING)
                                        .description("댓글 생성일자"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("좋아요 군집화 API")
    @Test
    void getFeedClusterTest() throws Exception {
        // given
        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();
        List<FeedPreviewDto> feedPreviewDtos = List.of(feedPreviewDto);
        ClusterResponse response = ClusterResponse.of(UUID.randomUUID().toString(), 37.7749, 122.4194, feedPreviewDtos);

        // when
        given(feedService.getClusteredFeeds(any(), any())).willReturn(List.of(response));

        // then
        mockMvc.perform(
                        get("/api/v1/feeds/like/clustering")
                                .cookie(new Cookie("accessToken", "token"))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .queryParam("userId", "1")
                )
                .andExpect(status().isOk())
                .andDo(document("get-feed-cluster",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        queryParameters(
                                parameterWithName("userId").description("사용자 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response[].clusterId").type(JsonFieldType.STRING)
                                        .description("군집 ID"),
                                fieldWithPath("response[].latitude").type(JsonFieldType.NUMBER)
                                        .description("위도"),
                                fieldWithPath("response[].longitude").type(JsonFieldType.NUMBER)
                                        .description("경도"),
                                fieldWithPath("response[].feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response[].feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response[].feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response[].feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response[].feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response[].feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response[].feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response[].feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response[].feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response[].feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response[].feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response[].feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response[].feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response[].feeds[].placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response[].feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response[].feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response[].feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response[].feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("좋아요 군집화 새로고침 API")
    @Test
    void getFeedClusterRefreshTest() throws Exception {
        // given
        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();
        List<FeedPreviewDto> feedPreviewDtos = List.of(feedPreviewDto);
        ClusterResponse response = ClusterResponse.of(UUID.randomUUID().toString(), 37.7749, 122.4194, feedPreviewDtos);

        // when
        given(feedService.refreshClusteredFeeds(any(), any())).willReturn(List.of(response));

        // then
        mockMvc.perform(
                        get("/api/v1/feeds/like/clustering/refresh")
                                .cookie(new Cookie("accessToken", "token"))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .queryParam("userId", "1")
                )
                .andExpect(status().isOk())
                .andDo(document("get-feed-cluster-refresh",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestCookies(
                                cookieWithName("accessToken").description("인증을 위한 액세스 토큰")
                        ),
                        queryParameters(
                                parameterWithName("userId").description("사용자 ID")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response[].clusterId").type(JsonFieldType.STRING)
                                        .description("군집 ID"),
                                fieldWithPath("response[].latitude").type(JsonFieldType.NUMBER)
                                        .description("위도"),
                                fieldWithPath("response[].longitude").type(JsonFieldType.NUMBER)
                                        .description("경도"),
                                fieldWithPath("response[].feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response[].feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response[].feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response[].feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response[].feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response[].feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response[].feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response[].feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response[].feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response[].feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response[].feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response[].feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response[].feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response[].feeds[].placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response[].feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response[].feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response[].feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response[].feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }

    @DisplayName("거리기반 피드 조회 API")
    @Test
    void getNearbyClusterCenterTest() throws Exception {

        FeedPreviewDto feedPreviewDto = getFeedPreviewDto();

        NearbyClusterCenterResponse response = NearbyClusterCenterResponse.of(List.of(feedPreviewDto), 0, false);

        given(feedService.getNearbyClusterCenter(any())).willReturn(response);

        mockMvc.perform(
                        get("/api/v1/feeds/cluster/center/nearby")
                                .param("latitude", "37.7749")
                                .param("longitude", "122.4194")
                                .param("distance", "10")
                                .param("page", "0")
                                .param("size", "10")
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                                .cookie(new Cookie("accessToken", "token"))
                )
                .andExpect(status().isOk())
                .andDo(document("get-nearby-cluster-center",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("latitude").description("위도"),
                                parameterWithName("longitude").description("경도"),
                                parameterWithName("distance").description("거리"),
                                parameterWithName("page").description("페이지 번호 (0부터 시작)"),
                                parameterWithName("size").description("페이지 당 항목 수")
                        ),
                        responseFields(
                                fieldWithPath("success").description("성공 여부"),
                                fieldWithPath("response.feeds[].id").type(JsonFieldType.NUMBER)
                                        .description("피드 ID"),
                                fieldWithPath("response.feeds[].totalPlanId").type(JsonFieldType.NUMBER)
                                        .description("일정 ID"),
                                fieldWithPath("response.feeds[].placeName").type(JsonFieldType.STRING)
                                        .description("장소 이름"),
                                fieldWithPath("response.feeds[].userId").type(JsonFieldType.NUMBER)
                                        .description("사용자 ID"),
                                fieldWithPath("response.feeds[].imageUrl").type(JsonFieldType.STRING)
                                        .description("피드 이미지 URL"),
                                fieldWithPath("response.feeds[].title").type(JsonFieldType.STRING)
                                        .description("피드 제목"),
                                fieldWithPath("response.feeds[].content").type(JsonFieldType.STRING)
                                        .description("피드 내용"),
                                fieldWithPath("response.feeds[].likeCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 좋아요 수"),
                                fieldWithPath("response.feeds[].commentCount").type(JsonFieldType.NUMBER)
                                        .description("피드의 댓글 수"),
                                fieldWithPath("response.feeds[].address1").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].address2").type(JsonFieldType.STRING)
                                        .description("피드의 주소"),
                                fieldWithPath("response.feeds[].longitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 경도"),
                                fieldWithPath("response.feeds[].latitude").type(JsonFieldType.NUMBER)
                                        .description("피드의 위도"),
                                fieldWithPath("response.feeds[].placeType").type(JsonFieldType.STRING)
                                        .description("장소 타입"),
                                fieldWithPath("response.feeds[].nickName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("response.feeds[].profileImageUrl").type(JsonFieldType.STRING)
                                        .description("사용자 프로필 이미지 URL"),
                                fieldWithPath("response.feeds[].isLiked").type(JsonFieldType.BOOLEAN)
                                        .description("좋아요 여부"),
                                fieldWithPath("response.feeds[].createdDate").type(JsonFieldType.STRING)
                                        .description("피드 생성일자"),
                                fieldWithPath("response.currentPage").type(JsonFieldType.NUMBER)
                                        .description("현재 페이지 번호"),
                                fieldWithPath("response.hasNextPage").type(JsonFieldType.BOOLEAN)
                                        .description("다음 페이지 존재 여부"),
                                fieldWithPath("error").description("에러 메시지")
                        )
                ));
    }


    private static FeedPreviewDto getFeedPreviewDto() {
        return new FeedPreviewDto(
                1L,
                1L,
                "placeName",
                "title",
                "content",
                "imageUrl",
                1L,
                10,
                0,
                "123 Main Street",
                "123 Main Street2",
                37.7749,
                122.4194,
                "CAFE",
                "nickName",
                "profile-image-url",
                true,
                LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        );
    }


}