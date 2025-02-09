package com.ssafy.handam.user.infrastructure.jwt.valueobject;

public record JwtPayload(String providerId, Long userId, String email) {
    public static JwtPayload of(String providerId, Long userId, String email) {
        return new JwtPayload(providerId, userId, email);
    }
}