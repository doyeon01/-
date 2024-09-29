package com.ssafy.handam.accompanyboard.application;

import com.ssafy.handam.accompanyboard.application.dto.AccompanyBoardCommentDto;
import com.ssafy.handam.accompanyboard.domain.entity.Comment;
import com.ssafy.handam.accompanyboard.domain.service.AccompanyBoardCommentDomainService;
import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class AccompanyBoardCommentService {

    private final AccompanyBoardCommentDomainService accompanyBoardCommentDomainService;

    public AccompanyBoardCommentResponse createComment(AccompanyBoardCommentCreationRequest request) {
        Comment comment = accompanyBoardCommentDomainService.createComment(request);
        return AccompanyBoardCommentResponse.of(AccompanyBoardCommentDto.of(comment));
    }
}
