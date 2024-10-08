package com.ssafy.handam.photocard.application.dto;

import com.ssafy.handam.photocard.domain.entity.PhotoCard;
import java.time.format.DateTimeFormatter;

public record PhotoCardDetailDto(

        Long id,
        Long userId,
        Long totalPlanId,
        String planTitle,
        String photoCardUrl,
        String createdDate) {

    public static PhotoCardDetailDto of(PhotoCard photoCard) {

        String formattedCreatedDate = (photoCard.getCreatedDate() != null) ?
                photoCard.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) :
                "N/A";
        return new PhotoCardDetailDto(
                photoCard.getId(),
                photoCard.getUserId(),
                photoCard.getTotalPlanId(),
                photoCard.getPlanTitle(),
                photoCard.getPhotoCardUrl(),
                formattedCreatedDate
        );
    }
}
