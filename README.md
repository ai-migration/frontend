# Frontend — AI Code Migration Platform

<img width="2537" height="1298" alt="image" src="https://github.com/user-attachments/assets/548c1f9b-4ac8-456b-bd04-3d30329ce3a0" />

현대적인 **React + Vite** 기반의 프론트엔드입니다. AI 코드 변환·보안 점검·리포트 자동 생성 등 백엔드 기능과 유기적으로 연동되며, 가볍고 빠른 개발 경험(HMR/코드 스플리팅)을 제공합니다.

---

## 📚 목차
- [개요](#-개요)
- [기술 스택](#-기술-스택)
- [스크립트 & 워크플로우](#-스크립트--워크플로우)
- [빠른 시작](#-빠른-시작)
- [환경 변수](#-환경-변수)
- [프로젝트 구조(예시)](#-프로젝트-구조예시)
- [UX/UI 하이라이트](#-uxui-하이라이트)
- [품질/테스트/성능](#-품질테스트성능)
- [배포](#-배포)
- [링크](#-링크)
- [부록: 첨부 문서](#-부록-첨부-문서)

---

## 🔎 개요
- **목표**: 다양한 레거시 코드를 eGovFrame 표준 구조로 변환하는 AI 서비스의 웹 UI 제공
- **특징**
  - 실시간 진행 상태 표시(SSE 기반)와 결과 Diff 비교
  - 3D/비주얼 이펙트(Three.js, Vanta.js)로 데모/랜딩의 임팩트 강화
  - 표준화된 라우팅/상태/네트워크 계층으로 유지보수 용이

---

## ⚙️ 기술 스택

| 영역 | 기술 |
|---|---|
| **프레임워크/도구** | **React 18**, **Vite**, CRA |
| **라우팅** | React Router v6 |
| **네트워킹** | Axios, Fetch, **qs**, **SSE(EventSource)**, JWT |
| **애니메이션/그래픽** | **Framer Motion**, React Spring, React Datepicker, **Three.js**, **Vanta.js** |
| **문서/코드 뷰어** | React Markdown(+Remark GFM), React Syntax Highlighter, Diff Viewer |
| **품질/테스트** | **ESLint**, Prettier, Testing Library, **Vitest** |
| **성능 분석** | **Web Vitals**, 코드 스플리팅/지연 로딩, 메모이제이션 |
| **기타** | UUID, **eGovFrame React**, (선택) TypeScript, SWC |
| **배포/CI** | Docker, Docker Compose, GitHub Actions |

> 표기: **굵게**는 주요 도입 요소

---

## 🧰 스크립트 & 워크플로우

| 스크립트 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 (Vite HMR) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run preview` | 로컬에서 빌드 결과 미리보기 |
| `npm run test` | 단위 테스트(Vitest + RTL) 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run format` | Prettier 포맷팅(프로젝트 설정에 따라) |

---

## 🚀 빠른 시작

### 1) 설치
```bash
npm install
```

### 2) 실행
```bash
npm run dev
```

### 3) (선택) 빌드/테스트
```bash
npm run build
npm run test
```

> API CORS는 **Vite 프록시** 또는 서버 측 헤더로 처리하는 구성을 권장합니다.

---

## 🔧 환경 변수

루트에 `.env`를 두고 다음과 같이 설정합니다(예시):

```
VITE_API_BASE=http://localhost:8088
VITE_AUTH_JWT_KEY=your-jwt-key
VITE_SSE_ENABLED=true
```

- `VITE_API_BASE`: 백엔드 API 베이스 URL
- `VITE_AUTH_JWT_KEY`: JWT 보관/전달용 키(클라이언트 저장 시 주의)
- `VITE_SSE_ENABLED`: SSE 사용 여부 플래그

> 보안 민감 값은 프론트에 노출되지 않도록 백엔드 프록시를 권장합니다.

---

## 🗂 프로젝트 구조(예시)

```
src/
  assets/           # 이미지/아이콘/폰트
  components/       # 재사용 UI 컴포넌트
  pages/            # 라우트 페이지 (코드 변환, 결과, 리포트 등)
  hooks/            # 커스텀 훅(useFetch, useSSE 등)
  api/              # axios 인스턴스/인터셉터, API 클라이언트
  routes/           # React Router v6 라우팅 구성
  utils/            # 헬퍼, 스토리지(session/local) 래퍼
  styles/           # 전역 스타일, 모듈 CSS
  main.tsx(x)       # 앱 엔트리
  App.tsx(x)        # 라우트/레이아웃 루트
```

- 코드 스플리팅: 라우트 단위 **지연 로딩**으로 초기 로드 최소화
- 상태: 로컬 state 중심 + URL 파라미터/스토리지 병행
- 에셋: 빌드 시 자동 최적화(Image/Font/Chunk)

---

## 🎨 UX/UI 하이라이트
- **Framer Motion**으로 레이아웃 전환/입장·퇴장/제스처 애니메이션
- **Three.js, Vanta.js**로 랜딩/데모 섹션에 인터랙티브 효과
- **Diff Viewer + Syntax Highlighter**로 변환 전/후 코드 가독성 극대화
- **React Markdown + Remark GFM**으로 표/체크리스트/노트 문서화

---

## ✅ 품질/테스트/성능
- **ESLint + Prettier** 규칙으로 일관된 코드 스타일
- **Vitest + Testing Library**로 컴포넌트/훅 테스트
- **Web Vitals** 수집: LCP/CLS/FID 모니터링
- **메모이제이션**(useMemo/useCallback) 및 **코드 스플리팅**으로 렌더/번들 최적화

---

## 🚢 배포
- **Docker/Compose**로 컨테이너 이미지화
- **GitHub Actions**로 빌드/테스트/배포 파이프라인 구성
- 정적 호스팅(CloudFront/S3, Vercel, Netlify) 또는 Nginx/Node 서버 서빙

---

## 🔗 링크
- **Repository**: (프로젝트 GitHub URL)
- **Live Demo**: (배포 URL)
- **API 문서**: (Swagger UI URL)

---

## 📎 부록: 첨부 문서
<details>
<summary>열기/닫기</summary>

(첨부 문서가 아래에 원문으로 포함됩니다.)

# 🚀 프론트엔드 기술 스택 포트폴리오

## 📋 프로젝트 개요

**AI Code Migration Platform** - React 기반의 현대적인 웹 애플리케이션으로, AI 기반 코드 변환 및 테스트 자동화를 지원하는 포괄적인 개발 도구입니다.

---

## 📱 핵심 프레임워크 & 라이브러리

### **React 생태계**
- **React 18.3.1** - 최신 버전의 함수형 컴포넌트 기반 UI 라이브러리
- **React Router DOM 6.4.0** - SPA 라우팅 및 네비게이션
- **React Hooks** - useState, useEffect, useCallback, useRef, useMemo 등 활용
- **Custom Hooks** - useDebounce 등 재사용 가능한 커스텀 훅 구현

### **빌드 도구 & 개발 환경**
- **Vite 5.4.19** - 최신 ES 모듈 기반 빌드 도구 (빠른 HMR)
- **SWC** - Rust 기반 빠른 JavaScript/TypeScript 컴파일러
- **ESLint** - 코드 품질 관리 및 린팅
- **Vitest** - Vite 기반 테스트 프레임워크

---

## 🎨 UI/UX & 애니메이션

### **스타일링 & 디자인**
- **CSS3** - 모던 CSS 기능 활용 (Grid, Flexbox, CSS Variables)
- **Responsive Design** - 모바일 퍼스트 반응형 웹 디자인
- **CSS Animations** - Keyframes, Transitions, Transforms 활용
- **Backdrop Filter** - 블러 효과 및 글래스모피즘 디자인

### **애니메이션 라이브러리**
- **Framer Motion 12.23.12** - 고급 애니메이션 및 제스처
- **React Spring 10.0.1** - 물리 기반 애니메이션
- **Three.js 0.178.0** - 3D 그래픽 및 WebGL 렌더링
- **Vanta.js 0.5.24** - 인터랙티브 배경 애니메이션

---

## 🌐 네트워킹 & API 통신

### **HTTP 클라이언트**
- **Axios 1.11.0** - Promise 기반 HTTP 클라이언트
- **Fetch API** - 네이티브 브라우저 API 활용
- **EventSource** - Server-Sent Events 실시간 통신

### **API 통합**
- **RESTful API** - 백엔드와의 REST 통신
- **Proxy Configuration** - Vite 프록시를 통한 CORS 해결
- **JWT Authentication** - 토큰 기반 인증 시스템

---

## 🔧 개발 도구 & 유틸리티

### **코드 품질**
- **ESLint** - 코드 스타일 및 품질 검사
- **Prettier** - 코드 포맷팅
- **TypeScript Support** - 타입 안정성 (JSX + TS)

### **유틸리티 라이브러리**
- **UUID 11.1.0** - 고유 식별자 생성
- **QS 6.11.0** - URL 쿼리 파라미터 처리
- **React Markdown 10.1.0** - 마크다운 렌더링
- **React Syntax Highlighter 15.6.1** - 코드 하이라이팅

---

## 🎮 인터랙티브 기능

### **게임 & 엔터테인먼트**
- **Canvas API** - HTML5 Canvas를 활용한 Dino Game 구현
- **Game Loop** - requestAnimationFrame 기반 게임 루프
- **Collision Detection** - 게임 오브젝트 충돌 감지

### **챗봇 & AI**
- **AI Chatbot Integration** - FastAPI 기반 챗봇 연동
- **Real-time Messaging** - 실시간 메시지 교환
- **Action Buttons** - 인터랙티브 액션 버튼

---

## 📊 데이터 관리 & 상태

### **상태 관리**
- **React State** - 로컬 상태 관리
- **Session Storage** - 사용자 세션 데이터 관리
- **Local Storage** - 브라우저 로컬 데이터 저장

### **폼 처리**
- **React Datepicker 4.8.0** - 날짜 선택 컴포넌트
- **Form Validation** - 클라이언트 사이드 유효성 검사
- **File Upload** - 드래그 앤 드롭 파일 업로드

---

## 🚀 배포 & DevOps

### **컨테이너화**
- **Docker** - 컨테이너 기반 배포
- **Docker Compose** - 멀티 컨테이너 오케스트레이션
- **Node.js Alpine** - 경량화된 Node.js 이미지

### **CI/CD**
- **GitHub Actions** - 자동화된 빌드 및 테스트
- **Automated Testing** - Vitest 기반 자동 테스트
- **Code Quality Checks** - 린팅 및 포맷팅 자동화

---

## 🔍 테스팅 & 품질 보증

### **테스트 프레임워크**
- **Vitest** - Vite 기반 테스트 러너
- **Testing Library** - React 컴포넌트 테스팅
- **JSDOM** - 브라우저 환경 시뮬레이션

### **성능 모니터링**
- **Web Vitals** - Core Web Vitals 측정
- **Performance Monitoring** - 애플리케이션 성능 추적

---

## 📱 반응형 & 접근성

### **반응형 디자인**
- **Mobile-First Approach** - 모바일 우선 설계
- **CSS Grid & Flexbox** - 현대적 레이아웃 시스템
- **Media Queries** - 다양한 화면 크기 대응

### **접근성 (A11y)**
- **ARIA Labels** - 스크린 리더 지원
- **Keyboard Navigation** - 키보드 네비게이션
- **Focus Management** - 포커스 트랩 및 관리

---

## 🎯 특별한 기술적 특징

### **1. 모던 React 패턴**
- 함수형 컴포넌트 기반 아키텍처
- 커스텀 훅을 통한 로직 재사용
- React.memo, useMemo, useCallback을 통한 성능 최적화

### **2. 실시간 기능**
- Server-Sent Events (SSE) 구현
- WebSocket 기반 실시간 통신
- 실시간 진행률 표시 및 상태 업데이트

### **3. 3D & 고급 애니메이션**
- Three.js를 활용한 3D 렌더링
- Canvas API 기반 게임 개발
- Framer Motion을 통한 부드러운 애니메이션

### **4. AI 통합**
- FastAPI 기반 챗봇 연동
- 자연어 처리 기능
- AI 기반 코드 분석 및 변환

### **5. 게임 개발**
- HTML5 Canvas 기반 Dino Game
- 물리 엔진 구현 (중력, 충돌 감지)
- 게임 루프 및 애니메이션 시스템

### **6. 마이크로프론트엔드 아키텍처**
- 모듈화된 컴포넌트 설계
- 재사용 가능한 UI 컴포넌트
- 컴포넌트 기반 상태 관리

### **7. 성능 최적화**
- 코드 스플리팅 및 지연 로딩
- 메모이제이션을 통한 렌더링 최적화
- 이미지 최적화 및 압축

---

## 📈 기술적 성과

### **개발 생산성**
- Vite를 통한 빠른 개발 서버 (HMR)
- ESLint + Prettier를 통한 일관된 코드 스타일
- TypeScript 지원으로 타입 안정성 확보

### **사용자 경험**
- 반응형 디자인으로 모든 디바이스 지원
- 부드러운 애니메이션과 인터랙션
- 접근성 고려한 UI/UX 설계

### **성능 최적화**
- 번들 크기 최적화
- 이미지 및 에셋 최적화
- Core Web Vitals 개선

### **확장성**
- 모듈화된 컴포넌트 아키텍처
- 재사용 가능한 커스텀 훅
- 플러그인 기반 기능 확장

---

## 🔗 관련 링크

- **GitHub Repository**: [프로젝트 링크]
- **Live Demo**: [배포된 사이트 링크]
- **API Documentation**: [Swagger UI 링크]

---

## 📝 결론

이 프로젝트는 **현대적인 웹 개발의 모든 핵심 기술**을 포괄하며, 특히 **AI 통합**, **실시간 기능**, **고급 애니메이션**, **게임 개발** 등 차별화된 기술력을 보여주는 포트폴리오 프로젝트입니다.

React 18의 최신 기능부터 Three.js를 활용한 3D 렌더링, Canvas API 기반 게임 개발, AI 챗봇 통합까지 다양한 기술 스택을 활용하여 사용자에게 풍부하고 인터랙티브한 경험을 제공합니다.


</details>
