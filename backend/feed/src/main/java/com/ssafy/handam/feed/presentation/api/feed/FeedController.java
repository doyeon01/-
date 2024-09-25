package com.ssafy.handam.feed.presentation.api.feed;

import static com.ssafy.handam.feed.presentation.api.ApiUtils.success;

import com.ssafy.handam.feed.application.FeedService;
import com.ssafy.handam.feed.application.LikeService;
import com.ssafy.handam.feed.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.feed.presentation.request.feed.FeedCreationRequest;
import com.ssafy.handam.feed.presentation.request.feed.FeedsByFiltersRequest;
import com.ssafy.handam.feed.presentation.request.feed.RecommendedFeedsForUserRequest;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;
    private final LikeService likeService;


    @PostMapping("/user/recommended")
    public ApiResult<RecommendedFeedsForUserResponse> getRecommendedFeedsForUser(
            @RequestBody RecommendedFeedsForUserRequest request) {
        return success(feedService.getBestFeedsForUser(
                RecommendedFeedsForUserRequest.toServiceRequest(request)
        ));
    }

    @PostMapping("/filter")
    public ApiResult<FeedsByFiltersResponse> getFeedsByFilters(@RequestBody FeedsByFiltersRequest request) {
        return success(feedService.getFeedsByFilters(FeedsByFiltersRequest.toServiceRequest(request)));
    }

    @PostMapping("/create")
    public ApiResult<FeedResponse> createFeed(@RequestBody FeedCreationRequest request) {
        return success(feedService.createFeed(FeedCreationRequest.toServiceRequest(request)));
    }

    @GetMapping("/{feedId}")
    public ApiResult<FeedResponse> getFeedDetails(@PathVariable Long feedId) {
        return success(feedService.getFeedDetails(feedId));
    }

    @PostMapping("/like")
    public String sendLike(@RequestParam Long userId, @RequestParam Long feedId, @RequestParam String eventType) {
        likeService.sendLikeEvent(userId, feedId, eventType);
        return "Like event sent successfully!";
    }
}
