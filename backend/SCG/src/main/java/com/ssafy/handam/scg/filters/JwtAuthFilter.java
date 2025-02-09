package com.ssafy.handam.scg.filters;

import com.ssafy.handam.scg.jwt.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            String accessToken = jwtUtil.getAccessToken(request);

            if (accessToken != null && jwtUtil.isJwtValid(accessToken)) {
                request = request.mutate().header("Auth", "true").build();
                return chain.filter(exchange.mutate().request(request).build());
            }

            return jwtUtil.onError(exchange,"JWT Token expired", HttpStatus.UNAUTHORIZED);
        };
    }


    public static class Config {
    }
}
