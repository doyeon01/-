package com.ssafy.handam.user.presentation.request;

public record UserLoginRequest(String username, String password) {
    public static UserLoginRequest of(String username, String password) {
        return new UserLoginRequest(username, password);
    }
}
