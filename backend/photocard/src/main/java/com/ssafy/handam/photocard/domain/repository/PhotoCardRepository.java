package com.ssafy.handam.photocard.domain.repository;

import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoCardRepository {

    PhotoCard save(PhotoCard photocard);
    PhotoCard findByTotalPlanId(Long totalPlanId);
    Page<PhotoCard> findByUserId(Long userId, Pageable pageable);
}
