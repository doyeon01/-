package com.ssafy.handam.user.infrastructure.oauth.valueobject;

public interface OAuth2UserDetails {
    String getProvider();
    String getProviderId();
    String getEmail();
    String getName();
    String getNickname();
    String getBirth();
    String getGender();
    String getAge();
    String getProfile_image();
}
