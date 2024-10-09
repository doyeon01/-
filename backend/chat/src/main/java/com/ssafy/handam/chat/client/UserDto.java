package com.ssafy.handam.chat.client;

import lombok.Builder;

@Builder
public record UserDto(
        Long id,
        String email,
        String name,
        String nickname,
        Gender gender,
        String age,
        String profileImage,
        String residence,
        String introduction,
        String travelStyl1,
        String travelStyl2,
        String travelStyl3,
        String travelStyl4,
        double accompanyTemperature
) {
}