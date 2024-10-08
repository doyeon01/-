package com.ssafy.handam.photocard.infrastructure.client.dto;

public record PhotoCardUrlDto(String photoCardUrl) {

    public static PhotoCardUrlDto from(
            String photoCardUrl) {

        return new PhotoCardUrlDto(photoCardUrl);
    }

}
