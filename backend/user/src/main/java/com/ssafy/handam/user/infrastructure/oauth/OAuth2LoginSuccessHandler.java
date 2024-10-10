package com.ssafy.handam.user.infrastructure.oauth;

import com.ssafy.handam.user.domain.model.entity.User;
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
    private String surveyRedirectUrl;

//    @Value("${oauth2.main-redirect-url}")
//    private String mainRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        Map<String, Object> attributes = customUserDetails.getAttributes();

        OAuthUserInfo oAuthUserInfo = OAuthUserInfo.of(attributes);

        Long userId = userService.handleUserLogin(oAuthUserInfo);

        String token = jwtUtil.createJwtToken(oAuthUserInfo,userId);

        CookieUtil.addTokenToCookie(response, token);

//        User user = userService.getUserById(userId);
        response.sendRedirect(surveyRedirectUrl);
//        System.out.println(user.getTravelStyl1()+user.getName());
//        if (user.getTravelStyl1() == null || user.getTravelStyl1().isEmpty()) {
//            response.sendRedirect(surveyRedirectUrl);
//        } else {
//            response.sendRedirect(mainRedirectUrl);
//        }
    }

}