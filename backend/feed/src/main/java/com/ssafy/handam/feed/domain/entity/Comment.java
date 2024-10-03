package com.ssafy.handam.feed.domain.entity;

import com.fasterxml.jackson.databind.ser.Serializers.Base;
import com.ssafy.handam.feed.domain.dto.request.comment.CreateCommentDomainRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private Long userId;
    private Long feedId;
    private String content;

    @Builder
    public Comment(Long userId, Long feedId, String content) {
        this.userId = userId;
        this.feedId = feedId;
        this.content = content;
    }

    public static Comment create(CreateCommentDomainRequest request) {
        return Comment.builder()
                .feedId(request.feedId())
                .userId(request.userId())
                .content(request.content())
                .build();
    }
}
