import { useState, useEffect, useRef } from "react";

// 메시지 타입 정의
type Message = {
  type: 'question' | 'answer';
  text: string;
};

const initialMessages: Message[] = [];

function Chatbot() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const inputContainerClass = isMobile ? "w-full" : "w-2/3 mx-auto";
  const messageListClass = isMobile ? "p-4" : "w-1/2 mx-auto p-4";

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<null | HTMLDivElement>(null);
  // --- Textarea DOM 요소에 접근하기 위한 ref ---
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 입력값 변경 시 textarea 높이를 자동으로 조절하는 로직 ---
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 재설정
    }
  }, [inputValue]);


  const handleSubmit = () => {
    if (inputValue.trim()) {
      const newQuestion: Message = { type: "question", text: inputValue };
      setMessages(prev => [...prev, newQuestion]);
      
      setTimeout(() => {
        const newAnswer: Message = { type: "answer", text: `'${inputValue}'에 대한 답변입니다.` };
        setMessages(prev => [...prev, newAnswer]);
      }, 1000);
      
      setInputValue("");
      // 전송 후 textarea 높이도 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // --- Enter는 전송, Shift+Enter는 줄바꿈을 위한 핸들러 ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault(); // Enter 키의 기본 동작(줄바꿈) 방지
      handleSubmit();
    }
  };

  const hasMessages = messages.length > 0;

  const ChatForm = (
    <div className={inputContainerClass}>
      <div className="flex gap-2 mb-2">
        {/* --- input을 textarea로 변경 --- */}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={hasMessages ? "추가 질문을 입력하세요." : "금융과 관련해 궁금하신 점을 질문해주세요."}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none overflow-y-hidden"
          rows={1}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="px-5 py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transform transition-transform duration-200 hover:scale-105 active:scale-95 self-end"
        >
          ⬆
        </button>
      </div>
      <div className="text-center text-xs text-gray-400">
        CorpAdvisor의 답변은 부정확할 수 있습니다. 중요한 정보는 다시 확인해주세요.
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-white font-sans">
      {hasMessages ? (
        <>
          <main className="w-full flex-1 overflow-y-auto pb-32">
            <div className={messageListClass}>
              <div className="space-y-4">
                {messages.map((msg, idx) => {
                  const isQuestion = msg.type === "question";
                  return (
                    <div key={idx} className={`flex ${isQuestion ? "justify-end" : ""}`}>
                      <div className={`rounded-2xl break-words  ${isQuestion ? "p-4 text-justify max-w-[80%] md:max-w-[70%] bg-indigo-50 shadow-sm text-gray-800 rounded-br-none" : "max-w-[100%] md:max-w-[100%] "}`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div ref={chatEndRef} />
            </div>
          </main>
          <footer className="w-full bg-white border-t border-gray-200 p-4 fixed bottom-0 left-0 right-0">
            {ChatForm}
          </footer>
        </>
      ) : (
        <div className="w-3/4 flex flex-col justify-center items-center h-full gap-6 p-4">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">금융 자문 챗봇</h1>
            <p className="text-gray-500 mt-2">CorpAdvisor</p>
          </header>
          <div className="w-full">{ChatForm}</div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

