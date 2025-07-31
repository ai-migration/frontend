import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import EgovSignupAgree from "@/pages/signup/EgovSignupAgree";
import EgovSignupForm from "@/pages/signup/EgovSignupForm";

import URL from "@/constants/url";

function EgovSignup(props) {
  console.group("EgovSignup");
  console.log("[Start] EgovSignup ------------------------------");
  console.log("EgovSignup [props] : ", props);

  console.log("------------------------------EgovSignup [End]");
  console.groupEnd("EgovSignup");

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
            <li>회원가입</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <EgovSignupAgree></EgovSignupAgree> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EgovSignup;
