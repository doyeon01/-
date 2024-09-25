package com.ssafy.handam.feed.domain.service;


import com.ssafy.handam.feed.domain.entity.Feed;
import com.ssafy.handam.feed.domain.repository.FeedRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedDomainService {

    private final FeedRepository feedRepository;

    public Feed findById(Long id) {
        return feedRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Feed not found"));
    }

    public Feed save(Feed feed) {
        return feedRepository.save(feed);
    }
}