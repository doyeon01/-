package com.ssafy.handam.feed.application.dto.request.feed;

import java.util.List;

public record FeedsByFiltersServiceRequest(String type,
                                           int ageRange,
                                           String gender,
                                           Double latitude,
                                           Double longitude,
                                           String keyword,
                                           List<String> sortBy,
                                           int page,
                                           int size
) {
    public static FeedsByFiltersServiceRequest of(String type,
                                                  int ageRage,
                                                  String gender,
                                                  Double latitude,
                                                  Double longitude,
                                                  String keyword,
                                                  List<String> sortBy,
                                                  int page,
                                                  int size) {

        return new FeedsByFiltersServiceRequest(type, ageRage, gender, latitude, longitude, keyword, sortBy, page, size);
    }
}
