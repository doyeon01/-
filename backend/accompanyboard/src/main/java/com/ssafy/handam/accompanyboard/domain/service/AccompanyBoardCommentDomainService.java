package com.ssafy.handam.accompanyboard.domain.service;

import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import com.ssafy.handam.accompanyboard.domain.repository.AccompanyBoardCommentRepository;
import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardCommentDomainService {

    private final AccompanyBoardCommentRepository accompanyBoardCommentRepository;

    public Comment createComment(AccompanyBoardCommentCreationRequest request) {
        return accompanyBoardCommentRepository.save(Comment.builder()
                .userId(request.userId())
                .accompanyBoardArticleId(request.accompanyBoardArticleId())
                .content(request.content())
                .build());
    }

    public List<Comment> getCommentsByAccompanyBoardArticleId (Long accompanyBoardArticleId) {
        return accompanyBoardCommentRepository.findByAccompanyBoardArticleId(accompanyBoardArticleId);
    }

    public int getCommentCountByAccompanyBoardArticleId (Long accompanyBoardArticleId) {
        return accompanyBoardCommentRepository.findByAccompanyBoardArticleId(accompanyBoardArticleId).size();
    }
}
