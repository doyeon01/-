package com.ssafy.handam.user.infrastructure.jwt.valueobject;

public record JwtPayload(String providerId, String email) {
    public static JwtPayload of(String providerId, String email) {
        return new JwtPayload(providerId, email);
    }
}
