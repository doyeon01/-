package com.ssafy.handam.feed.common.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.ssafy.handam.feed.domain.repository.jpa")
@EnableElasticsearchRepositories(basePackages = "com.ssafy.handam.feed.infrastructure.elasticsearch")
public class RepositoryConfig {
}