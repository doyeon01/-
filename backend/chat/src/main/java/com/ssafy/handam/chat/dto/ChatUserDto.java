package com.ssafy.handam.chat.dto;

import com.ssafy.handam.chat.client.UserDto;

public class ChatUserDto {
    private Long userId;
    private String nickname;
    private String profileImageUrl;

    public ChatUserDto() {
    }

    public static ChatUserDto from(UserDto user) {
        return new ChatUserDto(user.id(), user.nickname(), user.profileImage());
    }

    public static ChatUserDto of(Long userId, String nickname, String profileImageUrl) {
        return new ChatUserDto(userId, nickname, profileImageUrl);
    }

    public ChatUserDto(Long userId, String nickname, String profileImageUrl) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    public Long getUserId() {
        return userId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }
}
