package com.ssafy.handam.photocard.presentation.api;

import static com.ssafy.handam.photocard.presentation.api.ApiUtils.success;
import static com.ssafy.handam.photocard.presentation.request.PhotoCardCreationRequest.toServiceRequest;

import com.ssafy.handam.photocard.application.PhotoCardService;
import com.ssafy.handam.photocard.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.photocard.presentation.request.PhotoCardCreationRequest;
import com.ssafy.handam.photocard.presentation.response.PhotoCardDetailResponse;
import com.ssafy.handam.photocard.presentation.response.PhotoCardsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/photocards")
@RequiredArgsConstructor
public class PhotoCardController {

    private final PhotoCardService photoCardService;

    @PostMapping("/create")
    public ApiResult<PhotoCardDetailResponse> createPhotoCard(@RequestBody PhotoCardCreationRequest request) {
        return success(photoCardService.createPhotoCard(toServiceRequest(request)));
    }

    @GetMapping("/detail/{feedId}")
    public ApiResult<PhotoCardDetailResponse> getPhotoCard(@PathVariable Long feedId) {
        return success(photoCardService.getPhotoCard(feedId));
    }

    @GetMapping("/search/{userId}")
    public ApiResult<PhotoCardsResponse> getPhotoCardsByUserId(@PathVariable Long userId,
                                                               @PageableDefault(size = 6) Pageable pageable) {
        return success(photoCardService.getPhotoCardsByUserId(userId, pageable));
    }
}
