import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { LEGAL_DOCS } from '../constants/legal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DocType = 'terms' | 'collection' | 'marketing' | null;

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0ATrCxX3iKaFlm9Ryc9UFM6I4DRm3y9zLxydFvezjOZRWp7XIixbD92M4LkKhcPkSOQ/exec"; 

// Discord Webhook URL
const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1460903492699947162/xFHclAkF_mEg1xQPxd7s7_p6btdiBUJAEE0NHPpK50YiFeRE_3Hj2lVUIVqdoc9u3Sim";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  
  // State for loading status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for success status
  const [isSuccess, setIsSuccess] = useState(false);
  
  // State for viewing legal documents inside modal
  const [viewingDoc, setViewingDoc] = useState<DocType>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setAgreeTerms(false);
      setAgreePrivacy(false);
      setAgreeMarketing(false);
      setViewingDoc(null);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const allChecked = agreeTerms && agreePrivacy && agreeMarketing;

  const handleSelectAll = () => {
    if (allChecked) {
      setAgreeTerms(false);
      setAgreePrivacy(false);
      setAgreeMarketing(false);
    } else {
      setAgreeTerms(true);
      setAgreePrivacy(true);
      setAgreeMarketing(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

      // Payload for Google Sheets
      const googlePayload = {
        name,
        phone,
        agreeTerms,
        agreePrivacy,
        agreeMarketing
      };

      // Payload for Discord
      const discordPayload = {
        username: "Portfolio Bot",
        avatar_url: "https://i.imgur.com/MQVFnFn.png",
        embeds: [
          {
            title: "☕ 새로운 커피챗 신청이 도착했습니다!",
            color: 3891126, // #3B82F6 (Blue-500)
            fields: [
              { name: "이름", value: name, inline: true },
              { name: "연락처", value: phone, inline: true },
              { name: "신청 일시", value: timestamp, inline: false },
              { 
                name: "동의 내역", 
                value: `• 서비스 이용약관: ${agreeTerms ? '✅ 동의' : '❌ 미동의'}\n• 개인정보 수집: ${agreePrivacy ? '✅ 동의' : '❌ 미동의'}\n• 마케팅 정보: ${agreeMarketing ? '✅ 동의' : '❌ 미동의'}`,
                inline: false 
              }
            ],
            footer: {
              text: "Data Analyst Portfolio"
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      // URL이 설정되지 않았을 경우 (테스트 모드)
      if (!GOOGLE_SCRIPT_URL && !DISCORD_WEBHOOK_URL) {
        console.warn("URL이 설정되지 않았습니다. 콘솔에 데이터를 출력합니다.");
        console.log("Google Payload:", googlePayload);
        console.log("Discord Payload:", discordPayload);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSuccess(true);
        return;
      }

      const promises = [];

      // 1. Google Sheets 전송
      if (GOOGLE_SCRIPT_URL) {
        promises.push(
          fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(googlePayload),
          })
        );
      }

      // 2. Discord Webhook 전송
      if (DISCORD_WEBHOOK_URL) {
        promises.push(
          fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(discordPayload),
          })
        );
      }

      // 두 요청 병렬 처리 (하나가 실패해도 다른 하나는 진행되도록 처리할 수 있으나, 여기선 단순 병렬 대기)
      // Google Sheets의 no-cors 요청은 오류를 반환하지 않으므로, 네트워크 에러 외에는 성공으로 간주됨.
      // Discord 요청은 CORS 정책에 따라 브라우저에서 차단될 수 있으나, 요청은 시도함.
      await Promise.allSettled(promises);

      setIsSuccess(true);

    } catch (error) {
      console.error("Submission Error:", error);
      alert("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = name.trim() !== '' && phone.trim() !== '' && agreeTerms && agreePrivacy;

  if (!isOpen) return null;

  // 1. Render Success View
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in relative p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">신청이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                보내주신 소중한 정보가 전달되었습니다.<br/>
                확인 후 빠른 시일 내에 연락드리겠습니다.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left text-sm border border-gray-100">
                <div className="flex justify-between mb-3 border-b border-gray-200 pb-2">
                    <span className="text-gray-500">이름</span>
                    <span className="font-bold text-gray-900">{name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">연락처</span>
                    <span className="font-bold text-gray-900">{phone}</span>
                </div>
            </div>

            <button
                onClick={onClose}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
                확인
            </button>
        </div>
      </div>
    );
  }

  // 2. Render Document Viewer
  if (viewingDoc) {
    const docContent = LEGAL_DOCS[viewingDoc];
    const docTitle = viewingDoc === 'terms' ? '서비스 이용약관' 
                   : viewingDoc === 'collection' ? '개인정보 수집 및 제3자 제공 동의' 
                   : '마케팅 정보 수신 동의';

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in relative max-h-[90vh] flex flex-col">
           <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white z-10 sticky top-0">
            <button 
              onClick={() => setViewingDoc(null)}
              className="flex items-center text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <ChevronLeft size={18} className="mr-1" /> 뒤로
            </button>
            <h3 className="text-lg font-bold text-gray-900 truncate px-4">{docTitle}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto leading-relaxed text-sm text-slate-600 whitespace-pre-wrap">
             {docContent.split('\n').map((line, i) => {
                if (line.trim().startsWith('###')) {
                    return <h4 key={i} className="text-base font-bold text-slate-900 mt-6 mb-2">{line.replace('###', '').trim()}</h4>;
                }
                if (line.trim().startsWith('|')) {
                    return <div key={i} className="font-mono text-xs bg-slate-50 p-2 border-b border-slate-200 overflow-x-auto my-2 rounded">{line}</div>
                }
                return <p key={i} className="mb-2">{line}</p>;
             })}
          </div>

          <div className="p-5 border-t border-gray-100 bg-slate-50 sticky bottom-0">
             <button
               onClick={() => setViewingDoc(null)}
               className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
             >
               확인
             </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render Main Form
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-900">커피챗 신청하기</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
                placeholder="홍길동"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
                placeholder="010-1234-5678"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div 
                className={`flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 transition-colors ${isSubmitting ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:bg-gray-100'}`}
                onClick={!isSubmitting ? handleSelectAll : undefined}
            >
              <input
                type="checkbox"
                checked={allChecked}
                readOnly
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 pointer-events-none"
                disabled={isSubmitting}
              />
              <span className="ml-3 font-semibold text-gray-800">전체 동의하기</span>
            </div>

            <div className={`space-y-3 px-1 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Terms */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer flex-1">
                    <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    disabled={isSubmitting}
                    />
                    <span className="ml-2 text-sm text-gray-600">[필수] 서비스 이용약관 동의</span>
                </label>
                <button 
                    type="button" 
                    onClick={() => setViewingDoc('terms')}
                    className="text-xs text-gray-400 hover:text-blue-500 border-b border-gray-300 hover:border-blue-500 ml-2 transition-colors whitespace-nowrap"
                    disabled={isSubmitting}
                >
                    자세히 보기
                </button>
              </div>

              {/* Privacy Collection & Third Party */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer flex-1">
                    <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    disabled={isSubmitting}
                    />
                    <span className="ml-2 text-sm text-gray-600">[필수] 개인정보 수집 및 제3자 제공 동의</span>
                </label>
                <button 
                    type="button" 
                    onClick={() => setViewingDoc('collection')}
                    className="text-xs text-gray-400 hover:text-blue-500 border-b border-gray-300 hover:border-blue-500 ml-2 transition-colors whitespace-nowrap"
                    disabled={isSubmitting}
                >
                    자세히 보기
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer flex-1">
                    <input
                    type="checkbox"
                    checked={agreeMarketing}
                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    disabled={isSubmitting}
                    />
                    <span className="ml-2 text-sm text-gray-600">[선택] 마케팅 정보 수신 동의</span>
                </label>
                <button 
                    type="button" 
                    onClick={() => setViewingDoc('marketing')}
                    className="text-xs text-gray-400 hover:text-blue-500 border-b border-gray-300 hover:border-blue-500 ml-2 transition-colors whitespace-nowrap"
                    disabled={isSubmitting}
                >
                    자세히 보기
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform active:scale-[0.98] flex items-center justify-center ${
              isValid && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg' 
                : 'bg-gray-300 cursor-not-allowed active:scale-100'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                처리 중...
              </>
            ) : (
              '신청하기'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;