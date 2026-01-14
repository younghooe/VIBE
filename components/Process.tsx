import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Brain } from 'lucide-react';

const Process: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="process" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">Workflow</h2>
        <div className="mb-12 border-b pb-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center">
                <Brain className="mr-3" /> Process
            </h3>
            <p className="text-xl text-slate-500 font-medium italic">
                "데이터는 질문에서 시작하여 액션으로 끝납니다."
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.PROCESS_STEPS.map((step, index) => (
            <div 
                key={step.id} 
                className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-400 transition-colors duration-300"
            >
              <div className="absolute top-6 right-6 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none">
                {step.step}
              </div>
              
              <h4 className="text-lg font-bold text-slate-900 mb-3 relative z-10">
                <Editable section="PROCESS_STEPS" field={[index, 'title']} />
              </h4>
              <div className="text-slate-600 leading-relaxed relative z-10">
                <Editable section="PROCESS_STEPS" field={[index, 'description']} multiline />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;