package com.ssafy.handam.accompanyboard.domain.service;

import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardArticleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardArticleDomainService {

    private final AccompanyBoardArticleRepository accompanyBoardArticleRepository;

}
