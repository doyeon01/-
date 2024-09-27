package com.ssafy.handam.feed.domain.entity;

import com.ssafy.handam.feed.domain.PlaceType;
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
    private String address1;
    private String address2;
    private Double longitude;
    private Double latitude;
    private int likeCount;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

    @Builder
    private Feed(
            String title,
            String content,
            String imageUrl,
            String address1,
            String address2,
            Double longitude,
            Double latitude,
            PlaceType placeType,
            Long userId
    ) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.address1 = address1;
        this.address2 = address2;
        this.longitude = longitude;
        this.latitude = latitude;
        this.placeType = placeType;
        this.userId = userId;
        this.likeCount = 0;
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