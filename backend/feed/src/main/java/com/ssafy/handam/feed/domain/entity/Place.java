package com.ssafy.handam.feed.domain.entity;

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
public class Place extends BaseEntity {

    @Id
    private Long id;

    private String name;
    private String address1;
    private String address2;
    private String imageUrl;
    private Double longitude;
    private Double latitude;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

    @Builder
    private Place(Long id,
                  String name,
                  String address1,
                  String address2,
                  String imageUrl,
                  Double longitude,
                  Double latitude,
                  PlaceType placeType) {
        this.id = id;
        this.name = name;
        this.address1 = address1;
        this.address2 = address2;
        this.imageUrl = imageUrl;
        this.longitude = longitude;
        this.latitude = latitude;
        this.placeType = placeType;
    }

}