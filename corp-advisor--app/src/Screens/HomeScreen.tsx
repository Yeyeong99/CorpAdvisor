import "../App.css";

function Home() {
  return (<div className="">
    <h1 className="text-5xl font-bold mb-5">CorpAdvisor</h1>
    <div className="intro p-6">
      <h5 className="text-md text-gray-700 leading-relaxed">
        안녕하세요! CorpAdvisor입니다. 👋
      </h5>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <a href="/report" className="group my-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-700 transition-transform transition-colors duration-200 transform hover:scale-105">
        <h2 className="text-lg font-semibold mb-2 group-hover:text-gray-100 transition-colors duration-200">
          기업 분석 보고서 생성
        </h2>
        <h5 className="text-md text-gray-700 group-hover:text-gray-100 transition-colors duration-200">
          기업 소개, 재무 분석, 성장 가능성을 담은
          <br/>
          종합 분석 보고서를 생성할 수 있어요.
        </h5>
      </a>
      <a href="/chatbot" className="group my-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-700 transition-transform transition-colors duration-200 transform hover:scale-105">
        <h2 className="text-lg font-semibold mb-2 group-hover:text-gray-100 transition-colors duration-200">
          금융 자문 챗봇
        </h2>
        <h5 className="text-md text-gray-700 group-hover:text-gray-100 transition-colors duration-200">
          금융과 관련된 법적 질의와
          <br/>
          전문적인 자문을 받을 수 있어요.
        </h5>
      </a>
    </div>
  </div>);
}

export default Home;
