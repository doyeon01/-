package com.ssafy.handam.user.domain.model.valueobject.response;

import com.ssafy.handam.user.domain.model.valueobject.Gender;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UserInitSettingResponse {
    private String username;
    private String birth;
    private Gender gender;
    private String residence;

    public static UserInitSettingResponse of(Long userId) {
        UserInitSettingResponse response = new UserInitSettingResponse();
        response.username = "고도연";
        response.birth = "2000.01.09";
        response.gender = Gender.FEMALE;
        response.residence = "Seoul";
        return response;
    }
}
