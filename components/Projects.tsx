import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { FileBarChart, Zap, Target, ArrowRight } from 'lucide-react';

const ProjectCard: React.FC<{ index: number }> = ({ index }) => {
  const { content } = useContent();
  const project = content.PROJECTS[index];
  
  return (
    <Link 
      to={`/project/${project.id}`}
      className="block group w-[85vw] md:w-[500px] mx-4"
    >
      <div 
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 group-hover:shadow-lg group-hover:border-blue-300 transition-all duration-300 h-full relative flex flex-col justify-between"
      >
          <div className="absolute top-8 right-8 text-slate-300 group-hover:text-blue-500 transition-colors">
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
          </div>

          <div>
            <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-start pr-8">
                <span className="text-blue-500 mr-3 text-lg mt-1">#{project.id}</span>
                <Editable 
                    section="PROJECTS" 
                    field={[index, 'title']} 
                    as="span" 
                    className="group-hover:text-blue-600 transition-colors line-clamp-2" 
                />
            </h4>
            
            <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg group-hover:bg-blue-50/50 transition-colors">
                    <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Role</h5>
                    <Editable 
                        section="PROJECTS" 
                        field={[index, 'role']} 
                        as="p" 
                        className="text-sm text-slate-700 font-medium line-clamp-2"
                    />
                </div>

                <div>
                    <h5 className="flex items-center text-sm font-bold text-slate-900 mb-2">
                        <FileBarChart className="w-4 h-4 mr-2 text-gray-500" /> Description
                    </h5>
                    <Editable 
                        section="PROJECTS" 
                        field={[index, 'description']} 
                        as="p" 
                        multiline
                        className="text-slate-600 leading-relaxed line-clamp-3 text-sm"
                    />
                </div>
                
                {project.insight ? (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <h5 className="flex items-center text-xs font-bold text-blue-800 uppercase mb-1">
                             <Zap className="w-3 h-3 mr-1" /> Insight
                        </h5>
                        <Editable 
                            section="PROJECTS" 
                            field={[index, 'insight']} 
                            as="p" 
                            multiline
                            className="text-sm text-blue-900 leading-relaxed line-clamp-3"
                        />
                    </div>
                ) : (
                    <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-lg">
                         <h5 className="flex items-center text-xs font-bold text-slate-600 uppercase mb-1">
                             <Target className="w-3 h-3 mr-1" /> Goal
                        </h5>
                        <Editable 
                            section="PROJECTS" 
                            field={[index, 'description']} 
                            as="p" 
                            multiline
                            className="text-sm text-slate-600 leading-relaxed line-clamp-3"
                        />
                    </div>
                )}
            </div>
          </div>
      </div>
    </Link>
  );
};

const Projects: React.FC = () => {
  const { content, isEditMode } = useContent();

  return (
    <section id="projects" className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">Projects</h2>
        <div className="flex justify-between items-end">
          <h3 className="text-3xl font-bold text-slate-900">
            "비즈니스 가치를 창출한 경험"
          </h3>
          {isEditMode && (
            <span className="text-xs font-bold text-red-500 animate-pulse">
              * 편집 모드: 애니메이션이 일시 중지됩니다.
            </span>
          )}
        </div>
      </div>

      {/* Infinite Scroll Container */}
      {/* 
        We duplicate the list to create the seamless loop effect. 
        The animation translates X by -50%, so we need 2 sets of items.
      */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
            // Create fade effect on sides
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div 
            className={`flex w-max ${isEditMode ? '' : 'animate-infinite-scroll hover:[animation-play-state:paused]'}`}
        >
            {/* Original Set */}
            <div className="flex">
                {content.PROJECTS.map((_, index) => (
                    <ProjectCard key={`original-${index}`} index={index} />
                ))}
            </div>
            
            {/* Duplicate Set for Loop */}
            <div className="flex" aria-hidden="true">
                {content.PROJECTS.map((_, index) => (
                    <ProjectCard key={`duplicate-${index}`} index={index} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;