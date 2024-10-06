package com.ssafy.handam.photocard.infrastructure.jpa;

import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoCardJpaRepository extends JpaRepository<PhotoCard, Long> {

    PhotoCard findByFeedId(Long feedId);
    Page<PhotoCard> findByUserId(Long userId, Pageable pageable);
}
