package com.tooliv.server.global.security.util;

import org.springframework.web.filter.OncePerRequestFilter;

// 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 Custom Filter 로 UsernamePasswordAuthenticationFilter 이전에 실행
public class JwtAuthenticationFilter extends OncePerRequestFilter {

}
