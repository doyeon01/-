package com.ssafy.handam.feed.infrastructure.client.dto;

public record UserDto(Long id, String name, String email, String profileImageUrl) {

    public static UserDto of(
            Long id,
            String name,
            String email,
            String profileImageUrl) {
        return new UserDto(id, name, email, profileImageUrl);
    }
}
