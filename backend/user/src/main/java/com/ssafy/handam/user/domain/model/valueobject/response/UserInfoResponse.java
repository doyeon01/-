package com.ssafy.handam.user.domain.model.valueobject.response;

import com.ssafy.handam.user.domain.model.entity.User;
import com.ssafy.handam.user.domain.model.valueobject.Gender;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {

    private String username;
    private String birth;
    private Gender gender;
    private String residence;
    private String introduction;
    private double accompanyTemperature;

    public static UserInfoResponse of(User user) {
        return UserInfoResponse.builder()
                .username(user.getUsername())
                .birth(user.getBirth())
                .gender(user.getGender())
                .residence(user.getResidence())
                .introduction(user.getIntroduction())
                .accompanyTemperature(user.getAccompanyTemperature())
                .build();
    }
}
