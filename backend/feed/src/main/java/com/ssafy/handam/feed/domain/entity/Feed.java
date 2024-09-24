package com.ssafy.handam.feed.domain.entity;

import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.valueobject.Address;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class Feed extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;
    private String content;
    private String imageUrl;
    private int likeCount;

    @Embedded
    private Address address;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

    @Builder
    private Feed(
            String title,
            String content,
            String imageUrl,
            Address address,
            PlaceType placeType,
            Long userId
    ) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.address = address;
        this.placeType = placeType;
        this.userId = userId;
        this.likeCount = 0;
    }

    public static Feed createFeed(FeedCreationServiceRequest request) {
        return Feed.builder()
                .title(request.title())
                .content(request.content())
                .imageUrl(request.feedImageUrl())
                .address(request.address())
                .placeType(request.placeType())
                .userId(request.userId())
                .build();
    }

    public void incrementLikeCount() {
        this.likeCount++;
    }

    public void decrementLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
        }
    }
}