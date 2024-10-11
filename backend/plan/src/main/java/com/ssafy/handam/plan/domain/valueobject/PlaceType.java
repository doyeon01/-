package com.ssafy.handam.plan.domain.valueobject;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlaceType {

    RESTAURANT("식당"),
    CAFE("카페"),
    ACCOMMODATION("숙박"),
    TOURIST_ATTRACTION("관광지"),
    ETC("기타");

    private final String text;

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