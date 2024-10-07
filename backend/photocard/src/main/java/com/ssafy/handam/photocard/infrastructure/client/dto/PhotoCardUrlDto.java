package com.ssafy.handam.photocard.infrastructure.client.dto;

public record PhotoCardUrlDto(
        String photoCardUrl,
        String caption) {

    public static PhotoCardUrlDto from(
            String photoCardUrl,
            String caption) {

        return new PhotoCardUrlDto(
                photoCardUrl,
                caption);
    }

}
