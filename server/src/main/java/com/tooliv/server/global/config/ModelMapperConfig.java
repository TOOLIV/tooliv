package com.tooliv.server.global.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    private final ModelMapper modelMapper = new ModelMapper();

    /*
    ** source 속성과 destination 속성의 이름이 정확히 일치할 때만 매핑
     */
    @Bean
    public ModelMapper strictMapper() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }

    @Bean
    public ModelMapper standardMapper() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
        return modelMapper;
    }

    @Bean
    public ModelMapper looseMapper() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper;
    }
}
