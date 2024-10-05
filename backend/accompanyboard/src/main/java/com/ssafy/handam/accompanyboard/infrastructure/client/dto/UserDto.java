package com.ssafy.handam.accompanyboard.infrastructure.client.dto;

public record UserDto(
        Long id,
        String nickName,
        String email,
        String profileImageUrl) {
    public static UserDto of(
            Long id,
            String nickName,
            String email,
            String profileImageUrl) {
        return new UserDto(
                id,
                nickName,
                email,
                profileImageUrl);
    }
}
