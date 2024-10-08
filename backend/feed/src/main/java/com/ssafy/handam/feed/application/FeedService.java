package com.ssafy.handam.feed.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.ssafy.handam.feed.application.dto.FeedDetailDto;
import com.ssafy.handam.feed.application.dto.FeedPreviewDto;
import com.ssafy.handam.feed.application.dto.UserDetailDto;
import com.ssafy.handam.feed.application.dto.request.feed.FeedCreationServiceRequest;
import com.ssafy.handam.feed.application.dto.request.feed.NearByClusterCenterServiceReuqest;
import com.ssafy.handam.feed.application.dto.request.feed.RecommendedFeedsForUserServiceRequest;
import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.entity.Like;
import com.ssafy.handam.feed.domain.service.FeedDomainService;
import com.ssafy.handam.feed.infrastructure.client.UserApiClient;
import com.ssafy.handam.feed.infrastructure.client.dto.UserDto;
import com.ssafy.handam.feed.infrastructure.elasticsearch.FeedDocument;
import com.ssafy.handam.feed.presentation.response.cluster.ClusterResponse;
import com.ssafy.handam.feed.presentation.response.feed.CreatedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedDetailResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedLikeResponse;
import com.ssafy.handam.feed.presentation.response.feed.FeedResponse;
import com.ssafy.handam.feed.presentation.response.feed.LikedFeedsByUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.NearbyClusterCenterResponse;
import com.ssafy.handam.feed.presentation.response.feed.RecommendedFeedsForUserResponse;
import com.ssafy.handam.feed.presentation.response.feed.SearchedFeedsResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.ml.clustering.Cluster;
import org.apache.commons.math3.ml.clustering.DBSCANClusterer;
import org.apache.commons.math3.ml.clustering.DoublePoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedService {

    private final FeedDomainService feedDomainService;
    private final UserApiClient userApiClient;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final Gson gson;

    public RecommendedFeedsForUserResponse getRecommendedFeedsForUser(RecommendedFeedsForUserServiceRequest request) {
        String createdDate = LocalDateTime.parse("2021-07-01T00:00:00")
                .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // FeedPreviewDto 생성 시 createdDate 추가
        FeedPreviewDto feedPreviewDto = new FeedPreviewDto(
                1L,
                1L,
                "placeName",
                "title",
                "content",
                "image-url",
                1L,
                0,
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
        return RecommendedFeedsForUserResponse.of(previewDtos, 0, false);
    }

    public SearchedFeedsResponse searchFeedsByKeywordSortedByLikeCount(String keyword, int page, int size,
                                                                       String accessToken) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "likeCount"));
        Page<FeedDocument> feedDocuments = feedDomainService.searchFeedsByKeywordSortedByLikeCount(keyword, pageable);
        UserDto userDto = userApiClient.getUserByToken(accessToken);

        List<FeedPreviewDto> feedPreviewDtos = feedDocuments.stream()
                .map(feedDocument -> {

                    return convertToFeedPreviewDto(feedDocument, userDto.id());
                }).toList();

        return SearchedFeedsResponse.of(feedPreviewDtos, feedDocuments.getNumber(), feedDocuments.hasNext());
    }

    public FeedDetailResponse getFeedDetails(Long feedId, String accessToken) {
        Feed feed = feedDomainService.findById(feedId);
        UserDetailDto userDetailDto = getUserDetailDto(feed.getUserId(), accessToken);
        return FeedDetailResponse.of(FeedDetailDto.of(feed, isLikedFeed(feed, userDetailDto.id())),
                userDetailDto.name(), userDetailDto.profileImageUrl());
    }

    public FeedResponse createFeed(FeedCreationServiceRequest request, String savedImagePath, String accessToken) {
        UserDto userDto = userApiClient.getUserById(request.userId(), accessToken);
        Feed feed = feedDomainService.createFeed(request, savedImagePath, userDto);
        return FeedResponse.from(feed, userDto);
    }

    public String saveImage(MultipartFile imageFile) {
        String UPLOAD_PATH = "/app/photos/";
        String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename()
                .replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
        Path path = Paths.get(UPLOAD_PATH + fileName);

        try {
            // 파일을 지정된 경로에 저장
            Files.copy(imageFile.getInputStream(), path);
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to save image";
        }

        return "https://j11c205a.p.ssafy.io/images/" + fileName;
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
    public LikedFeedsByUserResponse getLikedFeedsByUser(Long userId, Pageable pageable, String accessToken) {
        Page<Like> likesBy = feedDomainService.getLikesBy(userId, pageable);
        List<Long> feedIds = likesBy.getContent().stream()
                .map(like -> like.getFeed().getId())
                .toList();
        List<Feed> likedFeedsByUser = feedDomainService.getFeedByIds(feedIds);
        boolean hasNextPage = likesBy.hasNext();
        int currentPage = likesBy.getNumber();
        List<FeedPreviewDto> likedFeeds = getFeedPreviewDtoList(likedFeedsByUser,
                userApiClient.getUserById(userId, accessToken));
        return LikedFeedsByUserResponse.of(likedFeeds, currentPage, hasNextPage);
    }

    @Transactional(readOnly = true)
    public CreatedFeedsByUserResponse getCreatedFeedsByUser(Long userId, Pageable pageable, String accessToken) {
        Page<Feed> createdFeedsByUser = feedDomainService.getCreatedFeedsByUser(userId, pageable);
        List<FeedPreviewDto> createdFeeds = getFeedPreviewDtoList(
                createdFeedsByUser.getContent(),
                userApiClient.getUserById(userId, accessToken));
        return CreatedFeedsByUserResponse.of(createdFeeds, createdFeedsByUser.getNumber(),
                createdFeedsByUser.hasNext());
    }

    public List<ClusterResponse> getClusteredFeeds(Long userId, String token) {
        String redisKey = "userCluster:" + userId;
        List<Object> cachedData = redisTemplate.opsForList().range(redisKey, 0, -1);
        List<ClusterResponse> clusteredFeeds = new ArrayList<>();

        if (cacheMiss(cachedData)) {
            for (Object obj : cachedData) {
                ClusterResponse cluster = objectMapper.convertValue(obj, ClusterResponse.class);
                clusteredFeeds.add(cluster);
            }
        } else {
            clusteredFeeds = performClustering(userId, token);
            for (ClusterResponse cluster : clusteredFeeds) {
                try {
                    redisTemplate.opsForList().rightPush(redisKey, objectMapper.writeValueAsString(cluster));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
            redisTemplate.expire(redisKey, Duration.ofHours(1));
        }

        return clusteredFeeds;
    }

    public List<ClusterResponse> refreshClusteredFeeds(Long userId, String token) {
        String redisKey = "userCluster:" + userId;
        redisTemplate.delete(redisKey);
        List<ClusterResponse> refreshedFeeds = performClustering(userId, token);
        for (ClusterResponse cluster : refreshedFeeds) {
            try {
                redisTemplate.opsForList().rightPush(redisKey, objectMapper.writeValueAsString(cluster));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        redisTemplate.expire(redisKey, Duration.ofHours(1));
        return refreshedFeeds;
    }

    public NearbyClusterCenterResponse getNearbyClusterCenter(
            NearByClusterCenterServiceReuqest nearByClusterCenterServiceReuqest) {
        int page = nearByClusterCenterServiceReuqest.page();
        int size = nearByClusterCenterServiceReuqest.size();
        double latitude = nearByClusterCenterServiceReuqest.latitude();
        double longitude = nearByClusterCenterServiceReuqest.longitude();
        int distance = nearByClusterCenterServiceReuqest.distance();
        String accessToken = nearByClusterCenterServiceReuqest.token();

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "likeCount"));
        String distanceString = distance + "km";
        Page<FeedDocument> nearbyClusterCenter = feedDomainService.getNearbyClusterCenter(latitude, longitude,
                distanceString, pageable);
        UserDto userDto = userApiClient.getUserByToken(accessToken);
        List<FeedPreviewDto> feedPreviewDtoList = nearbyClusterCenter.stream()
                .map(feedDocument -> {
                    return convertToFeedPreviewDto(feedDocument,userDto.id());
                }).toList();

        return NearbyClusterCenterResponse.of(
                feedPreviewDtoList,
                nearbyClusterCenter.getNumber(),
                nearbyClusterCenter.hasNext()
        );
    }

    private boolean cacheMiss(List<Object> cachedData) {
        return cachedData == null || cachedData.isEmpty();
    }

    private List<ClusterResponse> performClustering(Long userId, String token) {
        Pageable allFeedsPageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.unsorted());
        List<Feed> feeds = feedDomainService.getLikedFeedsByUser(userId, allFeedsPageable);

        DBSCANClusterer<DoublePoint> dbscanClusterer = new DBSCANClusterer<>(0.09, 2);
        List<DoublePoint> points = feeds.stream()
                .map(feed -> new DoublePoint(new double[]{feed.getLatitude(), feed.getLongitude()}))
                .toList();

        List<Cluster<DoublePoint>> clusters = dbscanClusterer.cluster(points);
        List<ClusterResponse> clusteredFeeds = new ArrayList<>();

        for (Cluster<DoublePoint> cluster : clusters) {
            double[] centroid = calculateCentroid(cluster);
            List<FeedPreviewDto> feedsInCluster = new ArrayList<>();

            List<DoublePoint> points1 = cluster.getPoints();
            double[] point = points1.get(0).getPoint();
            double latitude = point[0];
            double longitude = point[1];

            Feed feed = searchFeedByLatitudeAndLongitude(latitude, longitude, feeds);

            if (feed != null) {
                UserDto userDto = userApiClient.getUserById(feed.getUserId(), token);
                feedsInCluster.add(FeedPreviewDto.from(feed, userDto.name(), userDto.profileImage(),
                        isLikedFeed(feed, userId)));
            }
            String clusterId = UUID.randomUUID().toString();
            clusteredFeeds.add(ClusterResponse.of(clusterId, centroid[0], centroid[1], feedsInCluster));
        }
        return clusteredFeeds;
    }

    private Feed searchFeedByLatitudeAndLongitude(double latitude, double longitude, List<Feed> feeds) {
        for (Feed feed : feeds) {
            if (feed.getLatitude() == latitude && feed.getLongitude() == longitude) {
                return feed;
            }
        }
        return null;
    }

    private double[] calculateCentroid(Cluster<DoublePoint> cluster) {
        double sumLat = 0;
        double sumLon = 0;
        int count = cluster.getPoints().size();

        for (DoublePoint point : cluster.getPoints()) {
            sumLat += point.getPoint()[0];
            sumLon += point.getPoint()[1];
        }

        return new double[]{sumLat / count, sumLon / count};
    }

    private List<FeedPreviewDto> getFeedPreviewDtoList(List<Feed> feeds, UserDto user) {
        return feeds.stream()
                .map(feed -> FeedPreviewDto.from(feed, user.name(), user.profileImage(),
                        isLikedFeed(feed, user.id())))
                .toList();
    }

    private boolean isLikedFeed(Feed feed, Long userId) {
        return feedDomainService.isLikedFeed(feed.getId(), userId);
    }

    private UserDetailDto getUserDetailDto(Long userId, String accessToken) {
        return UserDetailDto.from(userApiClient.getUserById(userId, accessToken));
    }

    private FeedPreviewDto convertToFeedPreviewDto(FeedDocument feedDocument,Long userId) {
        return new FeedPreviewDto(
                feedDocument.getId(),
                feedDocument.getTotalPlanId(),
                feedDocument.getPlaceName(),
                feedDocument.getTitle(),
                feedDocument.getContent(),
                feedDocument.getImageUrl(),
                feedDocument.getUserId(),
                feedDocument.getLikeCount(),
                feedDocument.getCommentCount(),
                feedDocument.getAddress1(),
                feedDocument.getAddress2(),
                feedDocument.getLongitude(),
                feedDocument.getLatitude(),
                feedDocument.getPlaceType(),
                feedDocument.getUserNickname(),
                feedDocument.getProfileImageUrl(),
                feedDomainService.isLikedFeed(feedDocument.getId(), userId),
                feedDocument.getCreatedDate().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        );
    }


    public RecommendedFeedsForUserResponse getRecommendedFeeds(Long userId, int page, int pageSize) {
        // Redis에서 피드 ID들을 가져와서 feedDomainService로 넘기는 부분
        List<String> recommendedFeedIds = getFeedIdsFromRedis("user:" + userId + ":recommended_feeds", page, pageSize);
        List<String> topLikedFeedIds = getFeedIdsFromRedis("user:" + userId + ":top_liked_feeds", page, pageSize);
        List<String> trendingFeedIds = getFeedIdsFromRedis("user:" + userId + ":trending_feeds", page, pageSize);
        List<String> randomFeedIds = getFeedIdsFromRedis("user:" + userId + ":random_feeds", page, pageSize);
        System.out.println(recommendedFeedIds.get(0));
        // Feed IDs를 Long으로 변환
        List<Long> recommendedFeedIdsLong = convertStringIdsToLong(recommendedFeedIds);
        List<Long> topLikedFeedIdsLong = convertStringIdsToLong(topLikedFeedIds);
        List<Long> trendingFeedIdsLong = convertStringIdsToLong(trendingFeedIds);
        List<Long> randomFeedIdsLong = convertStringIdsToLong(randomFeedIds);

        // feedDomainService로 feedId들을 넘겨서 추천 피드를 가져옴
        return feedDomainService.getRecommendedFeeds(
                recommendedFeedIdsLong,
                topLikedFeedIdsLong,
                trendingFeedIdsLong,
                randomFeedIdsLong,
                page,
                pageSize
        );
    }

    private List<Long> convertStringIdsToLong(List<String> stringIds) {
        return stringIds.stream()
                .flatMap(stringId -> {
                    if (stringId.startsWith("[")) {
                        List<Long> parsedIds = gson.fromJson(stringId, new TypeToken<List<Long>>() {}.getType());
                        return parsedIds.stream();
                    } else {
                        return Stream.of(Long.parseLong(stringId));
                    }
                })
                .collect(Collectors.toList());
    }

    // Redis에서 피드 ID를 가져오는 메서드
    private List<String> getFeedIdsFromRedis(String redisKey, int page, int pageSize) {
        long start = (long) page * pageSize;
        long end = start + pageSize - 1;
        return redisTemplate.opsForList().range(redisKey, start, end)
                .stream()
                .map(Object::toString) // Object를 String으로 변환
                .collect(Collectors.toList());
    }
}
