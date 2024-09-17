package com.ssafy.handam.feed.domain;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlaceType {

    CAFE("카페"),
    RESTAURANT("식당"),
    ACCOMMODATION("숙박"),
    TOURIST_ATTRACTION("관광지"),
    ETC("기타");

    private final String text;

    public boolean isCafe() {
        return CAFE.equals(this);
    }

    public boolean isRestaurant() {
        return RESTAURANT.equals(this);
    }

    public boolean isAccommodation() {
        return ACCOMMODATION.equals(this);
    }

    public boolean isTouristAttraction() {
        return TOURIST_ATTRACTION.equals(this);
    }

    public boolean isEtc() {
        return ETC.equals(this);
    }
}