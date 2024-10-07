package com.ssafy.handam.photocard.application;

import com.ssafy.handam.photocard.application.dto.PhotoCardDetailDto;
import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import com.ssafy.handam.photocard.domain.service.PhotoCardDomainService;
import com.ssafy.handam.photocard.infrastructure.client.FeedApiClient;
import com.ssafy.handam.photocard.infrastructure.client.GpuApiClient;
import com.ssafy.handam.photocard.infrastructure.client.dto.FeedListDto;
import com.ssafy.handam.photocard.infrastructure.client.dto.PhotoCardUrlDto;
import com.ssafy.handam.photocard.presentation.request.PhotoCardCreationRequest;
import com.ssafy.handam.photocard.presentation.request.PhotoCardCreationToGpuRequest;
import com.ssafy.handam.photocard.presentation.request.PhotoCardSaveRequest;
import com.ssafy.handam.photocard.presentation.response.PhotoCardDetailResponse;
import com.ssafy.handam.photocard.presentation.response.PhotoCardsResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class PhotoCardService {

    private final PhotoCardDomainService photoCardDomainService;
    private final GpuApiClient gpuApiClient;
    private final FeedApiClient feedApiClient;

    public PhotoCardDetailResponse createPhotoCard(PhotoCardCreationRequest request) {


        PhotoCardCreationToGpuRequest gpuRequest = getPhotoCardCreationToGpuRequest(request);
        PhotoCardUrlDto photoCardUrlDto = gpuApiClient.getPhotoCardUrl(gpuRequest);

        PhotoCard photoCard = photoCardDomainService.createPhotoCard(
                PhotoCardSaveRequest.of(
                        request.userId(),
                        request.totalPlanId(),
                        photoCardUrlDto.photoCardUrl(),
                        photoCardUrlDto.caption())
        );

        return PhotoCardDetailResponse.of(PhotoCardDetailDto.of(photoCard));
    }

    public PhotoCardDetailResponse getPhotoCard(Long feedId) {
        PhotoCard photoCard = photoCardDomainService.getPhotoCard(feedId);
        return PhotoCardDetailResponse.of(PhotoCardDetailDto.of(photoCard));
    }

    public PhotoCardsResponse getPhotoCardsByUserId(Long userId, Pageable pageable) {

        Page<PhotoCard> page = photoCardDomainService.getPhotoCardsByUserId(userId, pageable);
        List<PhotoCardDetailDto> photoCards = getPhotoCardDetailDtoList(page.getContent());

        return PhotoCardsResponse.of(photoCards, page.getNumber(), page.hasNext());
    }

    private List<PhotoCardDetailDto> getPhotoCardDetailDtoList(List<PhotoCard> photoCards) {
        return photoCards.stream()
                .map(PhotoCardDetailDto::of)
                .toList();
    }

    private PhotoCardCreationToGpuRequest getPhotoCardCreationToGpuRequest(PhotoCardCreationRequest request) {

        FeedListDto feedListDto = feedApiClient.getFeedsByTotalPlanId(request.totalPlanId()).getResponse();
        return PhotoCardCreationToGpuRequest.from(
                request.userId(),
                request.totalPlanId(),
                feedListDto.feedImageUrls());
    }
}
