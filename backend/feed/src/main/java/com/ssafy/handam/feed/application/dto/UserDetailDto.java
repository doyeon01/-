package com.ssafy.handam.feed.application.dto;

import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;

public record UserDetailDto(
        Long id,
        String nickname,
        String email,
        String profileImageUrl
) {
    public static UserDetailDto from(UserDto userDto) {
        return new UserDetailDto(
                userDto.id(),
                userDto.nickname(),
                userDto.email(),
                userDto.profileImage()
        );
    }
}
