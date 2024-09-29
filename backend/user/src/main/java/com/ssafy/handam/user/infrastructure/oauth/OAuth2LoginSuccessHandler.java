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

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        Map<String, Object> attributes = customUserDetails.getAttributes();

        OAuthUserInfo oAuthUserInfo = OAuthUserInfo.of(attributes);

        //userService.saveUser(oAuthUserInfo);

        String token = jwtUtil.createJwtToken(oAuthUserInfo);

        CookieUtil.addTokenToCookie(response, token);

        response.sendRedirect("http://localhost:8080/api/v1/user/test");
    }

}