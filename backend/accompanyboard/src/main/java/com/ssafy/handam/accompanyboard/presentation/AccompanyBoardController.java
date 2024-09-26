//package com.ssafy.handam.accompanyboard.presentation;
//
//import static com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.success;
//
//import com.ssafy.handam.accompanyboard.domain.entity.Article;
//import com.ssafy.handam.accompanyboard.domain.valueobject.response.ArticleInfoResponse;
//import com.ssafy.handam.accompanyboard.domain.valueobject.response.ArticleListResponse;
//import com.ssafy.handam.accompanyboard.presentation.api.ApiUtils.ApiResult;
//import com.ssafy.handam.accompanyboard.presentation.request.AccompanyBoardArticleRequest;
//import java.util.ArrayList;
//import java.util.List;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/v1/accompanyboard/article")
//public class AccompanyBoardController {
//
//    @GetMapping("/{id}")
//    public ApiResult<ArticleInfoResponse> getArticle(@PathVariable("id") Long id) {
//
//        Article article = Article.builder()
//                            .id(id)
//                            .user_id(1L)
//                            .schedule_id(1L)
//                            .title("동행 게시글 제목")
//                            .description("동행 게시글 내용")
//                            .build();
//        ArticleInfoResponse response = ArticleInfoResponse.of(article);
//        return success(response);
//    }
//
//    @GetMapping("/articles")
//    public ApiResult<List<ArticleInfoResponse>> getArticles() {
//        List<Article> articles = new ArrayList<>();
//        articles.add(Article.builder()
//                            .id(1L)
//                            .user_id(1L)
//                            .schedule_id(1L)
//                            .title("동행 게시글 제목")
//                            .description("동행 게시글 내용")
//                            .build());
//
//        articles.add(Article.builder()
//                            .id(2L)
//                            .user_id(2L)
//                            .schedule_id(2L)
//                            .title("동행 게시글 제목2")
//                            .description("동행 게시글 내용2")
//                            .build());
//
//        articles.add(Article.builder()
//                            .id(3L)
//                            .user_id(3L)
//                            .schedule_id(3L)
//                            .title("동행 게시글 제목3")
//                            .description("동행 게시글 내용3")
//                            .build());
//
//
//        List<ArticleInfoResponse> response = ArticleListResponse.of(articles);
//        return success(response);
//    }
//
//    @PostMapping("/article")
//    public ApiResult<Void> postArticle(@RequestBody AccompanyBoardArticleRequest request) {
//        return success(null);
//    }
//}
