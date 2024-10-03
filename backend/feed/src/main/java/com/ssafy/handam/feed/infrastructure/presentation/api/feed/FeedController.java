package com.ssafy.handam.feed.infrastructure.presentation.api.feed;

import com.ssafy.handam.feed.application.CommentService;
import com.ssafy.handam.feed.application.FeedService;
import com.ssafy.handam.feed.application.LikeService;
import com.ssafy.handam.feed.application.dto.request.comment.CreateCommentServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.infrastructure.presentation.api.ApiUtils;
import com.ssafy.handam.feed.infrastructure.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.feed.infrastructure.presentation.request.comment.CreateCommentRequest;
import com.ssafy.handam.feed.infrastructure.presentation.request.feed.FeedCreationRequest;
import com.ssafy.handam.feed.infrastructure.presentation.response.comment.CreateCommentResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.CommentsResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.CreatedFeedsByUserResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.LikedFeedsByUserResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.RecommendedFeedsForUserResponse;
import com.ssafy.handam.feed.infrastructure.presentation.response.feed.SearchedFeedsResponse;
import com.ssafy.handam.feed.infrastructure.presentation.request.feed.RecommendedFeedsForUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/v1/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;
    private final LikeService likeService;
    private final CommentService commentService;

    @PostMapping("/user/recommended")
    public ApiResult<RecommendedFeedsForUserResponse> getRecommendedFeedsForUser(
            @CookieValue(value = "accessToken", required = false) String token,
            @RequestBody RecommendedFeedsForUserRequest request) {
        return ApiUtils.success(feedService.getRecommendedFeedsForUser(
                RecommendedFeedsForUserRequest.toServiceRequest(request)
        ));
    }

    @GetMapping("/search")
    public ApiResult<SearchedFeedsResponse> searchFeeds(
            @CookieValue(value = "accessToken", required = false) String token,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ApiUtils.success(feedService.searchFeedsByKeywordSortedByLikeCount(keyword, page, size, token));
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResult<FeedResponse> createFeed(
            @CookieValue(value = "accessToken", required = false) String token,
            @RequestPart("data") FeedCreationRequest request,
            @RequestPart("image") MultipartFile imageFile) {

        String savedImagePath = feedService.saveImage(imageFile);

        FeedCreationServiceRequest serviceRequest = FeedCreationRequest.toServiceRequest(request);

        return ApiUtils.success(feedService.createFeed(serviceRequest, savedImagePath , token));
    }

    @GetMapping("/{feedId}")
    public ApiResult<FeedDetailResponse> getFeedDetails(
            @CookieValue(value = "accessToken", required = false) String token, @PathVariable Long feedId) {
        return ApiUtils.success(feedService.getFeedDetails(feedId , token));
    }

    @PostMapping("/like/{feedId}")
    public ApiResult<FeedLikeResponse> likeFeed(@CookieValue(value = "accessToken", required = false) String token,
                                                @PathVariable Long feedId, @RequestParam Long userId) {
        return ApiUtils.success(feedService.likeFeed(feedId, userId));
    }

    @PostMapping("/unlike/{feedId}")
    public ApiResult<FeedLikeResponse> unlikeFeed(@CookieValue(value = "accessToken", required = false) String token,
                                                  @PathVariable Long feedId, @RequestParam Long userId) {
        return ApiUtils.success(feedService.unlikeFeed(feedId, userId));
    }

    @GetMapping("/liked")
    public ApiResult<LikedFeedsByUserResponse> getLikedByUser(
            @CookieValue(value = "accessToken", required = false) String token, Pageable pageable,
            @RequestParam Long userId) {
        return ApiUtils.success(feedService.getLikedFeedsByUser(userId, pageable, token));
    }

    @GetMapping("/users/created")
    public ApiResult<CreatedFeedsByUserResponse> getCreatedFeedsByUser(
            @CookieValue(value = "accessToken", required = false) String token, Pageable pageable,
            @RequestParam Long userId) {
        return ApiUtils.success(feedService.getCreatedFeedsByUser(userId, pageable, token));
    }

    @PostMapping("/liked/{feedId}")
    public void test(@PathVariable Long feedId, @RequestParam Long userId) {
        likeService.sendLikeEvent(feedId, userId, "NAUP");
    }

    @PostMapping("/hadoopTest")
    public void hadoopTest(@RequestPart("image") MultipartFile imageFile) {
        feedService.saveImage(imageFile);
    }

    @PostMapping("/{feedId}/comments")
    public ApiResult<CreateCommentResponse> createComment(
            @CookieValue(name = "accessToken", required = false) String accessToken,
            @PathVariable Long feedId,
            @RequestBody CreateCommentRequest request) {
        return ApiUtils.success(commentService.save(CreateCommentServiceRequest.of(feedId, request)));
    }

    @GetMapping("/{feedId}/comments")
    public ApiResult<CommentsResponse> getComments(
            @CookieValue(name = "accessToken", required = false) String accessToken,
            @PathVariable Long feedId) {
        return ApiUtils.success(commentService.findAllByFeedId(feedId , accessToken));
    }
}

