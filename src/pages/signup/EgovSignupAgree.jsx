import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { getLocalItem, setLocalItem, setSessionItem } from "@/utils/storage";

function EgovSignupAgree() {
  console.group("EgovSignupAgree");
  console.log("[Start] EgovSignupAgree ------------------------------");
  // console.log("EgovSignupAgree [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovSignupAgree [location] : ", location);

  const [agreed, setAgreed] = useState(false);

  const handleNextClick = () => {
    if (!agreed) {
      alert("개인정보 수집 및 이용에 동의하셔야 합니다.");
      return;
    }
    navigate("/signup/form");
  };

  console.log("------------------------------EgovSignupAgree [End]");
  console.groupEnd("EgovSignupAgree");

  return (
    <div className="contents" id="contents">
      {/* <!-- 본문 --> */}
      <div className="Plogin">
        <h1>회원가입</h1>
        {/* <p className="txt">
          전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.
          <br />
          로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.
        </p> */}


        <div className="signup_inner">
          <h2>개인정보 수집 및 이용 동의</h2>
          <div className="agree_form">
            <div className="agree_article">
              <p>
                개인정보보호법에 따라 AI-Migration에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
              </p>
              <p><br/></p>
            </div>
            <div className="agree_article">
              <h3>1. 수집하는 개인정보</h3>
              <p>
                이용자는 회원가입을 하지 않아도 코드 변환, 보안 검사, 챗봇 등 대부분의 AI-Migration 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 서비스 이용 내역 확인, 기존 이력 확인 등과 같이 개인화 서비스를 이용하기 위해 회원가입을 할 경우, AI-Migration은는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
              </p>
              <p>
                회원가입 시점에 AI-Migration가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
              </p>
              <p>
                - 회원 가입 시 필수항목으로 이메일, 비밀번호, 닉네임을 수집합니다. 
              </p>
              <p><br/></p>
            </div>
            <div className="agree_article">
              <p>
                서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보가 생성되어 수집될 수 있습니다. 
              </p>
              <p>
                구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하거나 이용자가 입력한 정보를 저장(수집)하거나, 2) 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못 하도록 안전하게 변환하여 수집합니다.
              </p>
              <p>
                생성정보 수집에 대한 추가 설명
              </p>
              <p>
                - IP(Internet Protocol) 주소란?
              </p>
              <p>
                IP 주소는 인터넷 망 사업자가 인터넷에 접속하는 이용자의 PC 등 기기에 부여하는 온라인 주소정보 입니다. IP 주소가 개인정보에 해당하는지 여부에 대해서는 각국마다 매우 다양한 견해가 있습니다.
              </p>
              <p>
                - 서비스 이용기록이란?
              </p>
              <p>
                AI-Migration 이용한 서비스 목록 및 서비스 이용 과정에서 발생하는 정상 또는 비정상 로그 일체 등을 의미합니다. 정보주체가 식별되는 일부 서비스 이용기록(행태정보 포함)과 관련한 처리 목적 등에 대해서는 본 개인정보 처리방침에서 규정하고 있는 수집하는 개인정보, 수집한 개인정보의 이용, 개인정보의 파기 등에서 설명하고 있습니다. 이는 서비스 제공을 위해 수반되는 것으로 이를 거부하시는 경우 서비스 이용에 제한이 있을 수 있으며, 관련하여서는 고객센터로 문의해주시길 바랍니다.
              </p>
              <p>
                - 기기정보란?
              </p>
              <p>
                본 개인정보처리방침에 기재된 기기정보는 생산 및 판매 과정에서 기기에 부여된 정보뿐 아니라, 기기의 구동을 위해 사용되는 S/W를 통해 확인 가능한 정보를 모두 일컫습니다. OS(Windows, MAC OS 등) 설치 과정에서 이용자가 PC에 부여하는 컴퓨터의 이름, PC에 장착된 주변기기의 일련번호, 스마트폰의 통신에 필요한 고유한 식별값(IMEI, IMSI), AAID 혹은 IDFA, 설정언어 및 설정 표준시, USIM의 통신사 코드 등을 의미합니다. 단, IMEI와 같은 기기의 고유한 식별값을 수집할 필요가 있는 경우, 이를 수집하기 전에 원래의 값을 알아볼 수 없는 방식으로 암호화 하여 식별성(Identifiability)을 제거한 후에 수집합니다.
              </p>
              <p>
                - 쿠키(cookie)란?
              </p>
              <p>
                쿠키는 이용자가 웹사이트를 접속할 때에 해당 웹사이트에서 이용자의 웹브라우저를 통해 이용자의 PC에 저장하는 매우 작은 크기의 텍스트 파일입니다. 이후 이용자가 다시 웹사이트를 방문할 경우 웹사이트 서버는 이용자 PC에 저장된 쿠키의 내용을 읽어 이용자가 설정한 서비스 이용 환경을 유지하여 편리한 인터넷 서비스 이용을 가능케 합니다. 이용자는 쿠키에 대한 선택권을 가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스의 이용에 불편이 있을 수 있습니다.
              </p>
              <p><br/></p>
            </div>
            <div className="agree_article">
              <h3>2. 수집한 개인정보의 이용</h3>
              <p>
                AI-Migration 관련 제반 서비스의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.
              </p>
              <p>
                - 회원 가입 의사의 확인, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
              </p>
              <p>
                - 법령 및 AI-Migration 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
              </p>
              <p>
                - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.
              </p>
              <p><br/></p>
            </div>
            <div className="agree_article">
              <h3>3. 개인정보의 보관기간</h3>
              <p>
                AI-Migration은 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.
              </p>
              <p>
                단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
              </p>
              <p>
                이용자에게 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와 같습니다.
              </p>
              <p>
                - 전자문서 및 전자거래 기본법
              </p>
              <p>
                공인전자주소를 통한 전자문서 유통에 관한 기록 : 10년 보관
              </p>
              <p>
                - 통신비밀보호법
              </p>
              <p>
                로그인 기록: 3개월
              </p>
              <p><br/></p>
            </div>
            <div className="agree_article">
              <h3>4. 개인정보 수집 및 이용 동의를 거부할 권리</h3>
              <p>
                이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
              </p>
              <p><br/></p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
              gap: "12px", // 버튼 간 간격
              flexWrap: "wrap", // 작은 화면에서 줄바꿈
            }}
          >
            <label className="agree_checkbox">
              <input
                className="agree_checkbtn"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span style={{ fontSize: "16px", color: "#333" }}>동의합니다</span>
            </label>

            <button
              className="btn_skyblue_h46 w_100"
              style={{ marginRight:"10px" }}
              type="button"
              onClick={handleNextClick}
            >
              <span>다음</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovSignupAgree;
