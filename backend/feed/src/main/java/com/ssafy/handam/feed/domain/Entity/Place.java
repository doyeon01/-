package com.ssafy.handam.feed.domain.Entity;

import com.ssafy.handam.feed.domain.PlaceType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public  class Place extends BaseEntity {

    @Id
    private Long placeId;

    private String placeName;
    private String placeAddress;
    private String placeDetailAddress;
    private String longitude;
    private String latitude;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

    @Builder
    private Place(String placeName, String placeAddress, String placeDetailAddress, String longitude, String latitude, PlaceType placeType) {
        this.placeName = placeName;
        this.placeAddress = placeAddress;
        this.placeDetailAddress = placeDetailAddress;
        this.longitude = longitude;
        this.latitude = latitude;
        this.placeType = placeType;
    }
}