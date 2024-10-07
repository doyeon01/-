package com.ssafy.handam.photocard.infrastructure.client;

import com.ssafy.handam.photocard.infrastructure.client.dto.PhotoCardUrlDto;
import com.ssafy.handam.photocard.presentation.request.PhotoCardCreationRequest;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GpuApiClient {

    private final RestTemplate restTemplate;

    @Value("${gpu.service.url}")
    private String gpuServiceUrl;

    public PhotoCardUrlDto getPhotoCardUrl(PhotoCardCreationRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PhotoCardCreationRequest> requestEntity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<PhotoCardUrlDto> response = restTemplate.exchange(
                    gpuServiceUrl + "/generate",
                    HttpMethod.POST,
                    requestEntity,
                    PhotoCardUrlDto.class
            );

            return response.getBody();
        } catch (HttpClientErrorException e) {
            // 클라이언트 측 오류 (4xx)
            System.err.println("Client error occurred while sending request to GPU service: "
                    + e.getStatusCode() + " " + e.getResponseBodyAsString());
        } catch (HttpServerErrorException e) {
            // 서버 측 오류 (5xx)
            System.err.println("Server error occurred while sending request to GPU service: "
                    + e.getStatusCode() + " " + e.getResponseBodyAsString());
        } catch (RestClientException e) {
            // 기타 RestTemplate 관련 오류
            System.err.println("An error occurred while sending request to GPU service: "
                    + e.getMessage());
        } catch (Exception e) {
            // 그 외 모든 예외 처리
            System.err.println("Unexpected error occurred: " + e.getMessage());
        }

        // 예외 발생 시 null 반환
        return null;
    }
}
