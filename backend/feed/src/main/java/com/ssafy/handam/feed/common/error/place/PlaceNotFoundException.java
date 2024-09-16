package com.ssafy.handam.feed.common.error.place;

public class PlaceNotFoundException extends RuntimeException {

    public PlaceNotFoundException(Long id) {
        super("Place Not Found Exception: " + id);
    }
}
