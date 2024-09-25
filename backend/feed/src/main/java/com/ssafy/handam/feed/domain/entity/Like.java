package com.ssafy.handam.feed.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "likes") // 예약어 충돌 방지
public class Like extends  BaseEntity {
    @Id
    private Long id;

    Long userId;
    Long feedId;
}