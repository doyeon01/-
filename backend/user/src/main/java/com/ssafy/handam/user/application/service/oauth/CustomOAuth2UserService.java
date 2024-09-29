package com.ssafy.handam.user.application.service.oauth;

import com.ssafy.handam.user.infrastructure.oauth.valueobject.CustomOAuth2User;
import com.ssafy.handam.user.infrastructure.oauth.valueobject.NaverUserDetails;
import com.ssafy.handam.user.infrastructure.oauth.valueobject.OAuth2UserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2User oauth2User = super.loadUser(userRequest);
        OAuth2UserDetails oAuth2UserDetails = null;
        if(registrationId.equals("naver")){
            oAuth2UserDetails = new NaverUserDetails(oauth2User.getAttributes());
        }
        return new CustomOAuth2User(oAuth2UserDetails);
    }
}
