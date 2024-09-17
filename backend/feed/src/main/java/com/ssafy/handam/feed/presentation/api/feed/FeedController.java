package com.ssafy.handam.feed.presentation.api.feed;

import static com.ssafy.handam.feed.presentation.api.ApiUtils.success;

import com.ssafy.handam.feed.application.FeedService;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.feed.presentation.request.feed.FeedsByFiltersRequest;
import com.ssafy.handam.feed.presentation.request.feed.RecommendedFeedsForUserRequest;
import com.ssafy.handam.feed.presentation.response.feed.FeedsByFiltersResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @PostMapping("/user/recommended")
    public ApiResult<RecommendedFeedsForUserResponse> getRecommendedFeedsForUser(@RequestBody RecommendedFeedsForUserRequest request) {
        return success(feedService.getBestFeedsForUser(
                RecommendedFeedsForUserServiceRequest.of(request.userId(), request.page(), request.size())));
    }

    @PostMapping("/filter")
public ApiResult<FeedsByFiltersResponse> getFeedsByFilters(@RequestBody FeedsByFiltersRequest request) {
    return success(feedService.getFeedsByFilters(FeedsByFiltersRequest.toServiceRequest(
        request.placeType(),
        request.ageRange(),
        request.gender(),
        request.latitude(),
        request.longitude(),
        request.keyword(),
        request.sortBy(),
        request.page(),
        request.size()
    )));
}
}
