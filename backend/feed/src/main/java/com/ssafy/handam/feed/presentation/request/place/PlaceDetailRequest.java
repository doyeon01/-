package com.ssafy.handam.feed.presentation.request.place;

import jakarta.validation.constraints.NotNull;

public record PlaceDetailRequest(@NotNull Long placeId) {
}
