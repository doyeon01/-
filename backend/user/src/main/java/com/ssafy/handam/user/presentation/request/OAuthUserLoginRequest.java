package com.ssafy.handam.user.presentation.request;

public record OAuthUserLoginRequest(String providerId, String email) {
    public static OAuthUserLoginRequest of(String providerId, String email) {
        return new OAuthUserLoginRequest(providerId, email);
    }
}
