package com.ssafy.handam.accompanyboard.application.dto;

import com.ssafy.handam.accompanyboard.infrastructure.client.dto.UserDto;

public record UserDetailDto(
        Long userId,
        String name,
        String profileImageUrl) {
    public static UserDetailDto from(UserDto userDto) {
        return new UserDetailDto(
                userDto.id(),
                userDto.name(),
                userDto.profileImageUrl()
        );
    }
}
