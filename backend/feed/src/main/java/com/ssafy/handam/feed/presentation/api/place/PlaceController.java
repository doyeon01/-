package com.ssafy.handam.feed.presentation.api.place;

import static com.ssafy.handam.feed.presentation.api.ApiUtils.success;

import com.ssafy.handam.feed.application.PlaceService;
import com.ssafy.handam.feed.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.feed.presentation.response.place.PlaceDetailResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/place")
@RequiredArgsConstructor
public class PlaceController {


    private final PlaceService placeService;

    @GetMapping("/{id}")
    public ApiResult<PlaceDetailResponse> getPlaceDetail(@NotNull @PathVariable Long id) {
        PlaceDetailResponse response = placeService.getPlaceDetail(id);
        return success(response);
    }
}