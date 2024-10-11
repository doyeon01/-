package com.ssafy.handam.feed.infrastructure;

public record JwtPayload(String providerId,Long userId,String email) {
    public static JwtPayload of(String providerId,Long userId, String email) {
        return new JwtPayload(providerId,userId, email);
    }
}
