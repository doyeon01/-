package com.ssafy.handam.feed.presentation.api.feed;

import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.infrastructure.jpa.FeedJpaRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class FeedControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FeedJpaRepository feedJpaRepository;

    @MockBean
    private UserApiClient userApiClient;

    private Long savedFeedId;

    @BeforeEach
    void setup() {
        Feed feed = Feed.builder()
                .title("Test Title")
                .content("Test Content")
                .imageUrl("http://example.com/feed.jpg")
                .address("Test Address")
                .longitude(127.123123)
                .latitude(32.1323)
                .placeType(PlaceType.CAFE)
                .userId(1L)
                .build();

        Feed savedFeed = feedJpaRepository.save(feed);
        savedFeedId = savedFeed.getId();

        // savedFeedId 값 출력
        System.out.println("Saved Feed ID: " + savedFeedId);

        // 피드가 실제로 저장되었는지 확인
        Optional<Feed> optionalFeed = feedJpaRepository.findById(savedFeedId);
        assert optionalFeed.isPresent();

        UserDto mockUserDto = UserDto.of(1L, "testUser", "test@example.com", "http://example.com/profile.jpg");
        when(userApiClient.getUserById(anyLong())).thenReturn(mockUserDto);
    }


    @Test
    @DisplayName("통합 테스트 - 실제 서비스, DB와 통합된 FeedDetail 조회")
    void getFeedDetailsTest() throws Exception {
        mockMvc.perform(get("/api/v1/feeds/" + savedFeedId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.id").value(savedFeedId))
                .andExpect(jsonPath("$.response.userId").value(1L))
                .andExpect(jsonPath("$.response.username").value("testUser"))
                .andExpect(jsonPath("$.response.profileImageUrl").value("http://example.com/profile.jpg"))
                .andExpect(jsonPath("$.response.title").value("Test Title"))
                .andExpect(jsonPath("$.response.content").value("Test Content"))
                .andExpect(jsonPath("$.response.address").value("Test Address"))
                .andExpect(jsonPath("$.response.longitude").value(127.123123))
                .andExpect(jsonPath("$.response.latitude").value(32.1323))
                .andExpect(jsonPath("$.response.placeType").value("CAFE"))
                .andExpect(jsonPath("$.response.likeCount").value(0));
    }
}
