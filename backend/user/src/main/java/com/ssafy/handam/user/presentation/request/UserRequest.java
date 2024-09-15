package com.ssafy.handam.user.presentation.request;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import com.ssafy.handam.user.domain.model.valueobject.response.UserInfoResponse;

import java.time.LocalDate;

public record UserRequest (Long id,
                           String username,
                           LocalDate birth,
                           Gender gender,
                           String residence,
                           String introduction,
                           double accompanyTemperature){
    public static UserRequest of (User user){
        return new UserRequest(user.getId(),
                user.getNickname(),
                user.getBirth(),
                user.getGender(),
                user.getResidence(),
                user.getIntroduction(),
                user.getAccompanyTemperature());
    }
}
