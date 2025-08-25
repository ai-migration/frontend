import { useEffect, useState, useRef, useCallback } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import URL from "@/constants/url";
import CODE from "@/constants/code";

//COMMON
import EgovHeader from "@/components/EgovHeader";
import EgovFooter from "@/components/EgovFooter";
import EgovInfoPopup from "@/components/EgovInfoPopup";
import EgovError from "@/components/EgovError";
import GlobalNoticeIcon from "@/components/GlobalNoticeIcon";
import GlobalChatWidget from "@/components/GlobalChatWidget";

import EgovMain from "@/pages/main/EgovMain";
import EgovLogin from "@/pages/login/EgovLogin";
import EgovSignup from "@/pages/signup/EgovSignup";
import EgovSignupAgree from "@/pages/signup/EgovSignupAgree";
import EgovSignupForm from "@/pages/signup/EgovSignupForm";

//SNS
import SnsNaverCallback from "@/components/sns/SnsNaverCallback";
import SnsKakaoCallback from "@/components/sns/SnsKakaoCallback";

//ABOUT
import EgovAboutSite from "@/pages/about/EgovAboutSite";
import EgovAboutHistory from "@/pages/about/EgovAboutHistory";
import EgovAboutOrganization from "@/pages/about/EgovAboutOrganization";
import EgovAboutLocation from "@/pages/about/EgovAboutLocation";

//INTRO
import EgovIntroTransform from "@/pages/intro/EgovIntroTransform";
import EgovIntroSecurity from "@/pages/intro/EgovIntroSecurity";
import EgovIntroChatbot from "@/pages/intro/EgovIntroChatbot";

//SUPPORT
import EgovSupportDownloadList from "@/pages/support/download/EgovDownloadList";
import EgovSupportDownloadDetail from "@/pages/support/download/EgovDownloadDetail";
import EgovSupportDownloadCreate from "@/pages/support/download/EgovDownloadCreate";
import EgovSupportQnaList from "@/pages/support/qna/EgovQnaList";
import EgovSupportQnaDetail from "@/pages/support/qna/EgovQnaDetail";
import EgovSupportApply from "@/pages/support/apply/EgovSupportApply";
// SUPPORT 빅프 추가 구현 
import EgovSupportIntro from "@/pages/support/transform/EgovSupportIntro";
import EgovSupportTransformation from "@/pages/support/transform/EgovSupportTransformation";
import EgovSupportViewTransformation from "@/pages/support/transform/EgovSupportViewTransformation";
import EgovSupportViewTransformationDetail from "@/pages/support/transform/EgovSupportViewTransformationDetail";
import EgovSupportViewTest from "@/pages/support/transform/EgovSupportViewTest";
import EgovSupportDownload from "@/pages/support/transform/EgovSupportDownload";
import EgovSecurityIntro from "@/pages/support/security/EgovSecurityIntro";
import EgovSecurityDetect from "@/pages/support/security/EgovSecurityDetect";
import EgovSecurityDetectDetail from "@/pages/support/security/EgovSecurityDetectDetail";
import EgovSecurityCheck from "@/pages/support/security/EgovSecurityCheck";
import EgovSecurityScan from "@/pages/support/security/EgovSecurityScan";
import EgovSecurityDownload from "@/pages/support/security/EgovSecurityDownload";
import EgovSecurityReport from "@/pages/support/security/EgovSecurityReport";
import EgovGuideEgovframework from "@/pages/support/guide/EgovGuideEgovframework";
import EgovGuideChatbot from "@/pages/support/guide/EgovGuideChatbot";

//INFORM
import EgovDailyList from "@/pages/inform/daily/EgovDailyList";
import EgovDailyDetail from "@/pages/inform/daily/EgovDailyDetail";
import EgovWeeklyList from "@/pages/inform/weekly/EgovWeeklyList";

import EgovNoticeList from "@/pages/inform/notice/EgovNoticeList";
import EgovNoticeDetail from "@/pages/inform/notice/EgovNoticeDetail";
import EgovNoticeEdit from "@/pages/inform/notice/EgovNoticeEdit";

import EgovGalleryList from "@/pages/inform/gallery/EgovGalleryList";
import EgovGalleryDetail from "@/pages/inform/gallery/EgovGalleryDetail";
import EgovGalleryEdit from "@/pages/inform/gallery/EgovGalleryEdit";

import EgovFaqList from "@/pages/inform/faq/EgovFaqList";
import EgovFaqEdit from "@/pages/inform/faq/EgovFaqEdit";

import EgovQnaList from "@/pages/inform/qna/EgovQnaList";
import EgovQnaDetail from "@/pages/inform/qna/EgovQnaDetail";
import EgovQnaEdit from "@/pages/inform/qna/EgovQnaEdit";

//ADMIN
import EgovAdminScheduleList from "@/pages/admin/schedule/EgovAdminScheduleList";
import EgovAdminScheduleDetail from "@/pages/admin/schedule/EgovAdminScheduleDetail";
import EgovAdminScheduleEdit from "@/pages/admin/schedule/EgovAdminScheduleEdit";

import EgovAdminBoardList from "@/pages/admin/board/EgovAdminBoardList";
import EgovAdminBoardEdit from "@/pages/admin/board/EgovAdminBoardEdit";

import EgovAdminUsageList from "@/pages/admin/usage/EgovAdminUsageList";
import EgovAdminUsageEdit from "@/pages/admin/usage/EgovAdminUsageEdit";

import EgovAdminNoticeList from "@/pages/admin/notice/EgovAdminNoticeList";
import EgovAdminNoticeDetail from "@/pages/admin/notice/EgovAdminNoticeDetail";
import EgovAdminNoticeEdit from "@/pages/admin/notice/EgovAdminNoticeEdit";

import EgovAdminFaqList from "@/pages/admin/faq/EgovAdminFaqList";
import EgovAdminFaqEdit from "@/pages/admin/faq/EgovAdminFaqEdit";

import EgovAdminGalleryList from "@/pages/admin/gallery/EgovAdminGalleryList";
import EgovAdminGalleryDetail from "@/pages/admin/gallery/EgovAdminGalleryDetail";
import EgovAdminGalleryEdit from "@/pages/admin/gallery/EgovAdminGalleryEdit";
//사이트관리자 암호 바꾸기 기능 추가 2023.04.15(토) 김일국 추가
import EgovAdminPasswordUpdate from "@/pages/admin/manager/EgovAdminPasswordUpdate";
//회원관리 기능 추가
import EgovAdminMemberList from "@/pages/admin/members/EgovAdminMemberList";
import EgovAdminMemberEdit from "@/pages/admin/members/EgovAdminMemberEdit";
//마이페이지 기능 추가
import EgovMypageEdit from "@/pages/mypage/EgovMypageEdit";
import initPage from "@/js/ui";

//테스트용 페이지
import EgovTestPage from "@/pages/main/EgovTestPage";

const RootRoutes = () => {
  //useLocation객체를 이용하여 정규표현식을 사용한 /admin/~ 으로 시작하는 경로와 비교에 사용(아래 1줄) */}
  const location = useLocation();

  // JWT 토큰 정보 가져오기 함수 추가
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState(""); // 사용자 권한 저장

  // JWT 토큰에서 사용자 권한 정보 확인
  const getUserRoleFromToken = useCallback(() => {
    console.group("getUserRoleFromToken");
    console.log("[Start] getUserRoleFromToken ------------------------------");

    // 세션에서 JWT 토큰 가져오기
    const token = sessionStorage.getItem("jToken");

    if (token) {
      try {
        // JWT 토큰 파싱 (간단한 방식으로 처리)
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const role = payload.role || "";
          console.log("User role from token:", role);
          setUserRole(role);
          return role;
        }
      } catch (error) {
        console.error("JWT 토큰 파싱 중 오류:", error);
      }
    }

    console.log("JWT 토큰에서 권한 정보를 찾을 수 없음");
    setUserRole("");
    return "";
  }, []);

  // 경로에 따른 인증 처리를 위한 함수 추가
  const checkPathAccess = useCallback(() => {
    console.group("checkPathAccess");
    console.log("[Start] checkPathAccess ------------------------------");
    console.log("Current path:", location.pathname);

    // 현재 경로 가져오기
    const currentPath = location.pathname;
    const adminRegex = /^\/admin(\/.*)?$/;
    const mypageRegex = /^\/mypage(\/.*)?$/;

    // JWT 토큰에서 사용자 로그인 정보 확인
    const token = sessionStorage.getItem("jToken");

    if (!token) {
      console.log("로그인 정보가 없습니다.");

      // 로그인이 필요한 경로인 경우 처리
      if (adminRegex.test(currentPath) || mypageRegex.test(currentPath)) {
        console.log("로그인이 필요한 경로입니다.");
        setMounted(false);
        alert("로그인이 필요한 경로입니다.");
        window.location.href = URL.LOGIN;
        return false;
      }

      // 로그인이 필요하지 않은 경로인 경우
      setMounted(true);
      return true;
    }

    // 사용자 권한 확인
    const role = getUserRoleFromToken();
    console.log("User role:", role);

    // 관리자 페이지 접근 처리
    if (adminRegex.test(currentPath)) {
      if (role !== "ADM") {
        console.log("관리자 권한이 없어 접근이 불가합니다.");
        setMounted(false);
        alert("관리자 권한이 필요한 페이지입니다.");
        window.location.href = URL.MAIN;
        return false;
      } else {
        console.log("관리자 권한 확인 성공.");
        setMounted(true);
        return true;
      }
    }

    // 마이페이지 접근 처리 - 로그인한 유저라면 접근 가능
    if (mypageRegex.test(currentPath)) {
      if (!token) {
        console.log("로그인이 필요한 경로입니다.");
        setMounted(false);
        alert("로그인이 필요한 페이지입니다.");
        window.location.href = URL.LOGIN;
        return false;
      } else {
        console.log("로그인 사용자 확인 성공.");
        setMounted(true);
        return true;
      }
    }

    // 기본적으로 모든 다른 경로는 접근 가능
    setMounted(true);
    console.log("------------------------------checkPathAccess [End]");
    console.groupEnd("checkPathAccess");
    return true;
  }, [getUserRoleFromToken, location.pathname]);

  //시스템관리 메뉴인 /admin/으로 시작하는 URL은 모두 로그인이 필요하도록 코드추가(아래)
  const isMounted = useRef(false); // 아래 로그인 이동 부분이 2번 실행되지 않도록 즉, 마운트 될 때만 실행되도록 변수 생성
  const [mounted, setMounted] = useState(false); // 컴포넌트 최초 마운트 후 리렌더링 전 로그인 페이지로 이동하는 조건으로 사용

  useEffect(() => {
    if (!isMounted.current) {
      // 컴포넌트 최초 마운트 시 페이지 진입 전(렌더링 전) 실행
      isMounted.current = true; // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
      checkPathAccess(); // 경로에 따른 접근 권한 처리
    } else {
      // 라우트 변경 시 접근 권한 처리
      checkPathAccess();
    }
  }, [checkPathAccess]); // location 경로가 변경 될 때만 업데이트 후 리렌더링

  if (mounted) {
    // 인증 없이 시스템관리 URL로 접근할 때 렌더링 되는 것을 방지하는 조건추가.
    return (
      <Routes>
        <Route path={URL.ERROR} element={<EgovError />} />
        <Route path="*" element={<SecondRoutes />} />
      </Routes>
    );
  }
};

const SecondRoutes = () => {
  // eslint-disable-next-line no-unused-vars
  const [loginVO, setLoginVO] = useState({});

  //useRef객체를 사용하여 페이지 마운트 된 후 ui.js를 로딩 하도록 변경 코드 추가(아래)
  const isMounted = useRef(false); // 아래 로그인 이동 부분이 2번 실행되지 않도록 즉, 마운트 될 때만 실행되도록 변수 생성

  useEffect(() => {
    if (!isMounted.current) {
      // 컴포넌트 최초 마운트 시 페이지 진입 전(렌더링 전) 실행
      isMounted.current = true; // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
    } else {
      initPage();
    }
  }, []);

  return (
    <>
      <GlobalNoticeIcon />
      <Routes>
        {/* MAIN */}
        <Route path={URL.MAIN} element={
          <>
            <EgovHeader />
            <EgovMain />
          </>
        } />
        
        {/* LOGIN */}
        <Route
          path={URL.LOGIN}
          element={
            <>
              <EgovHeader />
              <EgovLogin onChangeLogin={(user) => setLoginVO(user)} />
            </>
          }
        />

        {/* SIGNUP */}
        <Route 
          path={URL.SIGNUP} 
          element={
            <>
              <EgovHeader />
              <EgovSignup />
            </>
          } >
          <Route index element={<Navigate to="agree" />} />
          <Route path="agree" element={<EgovSignupAgree />} />
          <Route path="form" element={<EgovSignupForm />} />
        </Route>

        {/* Sns Naver Callback */}
        <Route
          path={URL.SNS_NAVER_CB}
          element={
            <>
              <EgovHeader />
              <SnsNaverCallback onChangeLogin={(user) => setLoginVO(user)} />
            </>
          }
        />
        {/* Sns Kakao Callback */}
        <Route
          path={URL.SNS_KAKAO_CB}
          element={
            <>
              <EgovHeader />
              <SnsKakaoCallback onChangeLogin={(user) => setLoginVO(user)} />
            </>
          }
        />

        {/* ERROR */}
        <Route path={URL.ERROR} element={<EgovError />} />

        {/* ABOUT */}
        <Route path={URL.ABOUT} element={
          <>
            <EgovHeader />
            <Navigate to={URL.ABOUT_SITE} />
          </>
        } />
        <Route path={URL.ABOUT_SITE} element={
          <>
            <EgovHeader />
            <EgovAboutSite />
          </>
        } />
        <Route path={URL.ABOUT_HISTORY} element={
          <>
            <EgovHeader />
            <EgovAboutHistory />
          </>
        } />
        <Route
          path={URL.ABOUT_ORGANIZATION}
          element={
            <>
              <EgovHeader />
              <EgovAboutOrganization />
            </>
          }
        />
        <Route path={URL.ABOUT_LOCATION} element={
          <>
            <EgovHeader />
            <EgovAboutLocation />
          </>
        } />

        {/* INTRO */}
        <Route path={URL.INTRO} element={
          <>
            <EgovHeader />
            <Navigate to={URL.INTRO_TRANSFORM} />
          </>
        } />
        <Route path={URL.INTRO_TRANSFORM} element={
          <>
            <EgovHeader />
            <EgovIntroTransform />
          </>
        } />
        <Route path={URL.INTRO_SECURITY} element={
          <>
            <EgovHeader />
            <EgovIntroSecurity />
          </>
        } />
        <Route path={URL.INTRO_CHATBOT} element={
          <>
            <EgovHeader />
            <EgovIntroChatbot />
          </>
        } />

        {/* SUPPORT */}
        <Route
          path={URL.SUPPORT}
          element={
            <>
              <EgovHeader />
              <Navigate to={URL.SUPPORT_TRANSFORM_INTRO} />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_TRANSFORM_INTRO}
          element={
            <>
              <EgovHeader />
              <EgovSupportIntro />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_DOWNLOAD}
          element={
            <>
              <EgovHeader />
              <EgovSupportDownloadList />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_DOWNLOAD_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovSupportDownloadDetail />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_DOWNLOAD_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovSupportDownloadCreate />
            </>
          }
        />

        <Route path={URL.SUPPORT_QNA} element={
          <>
            <EgovHeader />
            <EgovSupportQnaList />
          </>
        } />
        <Route
          path={URL.SUPPORT_QNA_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovSupportQnaDetail />
            </>
          }
        />

        <Route
          path={URL.SUPPORT_APPLY}
          element={
            <>
              <EgovHeader />
              <EgovSupportApply />
            </>
          }
        />

        <Route
          path={URL.SUPPORT_TRANSFORMATION}
          element={
            <>
              <EgovHeader />
              <EgovSupportTransformation />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_VIEW_TRANSFORMATION}
          element={
            <>
              <EgovHeader />
              <EgovSupportViewTransformation />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_VIEW_TRANSFORMATION_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovSupportViewTransformationDetail />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_VIEW_TEST}
          element={
            <>
              <EgovHeader />
              <EgovSupportViewTest />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_TRANSFORM_DOWNLOAD}
          element={
            <>
              <EgovHeader />
              <EgovSupportDownload />
            </>
          }
        />

        <Route
          path={URL.SUPPORT_SECURITY_INTRO}
          element={
            <>
              <EgovHeader />
              <EgovSecurityIntro />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_SECURITY_DETECT}
          element={
            <>
              <EgovHeader />
              <EgovSecurityDetect />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_SECURITY_DETECT_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovSecurityDetectDetail />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_SECURITY_CHECK}
          element={
            <>
              <EgovHeader />
              <EgovSecurityCheck />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_SECURITY_SCAN}
          element={
            <>
              <EgovHeader />
              <EgovSecurityScan />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_SECURITY_DOWNLOAD}
          element={
            <>
              <EgovHeader />
              <EgovSecurityDownload />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_SECURITY_REPORT}
          element={
            <>
              <EgovHeader />
              <EgovSecurityReport />
            </>
          }
        />

        <Route
          path={URL.SUPPORT_GUIDE_EGOVFRAMEWORK}
          element={
            <>
              <EgovHeader />
              <EgovGuideEgovframework />
            </>
          }
        />
        <Route
          path={URL.SUPPORT_GUIDE_CHATBOT}
          element={
            <>
              <EgovHeader />
              <EgovGuideChatbot />
            </>
          }
        />

        {/* INFORM */}
        <Route path={URL.INFORM} element={
          <>
            <EgovHeader />
            <Navigate to={URL.INFORM_NOTICE} />
          </>
        } />
        <Route path={URL.INFORM_NOTICE} element={
          <>
            <EgovHeader />
            <EgovNoticeList />
          </>
        } />
        <Route
          path={URL.INFORM_NOTICE_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovNoticeDetail />
            </>
          }
        />
        <Route
          path={URL.INFORM_NOTICE_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovNoticeEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.INFORM_NOTICE_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovNoticeEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.INFORM_NOTICE_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovNoticeEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />

        <Route path={URL.INFORM_DAILY} element={
          <>
            <EgovHeader />
            <EgovDailyList />
          </>
        } />
        <Route
          path={URL.INFORM_DAILY_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovDailyDetail />
            </>
          }
        />

        <Route path={URL.INFORM_WEEKLY} element={
          <>
            <EgovHeader />
            <EgovWeeklyList />
          </>
        } />

        <Route path={URL.INFORM_GALLERY} element={
          <>
            <EgovHeader />
            <EgovGalleryList />
          </>
        } />
        <Route
          path={URL.INFORM_GALLERY_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovGalleryDetail />
            </>
          }
        />
        <Route
          path={URL.INFORM_GALLERY_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovGalleryEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.INFORM_GALLERY_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovGalleryEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.INFORM_GALLERY_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovGalleryEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />

        <Route path={URL.INFORM_FAQ} element={
          <>
            <EgovHeader />
            <EgovFaqList />
          </>
        } />
        <Route
          path={URL.INFORM_FAQ_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovFaqEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.INFORM_FAQ_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovFaqEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.INFORM_FAQ_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovFaqEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />

        <Route path={URL.INFORM_QNA} element={
          <>
            <EgovHeader />
            <EgovQnaList />
          </>
        } />
        <Route
          path={URL.INFORM_QNA_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovQnaDetail />
            </>
          }
        />
        <Route
          path={URL.INFORM_QNA_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovQnaEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.INFORM_QNA_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovQnaEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.INFORM_QNA_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovQnaEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />

        {/* ADMIN */}
        <Route path={URL.ADMIN} element={
          <>
            <EgovHeader />
            <Navigate to={URL.ADMIN_NOTICE} />
          </>
        } />
        <Route path={URL.ADMIN_SCHEDULE} element={
          <>
            <EgovHeader />
            <EgovAdminScheduleList />
          </>
        } />
        <Route
          path={URL.ADMIN_SCHEDULE_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovAdminScheduleDetail />
            </>
          }
        />
        <Route
          path={URL.ADMIN_SCHEDULE_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminScheduleEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_SCHEDULE_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminScheduleEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />

        <Route path={URL.ADMIN_BOARD} element={
          <>
            <EgovHeader />
            <EgovAdminBoardList />
          </>
        } />
        <Route
          path={URL.ADMIN_BOARD_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminBoardEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_BOARD_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminBoardEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />

        <Route path={URL.ADMIN_USAGE} element={
          <>
            <EgovHeader />
            <EgovAdminUsageList />
          </>
        } />
        <Route
          path={URL.ADMIN_USAGE_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminUsageEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_USAGE_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminUsageEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />

        <Route path={URL.ADMIN_NOTICE} element={
          <>
            <EgovHeader />
            <EgovAdminNoticeList />
          </>
        } />
        <Route
          path={URL.ADMIN_NOTICE_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovAdminNoticeDetail />
            </>
          }
        />
        <Route
          path={URL.ADMIN_NOTICE_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminNoticeEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_NOTICE_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminNoticeEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_NOTICE_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovAdminNoticeEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />

        {/* admin_faq */}
        <Route path={URL.ADMIN_FAQ} element={
          <>
            <EgovHeader />
            <EgovAdminFaqList />
          </>
        } />
        <Route
          path={URL.ADMIN_FAQ_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminFaqEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_FAQ_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminFaqEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_FAQ_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovAdminFaqEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />

        <Route path={URL.ADMIN_GALLERY} element={
          <>
            <EgovHeader />
            <EgovAdminGalleryList />
          </>
        } />
        <Route
          path={URL.ADMIN_GALLERY_DETAIL}
          element={
            <>
              <EgovHeader />
              <EgovAdminGalleryDetail />
            </>
          }
        />
        <Route
          path={URL.ADMIN_GALLERY_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminGalleryEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_GALLERY_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminGalleryEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_GALLERY_REPLY}
          element={
            <>
              <EgovHeader />
              <EgovAdminGalleryEdit mode={CODE.MODE_REPLY} />
            </>
          }
        />
        {/* 사이트관리자 암호 바꾸기 기능 */}
        <Route path={URL.ADMIN_MANAGER} element={
          <>
            <EgovHeader />
            <EgovAdminPasswordUpdate />
          </>
        } />
        <Route path={URL.ADMIN_MEMBERS} element={
          <>
            <EgovHeader />
            <EgovAdminMemberList />
          </>
        } />
        <Route
          path={URL.ADMIN_MEMBERS_CREATE}
          element={
            <>
              <EgovHeader />
              <EgovAdminMemberEdit mode={CODE.MODE_CREATE} />
            </>
          }
        />
        <Route
          path={URL.ADMIN_MEMBERS_MODIFY}
          element={
            <>
              <EgovHeader />
              <EgovAdminMemberEdit mode={CODE.MODE_MODIFY} />
            </>
          }
        />
        {/* MYPAGE */}
        <Route
          path={URL.MYPAGE}
          element={
            <>
              <EgovHeader />
              <EgovMypageEdit />
            </>
          }
        />
        
        {/* Test */}
        <Route
          path={URL.TESTPAGE}
          element={
            <>
              <EgovHeader />
              <EgovTestPage />
            </>
          }
        />
      </Routes>
      <EgovFooter />
      <EgovInfoPopup />
      <GlobalChatWidget />
    </>
  );
};

export default RootRoutes;
