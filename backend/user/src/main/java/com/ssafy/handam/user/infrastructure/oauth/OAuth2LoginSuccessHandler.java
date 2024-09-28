package com.ssafy.handam.user.infrastructure.oauth;

import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.presentation.request.OAuthUserLoginRequest;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;

    public OAuth2LoginSuccessHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String providerId = oauthUser.getAttribute("sub");
        String email = oauthUser.getAttribute("email");

        String token = userService.generateToken(new OAuthUserLoginRequest(providerId, email));

        ResponseCookie cookie = userService.createCookie(token);

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        super.onAuthenticationSuccess(request, response, authentication);
    }
}