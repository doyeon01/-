package com.ssafy.handam.photocard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PhotocardApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhotocardApplication.class, args);
	}

}
