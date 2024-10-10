package com.ssafy.handam.accompanyboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AccompanyboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccompanyboardApplication.class, args);
	}

}
