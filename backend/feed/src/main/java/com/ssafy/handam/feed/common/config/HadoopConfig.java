package com.ssafy.handam.feed.common.config;

import java.io.IOException;
import java.net.URI;
import org.apache.hadoop.fs.FileSystem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HadoopConfig {

    @Value("${hadoop.hdfs.uri}")
    private String hdfsUri;

    @Value("${hadoop.hdfs.user}")
    private String hdfsUser;

    @Bean
    public FileSystem fileSystem() throws IOException, InterruptedException {
        org.apache.hadoop.conf.Configuration configuration = new org.apache.hadoop.conf.Configuration();
        return FileSystem.get(URI.create(hdfsUri), configuration, hdfsUser);
    }
}