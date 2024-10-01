package com.ssafy.handam.accompanyboard.presentation.api.comment;

import static com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.success;
import static com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest.toServiceRequest;

import com.ssafy.handam.accompanyboard.application.AccompanyBoardCommentService;
import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
import com.ssafy.handam.accompanyboard.presentation.request.comment.AccompanyBoardCommentCreationRequest;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentResponse;
import com.ssafy.handam.accompanyboard.presentation.response.comment.AccompanyBoardCommentsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/accompanyboards/comments")
@RequiredArgsConstructor
public class AccompanyBoardCommentController {

    private final AccompanyBoardCommentService accompanyBoardCommentService;

    @PostMapping("/create")
    public ApiResult<AccompanyBoardCommentResponse> createArticle(@RequestBody AccompanyBoardCommentCreationRequest request) {
        return success(accompanyBoardCommentService.createComment(toServiceRequest(request)));
    }

    @GetMapping("/{accompanyBoardArticleId}")
    public ApiResult<AccompanyBoardCommentsResponse> getCommentsByAccompanyBoardArticleId(@PathVariable Long accompanyBoardArticleId) {
        return success(accompanyBoardCommentService.getCommentsByAccompanyBoardArticleId(accompanyBoardArticleId));
    }

}
