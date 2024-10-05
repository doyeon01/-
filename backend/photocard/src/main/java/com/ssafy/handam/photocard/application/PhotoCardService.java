package com.ssafy.handam.photocard.application;

import com.ssafy.handam.photocard.application.dto.PhotoCardDetailDto;
import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import com.ssafy.handam.photocard.domain.service.PhotoCardDomainService;
import com.ssafy.handam.photocard.presentation.request.PhotoCardCreationRequest;
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

    public PhotoCardDetailResponse createPhotoCard(PhotoCardCreationRequest request) {
        PhotoCard photoCard = photoCardDomainService.createPhotoCard(request);
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
}
