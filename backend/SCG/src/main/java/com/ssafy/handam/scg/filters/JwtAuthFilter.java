package com.ssafy.handam.scg.filters;

import com.ssafy.handam.scg.jwt.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
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

            request.mutate().header("Auth", "false").build();
            return chain.filter(exchange.mutate().request(request).build());
        };
    }


    public static class Config {
    }
}
