package com.ssafy.handam.user.domain.model.valueobject;

import java.util.Map;

public record OAuthUserInfo(String provider,
                            String providerId,
                            String email,
                            String name,
                            Gender gender,
                            String age,
                            String profile_image) {

    public static OAuthUserInfo of(Map<String, Object> attributes) {

        return new OAuthUserInfo(
                "naver",
                attributes.get("providerId").toString(),
                attributes.get("email").toString(),
                attributes.get("name").toString(),
                "M".equalsIgnoreCase(attributes.get("gender").toString()) ? Gender.MALE : Gender.FEMALE,
                attributes.get("age").toString(),
                attributes.get("profile_image").toString()
        );
    }
}