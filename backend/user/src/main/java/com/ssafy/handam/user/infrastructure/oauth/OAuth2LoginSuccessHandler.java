package com.ssafy.handam.user.infrastructure.oauth;

import com.ssafy.handam.user.domain.model.valueobject.OAuthUserInfo;
import com.ssafy.handam.user.domain.service.UserService;
import com.ssafy.handam.user.infrastructure.oauth.valueobject.CustomOAuth2User;
import com.ssafy.handam.user.infrastructure.jwt.JwtUtil;
import com.ssafy.handam.user.infrastructure.util.CookieUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    @Value("${oauth2.success-redirect-url}")
    private String successRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        Map<String, Object> attributes = customUserDetails.getAttributes();

        OAuthUserInfo oAuthUserInfo = OAuthUserInfo.of(attributes);

        Long userId = userService.handleUserLogin(oAuthUserInfo);

        String token = jwtUtil.createJwtToken(oAuthUserInfo,userId);

        CookieUtil.addTokenToCookie(response, token);

        response.sendRedirect(successRedirectUrl);
    }

}