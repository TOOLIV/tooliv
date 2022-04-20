package com.tooliv.server.global.security.config;

import com.tooliv.server.global.security.service.UserDetailsServiceImpl;
import com.tooliv.server.global.security.util.JwtAccessDeniedHandler;
import com.tooliv.server.global.security.util.JwtAuthenticationEntryPoint;
import com.tooliv.server.global.security.util.JwtAuthenticationFilter;
import com.tooliv.server.global.security.util.JwtAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // 'bcrypt' 라는 해시 함수를 이용해서 패스워드를 암호화 하는 목적으로 설계된 클래스
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 인증 방법
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .httpBasic()
            .and()
            .cors()
            .and()
            .csrf().disable()
            // 토큰을 활용하면 세션이 필요 없으므로 STATELESS 로 설정
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)
            .and()
            // authorizeRequests() : HttpServletRequests 를 사용하는 요청들에 대한 접근 제한을 설정
            .authorizeRequests()
            .antMatchers("/api/user/login").permitAll()
            .antMatchers(HttpMethod.DELETE, "/api/user").authenticated()
            .antMatchers(HttpMethod.PATCH, "/api/user").authenticated()
            .antMatchers(HttpMethod.POST, "/api/admin/user").permitAll()
            .antMatchers("/api/v3/**", "/swagger-ui/**", "/swagger/**", "/swagger-resources/**", "/v3/api-docs").permitAll()
            // 나머지 요청들은 모두 인증되어야 한다.
            .anyRequest().authenticated()
            .and()
            // JWT 필터 추가
            .addFilterBefore(new JwtAuthenticationFilter(jwtAuthenticationProvider),
                UsernamePasswordAuthenticationFilter.class);

    }
}
