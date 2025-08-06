import { Link, NavLink, useNavigate } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import "@/css/header.css";
import logoImg from "/assets/images/logo_bigp.png";
import logoImgMobile from "/assets/images/logo_bigp.png";
import { getSessionItem, setSessionItem } from "@/utils/storage";
import { useState } from "react";

function EgovHeader() {
  const sessionToken = getSessionItem("jToken");
  const sessionUser = getSessionItem("loginUser");
  const sessionUserId = sessionUser?.id;
  const sessionUserName = sessionUser?.name;
  const sessionUserSe = sessionUser?.userSe;
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const logInHandler = () => {
    navigate(URL.LOGIN);
    closeAllMenus();
  };

  const logOutHandler = () => {
    const requestOptions = {
      headers: {
        "Content-type": "application/json",
        "Authorization": sessionToken,
      },
      credentials: "include",
    };
    EgovNet.requestFetch("/users/logout", requestOptions, () => {
      setSessionItem("loginUser", { id: "" });
      setSessionItem("jToken", null);
      alert("로그아웃되었습니다!");
      navigate(URL.MAIN);
      closeAllMenus();
    });
  };

  const toggleAllMenu = () => {
    const webMenu = document.querySelector(".all_menu.WEB");
    const btn = document.querySelector(".btnAllMenu");
    const isClosed = webMenu?.classList.contains("closed");
    webMenu?.classList.toggle("closed", !isClosed);
    btn?.classList.toggle("active", isClosed);
    if (btn) btn.title = isClosed ? "전체메뉴 열림" : "전체메뉴 닫힘";
  };

  const openAllMenuByHover = () => {
    setIsHovering(true);
    const menu = document.querySelector(".all_menu.WEB");
    if (menu) menu.classList.remove("closed");
  };

  const closeAllMenuByHover = () => {
    setTimeout(() => {
      if (!isHovering) {
        const menu = document.querySelector(".all_menu.WEB");
        if (menu) menu.classList.add("closed");
      }
    }, 200);
  };

  const handleMenuMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMenuMouseLeave = () => {
    setIsHovering(false);
    const menu = document.querySelector(".all_menu.WEB");
    if (menu) menu.classList.add("closed");
  };

  const closeAllMenus = () => {
    const webMenu = document.querySelector(".all_menu.WEB");
    if (webMenu) webMenu.classList.add("closed");
    const btn = document.querySelector(".btnAllMenu");
    if (btn) {
      btn.classList.remove("active");
      btn.title = "전체메뉴 닫힘";
    }
    document.querySelector(".all_menu.Mobile")?.classList.add("closed");
  };

  return (
    <div className="header">
      <div className="inner">
        <Link to={URL.MAIN} className="ico lnk_go_template" target="_blank">
          홈페이지 템플릿 소개 페이지로 이동
        </Link>
        <h1 className="logo">
          <Link to={URL.MAIN} className="w">
            <img src={logoImg} alt="eGovFrame 심플홈페이지" />
          </Link>
          <Link to={URL.MAIN} className="m">
            <img src={logoImgMobile} alt="eGovFrame 심플홈페이지" />
          </Link>
        </h1>

        <div
          className="gnb shift-left-40"
          onMouseEnter={openAllMenuByHover}
          onMouseLeave={closeAllMenuByHover}
        >
          <ul>
            <li><NavLink to={URL.ABOUT}>사이트소개</NavLink></li>
            <li><NavLink to={URL.SUPPORT_TRANSFORM_INTRO}>AI 변환기</NavLink></li>
            <li><NavLink to={URL.SUPPORT_SECURITY_INTRO}>AI 보안기</NavLink></li>
            <li><NavLink to={URL.SUPPORT_GUIDE_EGOVFRAMEWORK}>고객지원</NavLink></li>
            {sessionUserSe === "ADM" && (
              <li><NavLink to={URL.ADMIN}>사이트관리</NavLink></li>
            )}
          </ul>
        </div>

        <div className="user_info">
          {sessionUserId ? (
            <>
              <span className="person">{sessionUserName}</span> 님, {sessionUserSe} 반갑습니다!
              {sessionUserSe === "USER" && (
                <NavLink to={URL.MYPAGE} className={({ isActive }) => isActive ? "btn login cur" : "btn login"}>
                  마이페이지
                </NavLink>
              )}
              <button onClick={logOutHandler} className="btn">로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={logInHandler} className="btn login">로그인</button>
              <NavLink to={URL.SIGNUP} className={({ isActive }) => isActive ? "btn login cur" : "btn login"}>
                회원가입
              </NavLink>
            </>
          )}
        </div>

        <div className="right_a">
          <button
            type="button"
            className="btn btnAllMenu move-right-50"
            title="전체메뉴 닫힘"
            onClick={toggleAllMenu}
          >전체메뉴</button>
        </div>
      </div>

      <div
        className="all_menu WEB closed"
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        <div className="inner">
          <div className="col">
            <h3>사이트소개</h3>
            <ul>
              <li><NavLink to={URL.ABOUT_SITE}>소개</NavLink></li>
              <li><NavLink to={URL.ABOUT_HISTORY}>연혁</NavLink></li>
              <li><NavLink to={URL.ABOUT_ORGANIZATION}>조직소개</NavLink></li>
              <li><NavLink to={URL.ABOUT_LOCATION}>찾아오시는 길</NavLink></li>
            </ul>
          </div>

          <div className="col">
            <h3>AI 변환기</h3>
            <ul>
              <li><NavLink to="/support/transform/intro">기능 소개</NavLink></li>
              <li><NavLink to="/support/transform/transformation">변환 하기</NavLink></li>
              <li><NavLink to="/support/transform/view_transform">변환 이력 조회</NavLink></li>
              <li><NavLink to="/support/transform/view_test">테스트 이력 조회</NavLink></li>
              <li><NavLink to="/support/transform/download">다운로드</NavLink></li>
            </ul>
          </div>

          <div className="col">
            <h3>AI 보안기</h3>
            <ul>
              <li><NavLink to="/support/security/intro">기능 소개</NavLink></li>
              <li><NavLink to="/support/security/scan">AI 보안 검사</NavLink></li>
              <li><NavLink to="/support/security/vulnerability">보안 취약점탐지</NavLink></li>
              <li><NavLink to="/support/security/report">보안 점검결과</NavLink></li>
              <li><NavLink to="/support/security/report_detail">다운로드</NavLink></li>
            </ul>
          </div>

          <div className="col">
            <h3>고객지원</h3>
            <ul>
              <li><NavLink to="/support/guide/egovframework">전자정부프레임워크 가이드</NavLink></li>
              <li><NavLink to="/intro">정보마당</NavLink></li>
              <li><NavLink to="/inform">알림마당</NavLink></li>
            </ul>
          </div>

          {sessionUserSe === "ADM" && (
            <div className="col">
              <h3>사이트관리</h3>
              <ul>
                <li><NavLink to={URL.ADMIN_NOTICE}>공지사항 관리</NavLink></li>
                <li><NavLink to={URL.ADMIN_FAQ}>FAQ 관리</NavLink></li>
                <li><NavLink to={URL.ADMIN_QNA}>Q&A 관리</NavLink></li>
                <li><NavLink to={URL.ADMIN_MEMBERS}>회원 관리</NavLink></li>
                <li><NavLink to={URL.ADMIN_MANAGER}>관리자 관리</NavLink></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EgovHeader;
