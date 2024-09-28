package com.ssafy.handam.user.infrastructure.jwt;

import com.ssafy.handam.user.presentation.request.OAuthUserLoginRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;


@Component
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(OAuthUserLoginRequest loginRequest) {
        return Jwts.builder()
                .setSubject(loginRequest.providerId())
                .claim("email", loginRequest.email())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}