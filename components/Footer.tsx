import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <div className="mb-4 md:mb-0">
          <p className="font-medium">© 2026 Data Analyst Portfolio. All rights reserved.</p>
        </div>
        
        <div className="flex space-x-6">
          <Link 
            to="/privacy-policy" 
            className="hover:text-blue-600 transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            개인정보처리방침
          </Link>
          <Link 
            to="/terms-of-use" 
            className="hover:text-blue-600 transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            서비스 이용 약관
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;