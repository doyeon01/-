package com.ssafy.handam.user.infrastructure.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {
    private static final int COOKIE_EXPIRATION_TIME = 3600;

    public static void addTokenToCookie(HttpServletResponse response, String value) {
        Cookie cookie = new Cookie("accessToken", value);
        cookie.setMaxAge(COOKIE_EXPIRATION_TIME);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}