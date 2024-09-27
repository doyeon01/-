package com.ssafy.handam.feed.presentation.api.feed;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.handam.feed.application.FeedService;
import com.ssafy.handam.feed.domain.PlaceType;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import com.ssafy.handam.feed.domain.repository.LikeRepository;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.infrastructure.jpa.FeedJpaRepository;
import com.ssafy.handam.feed.infrastructure.jpa.LikeJpaRepository;
import org.junit.jupiter.api.AfterEach;
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
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class FeedControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FeedJpaRepository feedJpaRepository;

    @Autowired
    private LikeJpaRepository likeJpaRepository;

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private LikeRepository likeRepository;

    @MockBean
    private UserApiClient userApiClient;

    @Autowired
    private FeedService feedService;

    private Long savedFeedId;

    @BeforeEach
    void setup() {
        Feed feed = Feed.builder()
                .title("Test Title")
                .content("Test Content")
                .imageUrl("http://example.com/feed.jpg")
                .address1("Test Address")
                .address2("Test Address")
                .longitude(127.123123)
                .latitude(32.1323)
                .placeType(PlaceType.CAFE)
                .userId(1L)
                .build();

        Feed savedFeed = feedJpaRepository.save(feed);
        savedFeedId = savedFeed.getId();

        UserDto mockUserDto = UserDto.of(1L, "testUser", "test@example.com", "http://example.com/profile.jpg");
        when(userApiClient.getUserById(anyLong())).thenReturn(mockUserDto);
    }

    @AfterEach
    void tearDown() {
        likeJpaRepository.deleteAll();
        feedJpaRepository.deleteAll();
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
                .andExpect(jsonPath("$.response.address1").value("Test Address"))
                .andExpect(jsonPath("$.response.address2").value("Test Address"))
                .andExpect(jsonPath("$.response.longitude").value(127.123123))
                .andExpect(jsonPath("$.response.latitude").value(32.1323))
                .andExpect(jsonPath("$.response.placeType").value("CAFE"))
                .andExpect(jsonPath("$.response.likeCount").value(0));
    }

    @DisplayName("통합 테스트 - 실제 서비스, DB와 통합된 Like 요청")
    @Test
    void likeFeedTest() throws Exception {
        mockMvc.perform(post("/api/v1/feeds/like/" + savedFeedId + "?userId=1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.feedId").value(savedFeedId))
                .andExpect(jsonPath("$.response.isLiked").value(true))
                .andExpect(jsonPath("$.response.likeCount").value(1));
    }

    @DisplayName("통합 테스트 - 실제 서비스, DB와 통합된 Unlike 요청")
    @Test
    void unlikeFeedTest() throws Exception {
        Feed feed = feedRepository.findById(savedFeedId)
                .orElseThrow(() -> new IllegalArgumentException("Feed not found"));

        likeRepository.save(Like.builder().userId(1L).feed(feed).build());

        mockMvc.perform(post("/api/v1/feeds/unlike/" + savedFeedId + "?userId=1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.feedId").value(savedFeedId))
                .andExpect(jsonPath("$.response.isLiked").value(false))
                .andExpect(jsonPath("$.response.likeCount").value(0));
    }

    @DisplayName("통합 테스트 - 실제 서비스, DB와 통합된 사용자가 누른 좋아요 FeedList 조회")
    @Test
    void getLikedFeedListTest() throws Exception {
        Feed feed = feedRepository.findById(savedFeedId)
                .orElseThrow(() -> new IllegalArgumentException("Feed not found"));
        System.out.println(savedFeedId);
        feedService.likeFeed(savedFeedId, 1L);
        likeRepository.save(Like.builder().userId(1L).feed(feed).build());
        mockMvc.perform(get("/api/v1/feeds/liked?userId=1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.feeds[0].id").value(savedFeedId))
                .andExpect(jsonPath("$.response.feeds[0].userId").value(1L))
                .andExpect(jsonPath("$.response.feeds[0].username").value("testUser"))
                .andExpect(jsonPath("$.response.feeds[0].userProfileImageUrl").value("http://example.com/profile.jpg"))
                .andExpect(jsonPath("$.response.feeds[0].title").value("Test Title"))
                .andExpect(jsonPath("$.response.feeds[0].address1").value("Test Address"))
                .andExpect(jsonPath("$.response.feeds[0].address2").value("Test Address"))
                .andExpect(jsonPath("$.response.feeds[0].longitude").value(127.123123))
                .andExpect(jsonPath("$.response.feeds[0].latitude").value(32.1323))
                .andExpect(jsonPath("$.response.feeds[0].placeType").value("CAFE"))
                .andExpect(jsonPath("$.response.feeds[0].likeCount").value(1));
    }

    @DisplayName("통합 테스트 - 실제 서비스, DB와 통합된 사용자가 생성한 FeedList 조회")
    @Test
    void getCreatedFeedListTest() throws Exception {
        mockMvc.perform(get("/api/v1/feeds/users/created?userId=1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.feeds[0].id").value(savedFeedId))
                .andExpect(jsonPath("$.response.feeds[0].userId").value(1L))
                .andExpect(jsonPath("$.response.feeds[0].username").value("testUser"))
                .andExpect(jsonPath("$.response.feeds[0].userProfileImageUrl").value("http://example.com/profile.jpg"))
                .andExpect(jsonPath("$.response.feeds[0].title").value("Test Title"))
                .andExpect(jsonPath("$.response.feeds[0].address1").value("Test Address"))
                .andExpect(jsonPath("$.response.feeds[0].address2").value("Test Address"))
                .andExpect(jsonPath("$.response.feeds[0].longitude").value(127.123123))
                .andExpect(jsonPath("$.response.feeds[0].latitude").value(32.1323))
                .andExpect(jsonPath("$.response.feeds[0].placeType").value("CAFE"))
                .andExpect(jsonPath("$.response.feeds[0].likeCount").value(0));
    }

    @DisplayName("통합 테스트 - 실제 서비스, DB와 통합된 피드 생성")
    @Test
    void createFeedTest() throws Exception {
        mockMvc.perform(post("/api/v1/feeds/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "  \"title\": \"Test Title\",\n" +
                                "  \"content\": \"Test Content\",\n" +
                                "  \"imageUrl\": \"http://example.com/feed.jpg\",\n" +
                                "  \"address1\": \"Test Address\",\n" +
                                "  \"address2\": \"Test Address\",\n" +
                                "  \"longitude\": 127.123123,\n" +
                                "  \"latitude\": 32.1323,\n" +
                                "  \"placeType\": \"CAFE\",\n" +
                                "  \"userId\": 1\n" +
                                "}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.userId").value(1L))
                .andExpect(jsonPath("$.response.username").value("testUser"))
                .andExpect(jsonPath("$.response.userProfileImageUrl").value("http://example.com/profile.jpg"))
                .andExpect(jsonPath("$.response.title").value("Test Title"))
                .andExpect(jsonPath("$.response.content").value("Test Content"))
                .andExpect(jsonPath("$.response.address1").value("Test Address"))
                .andExpect(jsonPath("$.response.address2").value("Test Address"))
                .andExpect(jsonPath("$.response.longitude").value(127.123123))
                .andExpect(jsonPath("$.response.latitude").value(32.1323))
                .andExpect(jsonPath("$.response.placeType").value("CAFE"))
                .andExpect(jsonPath("$.response.likeCount").value(0));
    }
}

