# 프로젝트 디렉토리 구조

이 문서는 프로젝트의 디렉토리 구조를 설명합니다.

# 디렉토리구조

- **/src**: 소스 코드

  - **/model**: 타입스크립트 타입

  - **/assets**: 정적 자산 (이미지, 폰트 등)

  - **/components**: 재사용 가능한 리액트 컴포넌트

    - **/atoms**: 가장 기본적인 컴포넌트 

      - **/button**: 버튼 컴포넌트
        - **ButtonFallow.tsx**: 팔로우 버튼 컴포넌트
        - **ButtonLogin.tsx**:  네이버 소셜 로그인
        - **ButtonMBTIChoice.tsx**:  MBTI 선택지
        - **ButtonMBTILike.tsx**:  MBTI 좋아요 선택지
        - **ButtonMBTINext.tsx**: MBTI 다음 버튼
        - **ButtonRefresh.tsx**:  메인페이지 새로고침
        - **ButtonLike.tsx**: 좋아요
        - **ButtonTags.tsx**: 메인페이지 태그
        - **ButtonFollow.tsx**: 탐색하기 팔로우
        - **ButtonSearchingMan.tsx**: 탐색하기 사람
        - **ButtonSearchingPlace.tsx**: 탐색하기 장소
        - **ButtonOpenChat.tsx**: 채팅 열기
        - **ButtonCloseChat.tsx**: 채팅 닫기
        - **ButtonSendMsg.tsx**: 채팅 보내기
        - **ButtonShare.tsx**: 피드 상세보기 공유하기
        - **ButtonComment.tsx**: 피드 상세보기 댓글 작성
        - **ButtonPlanWrite.tsx** 나만의 여행일정 만들기
        - **ButtonChoiceDate.tsx**: 여행계획 날짜 고르기
        - **ButtonCompanionWrite.tsx**: 동행계획 동행 모집
        - **ButtonCompanionConfirm.tsx** 동행계획 글 작성
        - **ButtonUpdateProfile.tsx**: 마이페이지 프로필 편집
        - **ButtonFeedWrite.tsx**: 마이페이지 피드 작성
        - **ButtonUploadPic.tsx**: 글 작성 사진 올리기
        - **ButtonFeedConfirm.tsx**: 글 작성 확인
        - **ButtonPlanDetailUpdate.tsx**: 마이페이지 일정 상세 수정
        - **ButtonSummary.tsx**: 마이페이지 포토카드 전체일정 요약
        - **ButtonPocaWrite.tsx**: 마이페이지 포토카드 생성
        - **ButtonPocaConfirm.tsx**: 마이페이지 포토카드 저장
        - **ButtonPocaShare.tsx**: 마이페이지 포토카드 공유
        - **ButtonCancel.tsx**: X 버튼
      - **/input**: 입력 컴포넌트
        - **Input.tsx**: 입력 컴포넌트

    - **/molecules**: 컴포넌트 조합 (카드, 폼 그룹 등)
      - **/Card**: 카드 컴포넌트
      - **/FormGroup**: 폼 그룹 컴포넌트
      - **/Dropdown**: 드롭다운 컴포넌트
      - **/Tab**: 탭 컴포넌트
      - **/ModalForm**: 모달 폼 컴포넌트


    - **/organisms**: 복합 컴포넌트 

      - **Navbar.tsx**: 네비게이션 바 컴포넌트
      - **footer.tsx**: 푸터 컴포넌트

      - **/Modal**: 모달 컴포넌트
        - **Modal.tsx**: 모달 컴포넌트
        - **ModalChat.tsx**: 채팅 모달 컴포넌트
        - **ModalFeedDetail;.tsx**: 피드 상세 모달 컴포넌트
        - **ModalCalendar.tsx**: 피드 상세 모달 컴포넌트
        - **ModalCompanionWrite.tsx**: 동행 구하기 글작성 모달 컴포넌트
        - **ModalUploadPic.tsx**:여행 피드 작성 사진올리기 모달 컴포넌트 
        - **ModalFeedWrite.tsx**:여행 피드 작성 모달 컴포넌트 
        - **ModalPocaDetail.tsx**:포토카드 상세 모달 컴포넌트
        - **ModalPocaWrite.tsx**:포토카드 작성 모달 컴포넌트

      - **/Carousel**: 캐러셀 컴포넌트
        - **Carousel.tsx**: 기본 캐러셀 컴포넌트
    
    - **/pages**: 각 페이지 컴포넌트
      - **RandingPage.tsx**:랜딩페이지 컴포넌트
      - **SurveyPage.tsx**:설문조사페이지 컴포넌트
      - **MainPage.tsx**:메인페이지 컴포넌트
      - **SearchPage.tsx**:탐색페이지 컴포넌트
      - **PlanPage.tsx**:여행계확페이지 컴포넌트
      - **CompanionPage.tsx**:동행하기 페이지 컴포넌트
      - **MyPage.tsx**:마이페이지 컴포넌트
      - **YourPage.tsx**:상대페이지 컴포넌트
      - **ScheduleDetail.tsx**:마이페이지 일정상세 페이지
      - **PocaPage.tsx**:마이페이지 포토카드 전체 일정 페이지

  - **/hooks**: 커스텀 훅

  - **/Recoil**: 리액트 컨텍스트 및 상태 관리 (Recoil 상태)

  - **/utils**: 유틸리티 함수

  - **/styles**: 전역 스타일 및 Tailwind CSS 설정

  - **/services**: API 서비스 및 비즈니스 로직

- **/public**: 정적 파일 (index.html, favicon 등)

- **/tests**: 테스트 파일

- **.env**: 환경 변수 파일

- **package.json**: 프로젝트 메타데이터 및 의존성

- **vite.config.ts**: Vite 설정 파일
---


## 파일 및 폴더 설명

### **/src/assets**
- 이미지, 폰트, 아이콘 등 정적 자산 파일을 저장합니다.

### **/src/components**
- **/atoms**: 기본적인 UI 컴포넌트
- **/molecules**: 컴포넌트 조합
- **/organisms**: 복합 UI 컴포넌트
- **/templates**: 페이지의 템플릿
- **/pages**: 실제 페이지 컴포넌트

### **/src/hooks**
- 커스텀 훅 정의

### **/src/context**
- 상태 관리 및 컨텍스트 설정

### **/src/utils**
- 헬퍼 함수 및 유틸리티

### **/src/styles**
- Tailwind CSS 설정 및 전역 스타일

### **/src/services**
- API 통신 및 비즈니스 로직

### **/public**
- 정적 파일 (HTML, Favicon 등)

### **/tests**
- 테스트 관련 파일