package com.ssafy.handam.photocard.domain.service;

import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import com.ssafy.handam.photocard.domain.repository.PhotoCardRepository;
import com.ssafy.handam.photocard.presentation.request.PhotoCardSaveRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class PhotoCardDomainService {

    private final PhotoCardRepository photoCardRepository;

    public PhotoCard createPhotoCard(PhotoCardSaveRequest request) {
        return photoCardRepository.save(new PhotoCard(request.userId(), request.totalPlanId(), request.photoCardUrl(), request.caption()));
    }

    public PhotoCard getPhotoCard(Long totalPlanId) {
        return photoCardRepository.findByTotalPlanId(totalPlanId);
    }

    public Page<PhotoCard> getPhotoCardsByUserId(Long userId, Pageable pageable) {
        return photoCardRepository.findByUserId(userId, pageable);
    }
}
