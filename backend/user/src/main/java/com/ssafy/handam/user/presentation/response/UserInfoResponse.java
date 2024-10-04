package com.ssafy.handam.user.presentation.response;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;

public record UserInfoResponse(Long id,
                               String email,
                               String name,
                               String nickname,
                               Gender gender,
                               String age,
                               String profileImageUrl,
                               String residence,
                               String introduction,
                               String travelStyl1,
                               String travelStyl2,
                               String travelStyl3,
                               String travelStyl4,
                               double accompanyTemperature) {

    public static UserInfoResponse of(User user) {
        return new UserInfoResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getNickname(),
                user.getGender(),
                user.getAge(),
                user.getProfileImageUrl(),
                user.getResidence(),
                user.getIntroduction(),
                user.getTravelStyl1(),
                user.getTravelStyl2(),
                user.getTravelStyl3(),
                user.getTravelStyl4(),
                user.getAccompanyTemperature()
        );
    }
}
