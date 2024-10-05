package com.ssafy.handam.user.infrastructure.jwt;

import com.ssafy.handam.user.domain.model.valueobject.OAuthUserInfo;
import com.ssafy.handam.user.infrastructure.jwt.valueobject.JwtPayload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;


@Component
public class JwtUtil {

    private final SecretKey secretKey;
    private final long expirationTime = 36000000;

    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public boolean isJwtValid(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public String extractUserEmail(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("email", String.class);
    }
    public Long extractUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("userId", Long.class);
    }

    public String getJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("accessToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public String createJwtToken(OAuthUserInfo userInfo,Long userId) {
        JwtPayload jwtPayload = JwtPayload.of(userInfo.providerId(),userId ,userInfo.email());
        return generateToken(jwtPayload);
    }

    public String generateToken(JwtPayload jwtPayload) {
        return Jwts.builder()
                .setSubject(jwtPayload.providerId())
                .claim("userId", jwtPayload.userId())
                .claim("email", jwtPayload.email())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}