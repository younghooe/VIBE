import React, { useState } from 'react';
import { X, Star, Loader2, CheckCircle, MessageSquare, User } from 'lucide-react';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reuse the existing Google Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0ATrCxX3iKaFlm9Ryc9UFM6I4DRm3y9zLxydFvezjOZRWp7XIixbD92M4LkKhcPkSOQ/exec";

const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose }) => {
  const [visitorType, setVisitorType] = useState('recruiter'); // recruiter, student, developer, other
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        type: 'survey', // Tag to distinguish from coffee chat
        visitorType,
        rating,
        feedback,
        timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      };

      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("Survey Payload:", payload);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Survey Error:", error);
      alert("전송 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      // Reset form on close if successful
      setVisitorType('recruiter');
      setRating(0);
      setFeedback('');
      setIsSuccess(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  // Success View
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-8 text-center animate-fade-in">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">소중한 의견 감사합니다!</h3>
          <p className="text-slate-600 text-sm mb-6">
            보내주신 피드백은 더 좋은 포트폴리오를 만드는 데 큰 힘이 됩니다.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in relative">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-white">
          <h3 className="text-lg font-bold text-slate-900">포트폴리오 방문 설문</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Visitor Type */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-500" />
              어떤 목적으로 방문하셨나요?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'recruiter', label: '채용 담당자' },
                { id: 'student', label: '학생/취준생' },
                { id: 'developer', label: '현직 개발자/분석가' },
                { id: 'other', label: '그 외 기타' }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setVisitorType(type.id)}
                  className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                    visitorType === type.id 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              포트폴리오가 도움이 되었나요?
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transform hover:scale-110 transition-transform"
                >
                  <Star 
                    className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                  />
                </button>
              ))}
            </div>
            {rating === 0 && <p className="text-xs text-center text-red-400 mt-2 font-medium">별점을 선택해주세요.</p>}
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
              자유로운 의견을 남겨주세요 (선택)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="좋았던 점이나 아쉬웠던 점을 편하게 적어주세요."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm min-h-[100px] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all flex items-center justify-center ${
              rating > 0 && !isSubmitting
                ? 'bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transform active:scale-[0.98]' 
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                제출 중...
              </>
            ) : (
              '의견 보내기'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyModal;