package com.ssafy.handam.accompanyboard.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long totalPlanId;
    private String title;
    private String description;

    @Builder
    public Article(
           Long userId,
           Long totalPlanId,
           String title,
           String description)

    {
        this.userId = userId;
        this.totalPlanId = totalPlanId;
        this.title = title;
        this.description = description;
    }
}
