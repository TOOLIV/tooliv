package com.tooliv.server.global.security.util;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

// 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 Custom Filter 로 UsernamePasswordAuthenticationFilter 이전에 실행
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    public JwtAuthenticationFilter(JwtAuthenticationProvider provider) {
        jwtAuthenticationProvider = provider;
    }

    // 실제 필터링 로직 수행
    // 토큰의 인증 정보를 현재 실행 중인 SecurityContext 에 저장
    // 인증에 성공하면 authentication 객체를 Context 안에 넣음
    // 인증에 실패하면 아무런 과정 없이 다음 필터로 넘어감
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain)
        throws ServletException, IOException {

        // resolveToken 을 통해 토큰을 받아와서 유효성 검증을 하고 정상 토큰이면 SecurityContext 에 저장
        String token = jwtAuthenticationProvider.resolveToken(request);

        if (token != null && jwtAuthenticationProvider.validateToken(token)) {
            Authentication authentication = jwtAuthenticationProvider.getAuthentication(token);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);

    }
}
