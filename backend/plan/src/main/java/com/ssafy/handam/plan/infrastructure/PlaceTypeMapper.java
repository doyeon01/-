package com.ssafy.handam.plan.infrastructure;

import com.ssafy.handam.plan.domain.valueobject.PlaceType;

public class PlaceTypeMapper {

    public static PlaceType mapToPlaceType(String placeType) {
        switch (placeType) {
            case "관광명소":
            case "문화시설":
                return PlaceType.TOURIST_ATTRACTION;
            case "숙박":
                return PlaceType.ACCOMMODATION;
            case "음식점":
            case "카페":
                return PlaceType.RESTAURANT;
            default:
                return PlaceType.ETC;
        }
    }
}
