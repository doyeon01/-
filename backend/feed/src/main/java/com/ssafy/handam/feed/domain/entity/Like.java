package com.ssafy.handam.feed.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "likes") // 예약어 충돌 방지
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like extends  BaseEntity {
    @Id
    private Long id;

    Long userId;
    Long feedId;

    @Builder
    private Like(Long userId, Long feedId) {
        this.userId = userId;
        this.feedId = feedId;
    }
}