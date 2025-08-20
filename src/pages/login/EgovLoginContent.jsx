import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { getLocalItem, setLocalItem, setSessionItem } from "@/utils/storage";
import SnsNaverBt from "@/components/sns/SnsNaverBt";
import SnsKakaoBt from "@/components/sns/SnsKakaoBt";

function EgovLoginContent(props) {
  console.group("EgovLoginContent");
  console.log("[Start] EgovLoginContent ------------------------------");
  console.log("EgovLoginContent [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovLoginContent [location] : ", location);

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "default",
    userSe: "USR",
  });
  // eslint-disable-next-line no-unused-vars
  const [loginVO, setLoginVO] = useState({});

  const [saveIDFlag, setSaveIDFlag] = useState(false);

  const checkRef = useRef();
  const idRef = useRef(null); //id입력 부분에서 엔터키 이벤트 발생 확인
  const passwordRef = useRef(null); //비밀번호 입력 부분

  const KEY_ID = "KEY_ID";
  const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";

  // Email 유효성 체크
  function getEmailValidationMessage(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid = emailRegex.test(email);

    return isValid ? "✅ 올바른 Email 형식입니다." : "❌ Email 형식을 확인해 주세요.";
  }
  
  const handleSaveIDFlag = () => {
    setLocalItem(KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  useEffect(() => {
    let idFlag = getLocalItem(KEY_SAVE_ID_FLAG);
    if (idFlag === null) {
      setSaveIDFlag(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      idFlag = false;
    } else {
      setSaveIDFlag(idFlag);
    }
    if (idFlag === false) {
      setLocalItem(KEY_ID, "");
      checkRef.current.className = "f_chk";
    } else {
      checkRef.current.className = "f_chk on";
    }
  }, []);

  useEffect(() => {
    let data = getLocalItem(KEY_ID);
    if (data !== null) {
      setUserInfo({ email: data, password: "default", userSe: "USR" });
    }
  }, []);

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target === idRef.current && passwordRef.current.value === "") {
        //엔터 키 이벤트 발생한 입력 필드가 아이디인지 확인하기
        alert("비밀번호 입력 여부를 확인하여 주세요");
        passwordRef.current.focus();
      } else {
        submitFormHandler(e);
      }
    }
  };
  const submitFormHandler = () => {
    console.log("EgovLoginContent submitFormHandler()");

    const loginUrl = "/users/login";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };

    EgovNet.requestFetch(loginUrl, requestOptions, (resp) => {
      // let resultVO = resp.resultVO;
      let jToken = resp?.accessToken || null;
      // let jToken = resp?.accessToken.split(' ')[1] || null;

      const obj = {
        id: resp?.id,
        name: resp?.nickname,
        userSe: resp?.role,
      };

      setSessionItem("jToken", jToken);
      setSessionItem("loginUser", obj);

    if (saveIDFlag) setLocalItem(KEY_ID, userInfo.email);

    // 3) 만료/임박 처리
    const isExpired = !resp?.isExpired;         // 백엔드에서 true/false
    // const daysLeft  = Number(resp?.daysLeft ?? NaN); // 선택: 남은 일수 제공 시
    console.log(isExpired);
    if (isExpired) {
      const goChange = window.confirm(
        "마지막으로 비밀번호를 변경하신지 60일이 지났습니다.\n지금 바로 변경하시겠습니까?"
      );
      if (goChange) {
        // 비밀번호 변경 화면(라우팅 상수에 맞춰 수정하세요)
        navigate(URL.MYPAGE); // 예: '/mypage/password' 등
        return;
      } else {
        alert("보안을 위해 가능한 빨리 비밀번호를 변경해 주세요.");
        // 원하는 정책에 따라: 메인으로 보낼지, 로그인 유지 막을지 결정
        navigate(URL.MAIN);
        return;
      }
    }

    // (선택) 만료 임박 경고: 7일 이하 남았을 때 알림
    // if (!isExpired && !isNaN(daysLeft) && daysLeft <= 7 && daysLeft >= 0) {
    //   const goEarly = window.confirm(
    //     `비밀번호 만료가 ${daysLeft}일 남았습니다.\n지금 변경하시겠습니까?`
    //   );
    //   if (goEarly) {
    //     navigate(URL.MYPAGE_PASSWORD);
    //     return;
    //   }
    // }

    // 4) 정상 로그인 플로우
    alert("로그인 성공!");
    navigate(URL.MAIN);
    });
  };

  console.log("------------------------------EgovLoginContent [End]");
  console.groupEnd("EgovLoginContent");

  return (
    <div className="contents" id="contents">
      {/* <!-- 본문 --> */}
      <div className="Plogin">
        <h1>로그인</h1>
        {/* <p className="txt">
          전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.
          <br />
          로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.
        </p> */}

        <div className="login_box">
          <form name="" method="" action="">
            <fieldset>
              <legend>로그인</legend>
              <span className="group">
                <input
                  type="text"
                  name=""
                  title="아이디"
                  placeholder="아이디"
                  value={userInfo?.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  ref={idRef}
                  onKeyDown={activeEnter}
                />
                <input
                  type="password"
                  name=""
                  title="비밀번호"
                  placeholder="비밀번호"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                  ref={passwordRef}
                  onKeyDown={activeEnter}
                />
              </span>
              <div className="chk">
                <label className="f_chk" htmlFor="saveid" ref={checkRef}>
                  <input
                    type="checkbox"
                    name=""
                    id="saveid"
                    onChange={handleSaveIDFlag}
                    checked={saveIDFlag}
                  />{" "}
                  <em>ID저장</em>
                </label>
                
              </div>
              <button type="button" onClick={submitFormHandler}>
                <span>LOGIN</span>
              </button>
            </fieldset>
          </form>
        </div>

        <ul className="list">
          <li>
            비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 혼합해서
            사용하실 수 있습니다.
          </li>
          <li>
            쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기
            쉬우므로 주기적으로 변경하셔서 사용하는 것이 좋습니다.
          </li>
        </ul>
        <div className="btn_social">
          {/* <SnsNaverBt />
          <SnsKakaoBt /> */}
        </div>
      </div>
      {/* <!--// 본문 --> */}
    </div>
  );
}

export default EgovLoginContent;
