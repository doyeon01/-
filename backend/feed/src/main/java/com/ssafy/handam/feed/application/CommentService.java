package com.ssafy.handam.feed.application;


import com.ssafy.handam.feed.application.dto.request.comment.CreateCommentServiceRequest;
import com.ssafy.handam.feed.application.dto.response.comment.CreateCommentServiceResponse;
import com.ssafy.handam.feed.domain.dto.request.comment.CreateCommentDomainRequest;
import com.ssafy.handam.feed.domain.service.CommentDomainService;
import com.ssafy.handam.feed.presentation.response.comment.CreateCommentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentDomainService commentDomainService;

    public CreateCommentResponse save(CreateCommentServiceRequest request) {
        CreateCommentServiceResponse response = commentDomainService.save(CreateCommentDomainRequest.from(request));
        return CreateCommentResponse.from(response);
    }
}
