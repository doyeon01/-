package com.ssafy.handam.feed.presentation.api.place;

import static com.ssafy.handam.feed.presentation.api.ApiUtils.success;

import com.ssafy.handam.feed.application.PlaceService;
import com.ssafy.handam.feed.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.feed.presentation.request.place.PlaceDetailRequest;
import com.ssafy.handam.feed.presentation.response.place.PlaceDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping
    public ApiResult<PlaceDetailResponse> getPlaceDetail(PlaceDetailRequest request) {
        return success(placeService.getPlaceDetail(request.toServiceRequest().id()));
    }
}