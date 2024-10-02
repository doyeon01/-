package com.ssafy.handam.feed.application;

import com.ssafy.handam.feed.application.dto.FeedDetailDto;
import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.UserDetailDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.service.FeedDomainService;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import com.ssafy.handam.feed.presentation.response.feed.CreatedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.LikedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.SearchedFeedsResponse;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedService {

    private final FeedDomainService feedDomainService;
    private final UserApiClient userApiClient;
    private final FileSystem fileSystem;
    @Value("${hadoop.replication.factor:2}") // default to 2
    private short replicationFactor;

    public RecommendedFeedsForUserResponse getRecommendedFeedsForUser(RecommendedFeedsForUserServiceRequest request) {
        String createdDate = LocalDateTime.parse("2021-07-01T00:00:00")
                .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // FeedPreviewDto 생성 시 createdDate 추가
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(
                1L,
                "title",
                "content",
                "image-url",
                1L,
                0,
                "address1",
                "address2",
                Double.valueOf(32.1323),  // double을 명시적으로 Double로 변환
                Double.valueOf(127.123123),  // double을 명시적으로 Double로 변환
                "CAFE",
                "username",
                "profileImageUrl",
                true,
                createdDate // 생성일자
        );
        List<FeedPreviewDto> previewDtos = List.of(feedPreviewDto);
        return RecommendedFeedsForUserResponse.of(previewDtos);
    }

    public SearchedFeedsResponse searchFeedsByKeywordSortedByLikeCount(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "likeCount"));
        Page<FeedDocument> feedDocuments = feedDomainService.searchFeedsByKeywordSortedByLikeCount(keyword, pageable);

        List<FeedPreviewDto> feedPreviewDtos = feedDocuments.stream()
                .map(feedDocument -> {
                    UserDto userDto = userApiClient.getUserById(feedDocument.getUserId());
                    return convertToFeedPreviewDto(feedDocument, userDto);
                }).toList();

        return SearchedFeedsResponse.of(feedPreviewDtos);
    }

    public FeedDetailResponse getFeedDetails(Long feedId) {
        Feed feed = feedDomainService.findById(feedId);
        UserDetailDto userDetailDto = getUserDetailDto(feed.getUserId());
        return FeedDetailResponse.of(FeedDetailDto.of(feed, isLikedFeed(feed, userDetailDto.id())),
                userDetailDto.name(), userDetailDto.profileImageUrl());
    }

    public FeedResponse createFeed(FeedCreationServiceRequest request, String savedImagePath) {
        Feed feed = feedDomainService.createFeed(request, savedImagePath);
        return FeedResponse.from(feed, userApiClient.getUserById(feed.getUserId()));
    }

    public String saveImage(MultipartFile imageFile) {
        String hdfsPath = "/images/" + imageFile.getOriginalFilename();
        try (FSDataOutputStream outputStream  = fileSystem.create(new Path(hdfsPath), replicationFactor)) {
            outputStream.write(imageFile.getBytes());
            return hdfsPath;
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to sa ve image");
        }
    }

    public FeedLikeResponse likeFeed(Long feedId, Long userId) {
        feedDomainService.likeFeed(feedId, userId);
        int size = feedDomainService.countUpLike(feedId).size();
        return FeedLikeResponse.of(feedId, true, size);
    }

    public FeedLikeResponse unlikeFeed(Long feedId, Long userId) {
        feedDomainService.unlikeFeed(feedId, userId);
        return FeedLikeResponse.of(feedId, false, feedDomainService.countDownLike(feedId).size());
    }

    @Transactional(readOnly = true)
    public LikedFeedsByUserResponse getLikedFeedsByUser(Long userId, Pageable pageable) {
        List<FeedPreviewDto> likedFeeds = getFeedPreviewDtoList(feedDomainService.getLikedFeedsByUser(userId, pageable),
                userApiClient.getUserById(userId));
        return LikedFeedsByUserResponse.of(likedFeeds);
    }

    @Transactional(readOnly = true)
    public CreatedFeedsByUserResponse getCreatedFeedsByUser(Long userId, Pageable pageable) {
        List<FeedPreviewDto> createdFeeds = getFeedPreviewDtoList(
                feedDomainService.getCreatedFeedsByUser(userId, pageable),
                userApiClient.getUserById(userId));
        return CreatedFeedsByUserResponse.of(createdFeeds);
    }

    private List<FeedPreviewDto> getFeedPreviewDtoList(List<Feed> feeds, UserDto user) {
        return feeds.stream()
                .map(feed -> FeedPreviewDto.from(feed, user.name(), user.profileImageUrl(),
                        isLikedFeed(feed, user.id())))
                .toList();
    }

    private boolean isLikedFeed(Feed feed, Long userId) {
        return feedDomainService.isLikedFeed(feed.getId(), userId);
    }

    private UserDetailDto getUserDetailDto(Long userId) {
        return UserDetailDto.from(userApiClient.getUserById(userId));
    }

    private FeedPreviewDto convertToFeedPreviewDto(FeedDocument feedDocument, UserDto userDto) {
        return new FeedPreviewDto(
                feedDocument.getId(),
                feedDocument.getTitle(),
                feedDocument.getContent(),
                feedDocument.getImageUrl(),
                feedDocument.getUserId(),
                feedDocument.getLikeCount(),
                feedDocument.getAddress1(),
                feedDocument.getAddress2(),
                feedDocument.getLongitude(),
                feedDocument.getLatitude(),
                feedDocument.getPlaceType(),
                userDto.name(),
                userDto.profileImageUrl(),
                feedDomainService.isLikedFeed(feedDocument.getId(), userDto.id()),
                feedDocument.getCreatedDate().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        );
    }
}
