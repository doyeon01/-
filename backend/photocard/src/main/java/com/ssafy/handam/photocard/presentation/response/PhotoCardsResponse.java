package com.ssafy.handam.photocard.presentation.response;

import com.ssafy.handam.photocard.application.dto.PhotoCardDetailDto;
import java.util.List;

public record PhotoCardsResponse(

        List<PhotoCardDetailDto> photoCards,
        int currentPage,
        boolean hasNextPage) {

    public static PhotoCardsResponse of(

            List<PhotoCardDetailDto> photoCards,
            int currentPage,
            boolean hasNextPage) {

        return new PhotoCardsResponse(
                photoCards,
                currentPage,
                hasNextPage
        );
    }
}
