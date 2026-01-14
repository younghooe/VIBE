import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEGAL_DOCS } from '../constants/legal';
import ReactMarkdown from 'react-markdown'; // We might not have this, so let's implement simple rendering

interface PolicyProps {
  title: string;
  docType: keyof typeof LEGAL_DOCS;
}

const Policy: React.FC<PolicyProps> = ({ title, docType }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [docType]);

  const content = LEGAL_DOCS[docType] || "내용을 불러올 수 없습니다.";

  return (
    <div className="min-h-screen bg-white pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> 돌아가기
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">{title}</h1>
        
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-slate-700 leading-relaxed min-h-[400px] whitespace-pre-wrap">
          {content.split('\n').map((line, i) => {
             if (line.trim().startsWith('###')) {
                 return <h3 key={i} className="text-lg font-bold text-slate-900 mt-6 mb-2">{line.replace('###', '').trim()}</h3>;
             }
             if (line.trim().startsWith('|')) {
                 // Simple table rendering logic for markdown-like tables could go here, 
                 // but for simplicity let's just render the row text or use a pre tag for tables if complex.
                 // For now, let's just render lines. The table content is readable as text too.
                 return <div key={i} className="font-mono text-xs bg-white p-1 border-b border-slate-200 overflow-x-auto">{line}</div>
             }
             return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Policy;