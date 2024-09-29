package com.ssafy.handam.user.presentation.response;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;

import java.time.MonthDay;

public record UserInfoResponse(Long id,
                               String nickname,
                               MonthDay birthday,
                               Gender gender,
                               String age,
                               String profileImage,
                               String introduction,
                               String travelStyl1,
                               String travelStyl2,
                               String travelStyl3,
                               String travelStyl4,
                               double accompanyTemperature) {

    public static UserInfoResponse of(User user) {
        return new UserInfoResponse(
                user.getId(),
                user.getNickname(),
                user.getBirthday(),
                user.getGender(),
                user.getAge(),
                user.getProfileImage(),
                user.getIntroduction(),
                user.getTravelStyl1(),
                user.getTravelStyl2(),
                user.getTravelStyl3(),
                user.getTravelStyl4(),
                user.getAccompanyTemperature()
        );
    }
}
