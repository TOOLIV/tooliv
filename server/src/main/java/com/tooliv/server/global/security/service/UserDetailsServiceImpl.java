package com.tooliv.server.global.security.service;

import com.tooliv.server.domain.user.domain.User;
import com.tooliv.server.domain.user.domain.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> oUser = userRepository.findByEmailAndDeletedAt(email, null);

        return new UserDetailsImpl(
            oUser.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다.")));

    }

}
