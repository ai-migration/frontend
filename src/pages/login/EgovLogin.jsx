import { Link } from "react-router-dom";

import EgovLoginContent from "@/pages/login/EgovLoginContent";

import URL from "@/constants/url";
import "@/css/auth.css";

function EgovLogin(props) {
  console.group("EgovLogin");
  console.log("[Start] EgovLogin ------------------------------");
  console.log("EgovLogin [props] : ", props);

  const onChangeLogin = (user) => {
    props.onChangeLogin(user);
  };

  console.log("------------------------------EgovLogin [End]");
  console.groupEnd("EgovLogin");

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <Link to={URL.MAIN} className="home">
                Home
              </Link>
            </li>
            <li>로그인</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          <div className="contents" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">로그인</h1>
            </div>

            <h2 className="tit_2">사용자 로그인</h2>

            <EgovLoginContent onChangeLogin={onChangeLogin}></EgovLoginContent>
            
            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovLogin;
