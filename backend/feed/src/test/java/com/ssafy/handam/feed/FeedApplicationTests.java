package com.ssafy.handam.feed;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = FeedApplication.class)
@ActiveProfiles("test")  // Activate the 'test' profile
class FeedApplicationTests {

	@Test
	void contextLoads() {
	}
}
