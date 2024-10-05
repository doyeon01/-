package com.ssafy.handam.user.infrastructure.oauth.valueobject;

import com.ssafy.handam.user.infrastructure.util.NullCheckUtil;
import lombok.Getter;

import java.util.Map;

@Getter
public class NaverUserDetails implements OAuth2UserDetails {

    private final String provider;
    private final String providerId;
    private final String email;
    private final String name;
    private final String nickname;
    private final String birth;
    private final String gender;
    private final String age;
    private final String profile_image;

    public NaverUserDetails(Map<String, Object> attribute) {
        Map<String, Object> response = NullCheckUtil.handleAttributes((Map<String, Object>) attribute.get("response"));

        this.provider = "naver";
        this.providerId = response.get("id").toString();
        this.email = response.get("email").toString();
        this.name = response.get("name").toString();
        this.nickname = response.get("nickname").toString();
        this.birth = response.get("birthday").toString();
        this.gender = response.get("gender").toString();
        this.age = response.get("age").toString();
        this.profile_image = response.get("profile_image").toString();
    }

}