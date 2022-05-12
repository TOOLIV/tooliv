package com.tooliv.server.global.security.service;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.enums.UserCode;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User oUser = userRepository.findByEmailAndDeletedAt(email, null).orElseThrow(() -> new IllegalArgumentException("회원 정보 없음"));

        List<GrantedAuthority> roles = new ArrayList<>();

        if(oUser.getUserCode().equals(UserCode.USER)) {
            roles.add(new SimpleGrantedAuthority("ROLE_USER"));
        } else if(oUser.getUserCode().equals(UserCode.ADMIN)) {
            roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else if(oUser.getUserCode().equals(UserCode.MANAGER)) {
            roles.add(new SimpleGrantedAuthority("ROLE_MANAGER"));
        }

        return new UserDetailsImpl(oUser, roles);

    }

}
