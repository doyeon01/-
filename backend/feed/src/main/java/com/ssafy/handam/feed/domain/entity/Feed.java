package com.ssafy.handam.feed.domain.entity;

import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feed extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String imageUrl;
    private int likeCount;
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @Builder
    public Feed(String title, String content, String imageUrl, Place place, Long userId) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.place = place;
        this.userId = userId;
        this.likeCount = 0;
    }

    public static Feed createFeed(FeedCreationServiceRequest request, Place place) {
        return Feed.builder()
                .title(request.title())
                .content(request.content())
                .imageUrl(request.feedImageUrl())
                .place(place)
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

    public void assignToPlace(Place place) {
        this.place = place;
    }
}

