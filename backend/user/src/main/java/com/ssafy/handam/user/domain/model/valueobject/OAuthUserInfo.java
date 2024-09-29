package com.ssafy.handam.user.domain.model.valueobject;

import java.time.MonthDay;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public record OAuthUserInfo(String provider,
                            String providerId,
                            String email,
                            String name,
                            String nickname,
                            MonthDay birthday,
                            Gender gender,
                            String age,
                            String profileImage) {

    public static OAuthUserInfo of(Map<String, Object> attributes) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd");

        return new OAuthUserInfo(
                "naver",
                attributes.get("providerId").toString(),
                attributes.get("email").toString(),
                attributes.get("name").toString(),
                attributes.get("nickname").toString(),
                MonthDay.parse(attributes.get("birthday").toString(), formatter),
                "M".equalsIgnoreCase(attributes.get("gender").toString()) ? Gender.MALE : Gender.FEMALE,
                attributes.get("age").toString(),
                attributes.get("profileImage").toString()
        );
    }
}