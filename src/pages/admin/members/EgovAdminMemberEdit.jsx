import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovRadioButtonGroup from "@/components/EgovRadioButtonGroup";

function EgovAdminMemberEdit(props) {
  console.group("EgovAdminMemberEdit");
  console.log("[Start] EgovAdminMemberEdit ------------------------------");
  console.log("EgovAdminMemberEdit [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  console.log("EgovAdminMemberEdit [location] : ", location);
  const uniqId = location.state?.uniqId || "";
  const mberSttusRadioGroup = [
    { value: "P", label: "가능" },
    { value: "A", label: "대기" },
    { value: "D", label: "탈퇴" },
  ];
  //const groupCodeOptions = [{ value: "GROUP_00000000000000", label: "ROLE_ADMIN" }, { value: "GROUP_00000000000001", label: "ROLE_USER" }];
  //백엔드에서 보내온 값으로 변경(위 1줄 대신 아래 1줄 추가)
  // let [groupCodeOptions, setGroupCodeOptions] = useState([]);
  const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  const [userDetail, setUserDetail] = useState({});
  const groupCodeOptions = [
    { value: "ADM", label: "ADM" }, 
    { value: "USER", label: "USER" }
  ];

  const initMode = () => {
    // Edit 데이터
    console.log(modeInfo);
    console.log(location.state)
    if(modeInfo.mode === CODE.MODE_MODIFY) {
      const retrieveDetailURL = `/admin/users/${location.state.userId}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
        console.log(resp);
        setUserDetail(resp);
        // alert('불러오기!');
      });
    }
  };

  const retrieveDetail = () => {
    const retrieveDetailURL = `/admin/users/${location.state.userId}/role`;
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ role : userDetail.role })
    };

    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      // console.log(resp);
      alert('회원정보 수정!');
      navigate('/admin/members');
    });
  };

  const requestToken = () => {
    // /users/token은 로그인 세션으로 처리
    // 정보 수정으로 진행해야함
    // const requestTokenURL = `/users/token`;

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     // "Authorization": sessionToken
    //   },
    // };
    
    // EgovNet.requestFetch(requestTokenURL, requestOptions, (resp) => {
    //   if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
    //     alert("토큰 발급이 요청되었습니다. 토큰 발급 후 서비스 이용이 가능합니다.");
    //     setUserDetail({
    //         ...userDetail,
    //         tokenIssued: true,
    //       })
    //     // navigate({ pathname: URL.MAIN });
    //   } else {
    //     navigate(
    //       { pathname: URL.ERROR },
    //       { state: { msg: resp.resultMessage } }
    //     );
    //   }
    // });
  }

  useEffect(() => {
    initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminMemberEdit [End]");
  console.groupEnd("EgovAdminMemberEdit");

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
            <li>
              <Link to={URL.ADMIN}>사이트관리</Link>
            </li>
            <li>회원 관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>

            {modeInfo.mode === CODE.MODE_CREATE && (
              <h2 className="tit_2">회원 생성</h2>
            )}

            {modeInfo.mode === CODE.MODE_MODIFY && (
              <h2 className="tit_2">회원 수정</h2>
            )}

            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="mberId">회원Email</label>
                </dt>
                <dd>
                  {userDetail.email}
                  {/* 수정/조회 일때 변경 불가 */}
                  {/* {modeInfo.mode === CODE.MODE_MODIFY && (
                    <input
                      className="f_input2 w_full"
                      type="text"
                      name="mberId"
                      title=""
                      id="mberId"
                      placeholder=""
                      defaultValue={userDetail.mberId}
                      ref={(el) => (checkRef.current[0] = el)}
                      readOnly
                      required
                    />
                  )} */}
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="bbsNm">회원명</label>
                </dt>
                <dd>
                  {userDetail.nickname}
                  {/* <input
                    className="f_input2 w_full"
                    type="text"
                    name="mberNm"
                    title=""
                    id="mberNm"
                    placeholder=""
                    defaultValue={userDetail.nickname}
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        nickname: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[2] = el)}
                    required
                  /> */}
                </dd>
              </dl>
              <dl>
                <dt>
                  회원 권한
                </dt>
                <dd>
                  <label className="f_select w_200" htmlFor="groupId">
                    <select
                      id="groupId"
                      name="groupId"
                      title="회원권한유형선택"
                      onChange={(e) =>
                        setUserDetail({
                          ...userDetail,
                          role: e.target.value,
                        })
                      }
                      value={userDetail.role}
                    >
                      {groupCodeOptions.map((option) => {
                        return (
                          <option value={option.value} key={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  토큰
                </dt>
                <dd>
                  {userDetail.tokenIssued && (
                    <p>토큰 발급이 완료되었습니다.</p>
                  )}
                  {!userDetail.tokenIssued && (
                    <p>토큰이 발급되지 않았습니다.</p>
                  )}
                  {/* {!userDetail.tokenIssued && (
                    <button
                      className="btn_skyblue_h46 w_100"
                      onClick={() => requestToken()}
                    >
                      토큰요청
                    </button>
                  )} */}
                </dd>
              </dl>

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1">
                  <button
                    className="btn_skyblue_h46 w_100"
                    onClick={() => retrieveDetail()}
                  >
                    저장
                  </button>
                  {/* {modeInfo.mode === CODE.MODE_MODIFY && (
                    <button
                      className="btn btn_skyblue_h46 w_100"
                      onClick={() => {
                        deleteMember(memberDetail.uniqId);
                      }}
                    >
                      삭제
                    </button>
                  )} */}
                </div>

                <div className="right_col btn1">
                  <Link
                    to={URL.ADMIN_MEMBERS}
                    className="btn btn_blue_h46 w_100"
                  >
                    목록
                  </Link>
                </div>
              </div>
              {/* <!--// 버튼영역 --> */}
            </div>

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovAdminMemberEdit;
