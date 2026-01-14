import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, User, FileBarChart, Zap, Target, Presentation } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  const project = content.PROJECTS.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <div className="text-center">
             <h2 className="text-2xl font-bold text-slate-900 mb-4">프로젝트를 찾을 수 없습니다.</h2>
             <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> 홈으로 돌아가기
             </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> 메인으로 돌아가기
        </Link>
        
        <header className="mb-12 border-b border-slate-100 pb-10">
          <div className="flex items-center space-x-3 mb-4">
             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Project 0{project.id}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            {project.title}
          </h1>
        </header>

        <div className="grid md:grid-cols-12 gap-10">
            {/* Left Sidebar */}
            <div className="md:col-span-4 space-y-8">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Role & Contribution</h3>
                    <div className="flex items-start">
                         <User className="w-5 h-5 mr-3 text-blue-600 mt-0.5 shrink-0" />
                         <p className="text-slate-700 font-medium text-sm leading-relaxed">
                            {project.role}
                         </p>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-8 space-y-10">
                <section>
                    <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
                        <FileBarChart className="w-5 h-5 mr-2 text-slate-400" />
                        Project Description
                    </h3>
                    <div className="text-lg text-slate-600 leading-relaxed">
                        {project.description}
                    </div>
                </section>

                <section>
                     {project.insight ? (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                            <h3 className="flex items-center text-lg font-bold text-blue-900 mb-3">
                                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                                Key Insight
                            </h3>
                            <p className="text-blue-800 leading-relaxed">
                                {project.insight}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl">
                            <h3 className="flex items-center text-lg font-bold text-slate-800 mb-3">
                                <Target className="w-5 h-5 mr-2" />
                                Project Goal
                            </h3>
                             <p className="text-slate-700 leading-relaxed">
                                정적인 데이터를 넘어 실시간으로 변화하는 사용자 행동 패턴을 포착하기 위해 노력하고 있습니다.
                            </p>
                        </div>
                    )}
                </section>

                {/* Presentation Embed Section */}
                {project.presentationUrl && (
                  <section>
                    <h3 className="flex items-center text-xl font-bold text-slate-900 mb-4">
                        <Presentation className="w-5 h-5 mr-2 text-slate-400" />
                        Presentation
                    </h3>
                    <div className="w-full aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                      <iframe 
                        src={project.presentationUrl} 
                        className="w-full h-full"
                        frameBorder="0" 
                        allowFullScreen
                        title="Project Presentation"
                      ></iframe>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">
                       * 모바일 환경에서는 화면을 터치하여 슬라이드를 넘겨주세요.
                    </p>
                  </section>
                )}
                
                 {/* Empty State for Details (Only show if no presentation is available) */}
                {!project.presentationUrl && (
                    <div className="p-8 border border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50">
                        <p className="text-slate-400 text-sm">
                            상세 분석 리포트 및 코드는 대외비이거나 정리 중입니다.<br />
                            관심 있으시다면 커피챗을 통해 자세히 설명해 드릴 수 있습니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;