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
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long accompanyBoardArticleId;
    private String content;

    @Builder
    public Comment(
            Long userId,
            Long accompanyBoardArticleId,
            String content
    ) {
        this.userId = userId;
        this.accompanyBoardArticleId = accompanyBoardArticleId;
        this.content = content;
    }

}
