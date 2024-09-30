package com.ssafy.handam.user.domain.model.valueobject;

import java.util.Map;

public record OAuthUserInfo(String provider,
                            String providerId,
                            String email,
                            String name,
                            String nickname,
                            Gender gender,
                            String age,
                            String profileImage) {

    public static OAuthUserInfo of(Map<String, Object> attributes) {

        return new OAuthUserInfo(
                "naver",
                attributes.get("providerId").toString(),
                attributes.get("email").toString(),
                attributes.get("name").toString(),
                attributes.get("nickname").toString(),
                "M".equalsIgnoreCase(attributes.get("gender").toString()) ? Gender.MALE : Gender.FEMALE,
                attributes.get("age").toString(),
                attributes.get("profileImage").toString()
        );
    }
}