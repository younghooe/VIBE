import React from 'react';
import { GraduationCap, Code2, LineChart, BrainCircuit } from 'lucide-react';
import Editable from './Editable';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">About Me</h2>
        <div className="text-3xl font-bold text-slate-900 mb-12 border-b pb-6">
          "<Editable section="ABOUT_CONTENT" field="title" />"
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Education - Left Column on Desktop */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex items-center mb-4 text-slate-800">
                    <GraduationCap className="w-6 h-6 mr-2 text-blue-500" />
                    <h4 className="font-bold text-lg">Education</h4>
                </div>
                <Editable section="ABOUT_CONTENT" field="education" as="p" className="text-slate-600" />
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex items-center mb-4 text-slate-800">
                    <BrainCircuit className="w-6 h-6 mr-2 text-blue-500" />
                    <h4 className="font-bold text-lg">Key Strength</h4>
                </div>
                <Editable section="ABOUT_CONTENT" field="strength" as="p" className="text-slate-600 leading-relaxed" multiline />
            </div>
          </div>

          {/* Tech Stack - Right Column on Desktop */}
          <div className="md:col-span-8 space-y-8">
            <div>
              <div className="flex items-center mb-4 text-slate-800">
                <Code2 className="w-6 h-6 mr-2 text-blue-500" />
                <h4 className="font-bold text-lg">Tech Stack</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                    <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Analysis</span>
                    <Editable section="ABOUT_CONTENT" field={['techStack', 'analysis']} as="p" className="text-slate-800 font-medium" />
                </div>
                
                <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                    <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Statistics</span>
                    <Editable section="ABOUT_CONTENT" field={['techStack', 'statistics']} as="p" className="text-slate-800 font-medium" />
                </div>
                
                <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                    <span className="block text-xs text-gray-500 uppercase font-semibold mb-1">Visualization</span>
                    <Editable section="ABOUT_CONTENT" field={['techStack', 'visualization']} as="p" className="text-slate-800 font-medium" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;