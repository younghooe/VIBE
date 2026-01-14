
import React, { useState } from 'react';
import Editable from './Editable';
import SurveyModal from './SurveyModal';
import { ClipboardList, Sparkles } from 'lucide-react';
import { useABTest } from '../hooks/useABTest';

const Hero: React.FC = () => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  
  // A/B Test: Headline Copy Test
  // testId: 'hero_headline_v1'
  const { variant } = useABTest('hero_headline_v1');

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
      {/* Decorative Top Banner mimicking the Notion header */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-blue-200 via-blue-100 to-white -z-10 opacity-60"></div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center md:items-start md:text-left mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-white">
                <img 
                    src="https://i.imgur.com/MQVFnFn.png" 
                    alt="Data Analyst Profile" 
                    className="w-full h-full object-cover object-top"
                />
            </div>
            
            {/* A/B Test Rendering Logic */}
            <div className="min-h-[60px] mb-6">
              {variant === 'B' ? (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                      AB TEST: B
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                    비즈니스 문제를 해결하는<br/>데이터 분석가.
                  </h1>
                </div>
              ) : (
                <div className="animate-fade-in">
                  {variant === 'A' && (
                     <div className="flex items-center justify-center md:justify-start mb-2">
                        <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                          AB TEST: A
                        </span>
                     </div>
                  )}
                  <Editable 
                    section="HERO_CONTENT" 
                    field="role" 
                    as="h1" 
                    className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight" 
                  />
                </div>
              )}
            </div>
            
            <div className="relative pl-6 border-l-4 border-blue-500 max-w-2xl bg-slate-50 py-4 pr-4 rounded-r-lg mb-8">
                <div className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed italic">
                    "<Editable section="HERO_CONTENT" field="description" multiline />"
                </div>
            </div>

            {/* Visitor Survey Button */}
            <button
              onClick={() => setIsSurveyOpen(true)}
              className="group flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
            >
              <div className="bg-blue-100 p-1.5 rounded-full group-hover:bg-blue-200 transition-colors">
                <ClipboardList className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-700">
                방문자 설문조사 참여하기
              </span>
            </button>
        </div>
      </div>
      
      <SurveyModal isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
    </section>
  );
};

export default Hero;
