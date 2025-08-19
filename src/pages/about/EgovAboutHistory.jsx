import { Link } from "react-router-dom";

import URL from "@/constants/url";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAbout";
import "@/css/modern-styles.css";

function EgovAboutHistory() {
  return (
    <div className="modern-page-container">
      <div className="modern-page-wrapper">
        {/* Breadcrumb Navigation */}
        <nav className="modern-breadcrumb">
          <div className="breadcrumb-container">
            <Link to={URL.MAIN} className="breadcrumb-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              Home
            </Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <Link to={URL.ABOUT} className="breadcrumb-link">사이트 소개</Link>
            <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
            <span className="breadcrumb-current">연혁</span>
          </div>
        </nav>

        <div className="modern-layout">
          {/* Left Navigation */}
          <EgovLeftNav />

          <div className="contents SITE_INTRO" id="contents">
            {/* <!-- 본문 --> */}

            <h1 className="tit_3">사이트 소개</h1>

            <p className="txt_1">
              표준프레임워크 경량환경 포털사이트를 소개합니다.
            </p>

            <h2 className="tit_4">전자정부표준프레임워크 연혁</h2>

            <h3 className="tit_5">연혁</h3>

            <p className="msg_1">
              표준프레임워크 활성화 전담조직으로 한국정보화진흥원(NIA)에 2010년
              11월 4일 「표준프레임워크센터」가 <br />
              설립되었으며 정책지원, 글로벌 확산 등을 담당할 NIA 인력과 R&D,
              기술지원 등을 담당할 외부 민간 전문가로 <br />
              구성되었습니다.
            </p>

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovAboutHistory;
