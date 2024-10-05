package com.ssafy.handam.photocard.domain.repository;

import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import com.ssafy.handam.photocard.infrastructure.jpa.PhotoCardJpaRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PhotoCardRepositoryImpl implements PhotoCardRepository {

    private final PhotoCardJpaRepository photoCardJpaRepository;

    @Override
    public PhotoCard save(PhotoCard photocard) { return photoCardJpaRepository.save(photocard); }

    @Override
    public PhotoCard findByFeedId(Long feedId) { return photoCardJpaRepository.findByFeedId(feedId); }

    @Override
    public Page<PhotoCard> findByUserId(Long userId, Pageable pageable) { return photoCardJpaRepository.findByUserId(userId, pageable); }
}
