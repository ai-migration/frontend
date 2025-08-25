import { Link } from "react-router-dom";

import logoFooterImg from "/assets/images/logo_footer_ai.png";
import logoFooterImgMobile from "/assets/images/logo_footer_m.png";
import bannerImg_01 from "/assets/images/banner_w_01.png";
import bannerImgMobile_01 from "/assets/images/banner_m_01.png";
import bannerImg_02 from "/assets/images/banner_w_02.png";
import bannerImgMobile_02 from "/assets/images/banner_m_02.png";

function EgovFooter() {
  return (
    <div className="footer">
      <div className="inner">
        <h1>
          <Link to="/">
            <img className="w" src={logoFooterImg} alt="AIVLE" />
            <img className="m" src={logoFooterImgMobile} alt="AIVLE Mobile" />
          </Link>
        </h1>

        <div className="info">
          <p>
            GitHub :{" "}
            <a
              href="https://github.com/leeyumin-dev/ai_migration"
              target="_blank"
              rel="noopener noreferrer"
            >
              바로가기
            </a>{" "}
            <span className="m_hide"> | </span>
            <br className="m_show" />
            대표전화 : 010-4463-5077
            <br />
            Notion :{" "}
            <a
              href="https://www.notion.so/AI-Code-Migration-2297bde02a66809da989c76132e4cdc5?p=23e7bde02a668016996ac7a4802ebcef&pm=s"
              target="_blank"
              rel="noopener noreferrer"
            >
              바로가기
            </a>{" "}
             |  교육문의 : 010-4463-5077
          </p>

          <p className="policy-links">
            <strong>
              <a
                href="https://aivle.edu.kt.co.kr/home/main/privateMain"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                AI CODE MIGRATION 개인정보 처리방침
              </a>
            </strong>{" "}
            |{" "}
            <a
              href="https://aivle.edu.kt.co.kr/home/main/policySvcMain"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              이용약관
            </a>
          </p>

          <p className="copy">

            <br />
            Copyright © 2025 KT AIVLE SCHOOL BIG PROJECT GROUP 10. All rights reserved.
          </p>
        </div>

        <div className="right_col">
          <a href="https://www.mois.go.kr" target="_blank" rel="noopener noreferrer">
            <img className="w" src={bannerImg_01} alt="행정안전부" />
            <img className="m" src={bannerImgMobile_01} alt="행정안전부 모바일" />
          </a>
          <a href="https://www.nia.or.kr" target="_blank" rel="noopener noreferrer">
            <img className="w" src={bannerImg_02} alt="NIA" />
            <img className="m" src={bannerImgMobile_02} alt="NIA 모바일" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default EgovFooter;
