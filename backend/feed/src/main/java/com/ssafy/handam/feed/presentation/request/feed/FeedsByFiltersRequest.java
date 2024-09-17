package com.ssafy.handam.feed.presentation.request.feed;

import com.ssafy.handam.feed.application.dto.request.feed.FeedsByFiltersServiceRequest;

import java.util.List;
import org.springframework.boot.context.properties.bind.DefaultValue;

public record FeedsByFiltersRequest(
        String placeType,
        int ageRange,
        String gender,
        Double latitude,     // 위도
        Double longitude,    // 경도
        String keyword,
        List<String> sortBy,
        int page,
         int size
) {

    public static FeedsByFiltersServiceRequest toServiceRequest(
            String placeType,
            int ageRange,
            String gender,
            Double latitude,
            Double longitude,
            String keyword,
            List<String> sortBy,
            int page,
            int size) {


        return new FeedsByFiltersServiceRequest(placeType, ageRange, gender, latitude, longitude, keyword, sortBy, page, size);
    }
}
