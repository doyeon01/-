package com.ssafy.handam.feed.presentation.api.feed;

import static com.ssafy.handam.feed.presentation.api.ApiUtils.success;

import com.ssafy.handam.feed.application.FeedService;
import com.ssafy.handam.feed.application.dto.request.feed.BestFeedsForUserServiceRequest;
import com.ssafy.handam.feed.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.feed.presentation.request.feed.BestFeedsForUserRequest;
import com.ssafy.handam.feed.presentation.response.feed.BestFeedsForUserResponse;
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

    @PostMapping("/user/best-feeds")
    public ApiResult<BestFeedsForUserResponse> getBestFeedsForUser(@RequestBody BestFeedsForUserRequest request) {
        return success(feedService.getBestFeedsForUser(
                BestFeedsForUserServiceRequest.of(request.userId(), request.page(), request.size())));
    }
}
