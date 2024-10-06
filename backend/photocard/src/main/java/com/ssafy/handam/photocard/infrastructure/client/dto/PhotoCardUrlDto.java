package com.ssafy.handam.photocard.infrastructure.client.dto;

public record PhotoCardUrlDto(String photoCardUrl) {

    public static PhotoCardUrlDto of(String photoCardUrl) {

        return new PhotoCardUrlDto(photoCardUrl);
    }

}
