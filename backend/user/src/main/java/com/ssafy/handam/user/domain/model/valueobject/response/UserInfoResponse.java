package com.ssafy.handam.user.domain.model.valueobject.response;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import java.time.LocalDate;

public record UserInfoResponse(Long id,
                              String nickname,
                              LocalDate birth,
                              Gender gender,
                              String residence,
                              String introduction,
                              double accompanyTemperature) {

    public static UserInfoResponse of(User user) {
        return new UserInfoResponse(user.getId(),
                user.getNickname(),
                user.getBirth(),
                user.getGender(),
                user.getResidence(),
                user.getIntroduction(),
                user.getAccompanyTemperature());
    }
}
