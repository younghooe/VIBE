import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Database, Binary, Trophy, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Study: React.FC = () => {
  const { content } = useContent();

  const getIcon = (id: string) => {
    switch (id) {
      case 'sql': return <Database className="w-8 h-8 text-blue-500" />;
      case 'algo': return <Binary className="w-8 h-8 text-blue-500" />;
      case 'comp': return <Trophy className="w-8 h-8 text-blue-500" />;
      default: return <CheckCircle2 className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <section id="study" className="py-20 px-6 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">Self Development</h2>
        <h3 className="text-3xl font-bold text-slate-900 mb-12">
          "성장을 위한 끊임없는 노력"
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.STUDY_CONTENT.map((item, index) => {
             const isSql = item.id === 'sql';
             const CardContent = (
                <>
                  <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {getIcon(item.id)}
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                        <Editable section="STUDY_CONTENT" field={[index, 'category']} />
                    </h4>
                    {isSql && (
                        <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  <div className="text-sm text-slate-500 font-medium mb-6">
                    <Editable section="STUDY_CONTENT" field={[index, 'title']} />
                  </div>
                  
                  <ul className="space-y-3">
                    {item.items.map((_, idx) => (
                      <li key={idx} className="flex items-start text-slate-700 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                        <Editable section="STUDY_CONTENT" field={[index, 'items', idx]} multiline />
                      </li>
                    ))}
                  </ul>
                  
                  {isSql && (
                      <div className="mt-6 pt-4 border-t border-slate-100">
                          <span className="text-xs font-bold text-blue-600">Click to track progress →</span>
                      </div>
                  )}
                </>
             );

             return isSql ? (
                <Link 
                    key={item.id} 
                    to="/study/sql"
                    className="group block bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer relative ring-2 ring-transparent hover:ring-blue-100"
                >
                    {CardContent}
                </Link>
             ) : (
                <div 
                  key={item.id} 
                  className="group bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
                >
                  {CardContent}
                </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default Study;