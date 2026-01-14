import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from './Editable';
import { Mail, Link as LinkIcon, Coffee } from 'lucide-react';

interface ContactProps {
  onOpenModal: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenModal }) => {
  const { content } = useContent();

  return (
    <section id="contact" className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center md:text-left">
        <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3">Contact</h2>
        <h3 className="text-3xl font-bold text-slate-900 mb-6">
          "<Editable section="CONTACT_CONTENT" field="message" />"
        </h3>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl leading-relaxed">
          <Editable section="CONTACT_CONTENT" field="subMessage" multiline />
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                        <span className="block text-xs text-gray-500 uppercase font-bold">Email</span>
                        <Editable 
                            section="CONTACT_CONTENT" 
                            field="email" 
                            as="a" 
                            className="text-slate-800 font-medium hover:text-blue-600 block"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                    <div className="bg-slate-100 p-2 rounded-full">
                        <LinkIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1 text-left">
                        <span className="block text-xs text-gray-500 uppercase font-bold">Link</span>
                        <Editable 
                            section="CONTACT_CONTENT" 
                            field="links" 
                            as="span"
                            className="text-slate-800 font-medium block"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center md:justify-end">
                <button 
                    onClick={onOpenModal}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-xl hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 w-full md:w-auto"
                >
                    <Coffee className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    <span>데이터 고민 나누기 - 커피챗 제안하기</span>
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;