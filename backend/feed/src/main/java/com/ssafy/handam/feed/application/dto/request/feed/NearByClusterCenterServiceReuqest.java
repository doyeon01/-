package com.ssafy.handam.feed.application.dto.request.feed;

public record NearByClusterCenterServiceReuqest(
        double latitude,
        double longitude,
        int distance,
        int page,
        int size,
        String token
) {
    public static NearByClusterCenterServiceReuqest of(double latitude, double longitude, int distance, int page, int size, String token) {
        return new NearByClusterCenterServiceReuqest(latitude, longitude, distance, page, size, token);
    }
}
