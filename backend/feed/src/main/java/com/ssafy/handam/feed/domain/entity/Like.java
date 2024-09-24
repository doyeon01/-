package com.ssafy.handam.feed.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Like extends  BaseEntity{
    @Id
    private Long id;

    Long userId;
    Long feedId;
}
