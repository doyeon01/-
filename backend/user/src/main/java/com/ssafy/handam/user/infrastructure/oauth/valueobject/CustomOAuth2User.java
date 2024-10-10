package com.ssafy.handam.user.infrastructure.oauth.valueobject;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.Collection;
import java.util.List;
import java.util.Map;


public class CustomOAuth2User implements OAuth2User {

    private final OAuth2UserDetails oAuth2UserDetails;

    public CustomOAuth2User(OAuth2UserDetails oAuth2UserDetails) {
        this.oAuth2UserDetails = oAuth2UserDetails;
    }
    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "providerId", oAuth2UserDetails.getProviderId(),
                "email", oAuth2UserDetails.getEmail(),
                "name", oAuth2UserDetails.getName(),
                "provider", oAuth2UserDetails.getProvider(),
                "nickname", oAuth2UserDetails.getNickname(),
                "birthday", oAuth2UserDetails.getBirth() != null ? oAuth2UserDetails.getBirth().toString() : null,
                "gender", oAuth2UserDetails.getGender().toString(),
                "age", oAuth2UserDetails.getAge(),
                "profile_image", oAuth2UserDetails.getProfile_image()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getName() {
        return oAuth2UserDetails.getName();
    }
}
