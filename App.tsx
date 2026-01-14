import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Home from './pages/Home';
import Policy from './pages/Policy';
import ProjectDetail from './pages/ProjectDetail';
import SqlStudy from './pages/SqlStudy';
import { ContentProvider } from './context/ContentContext';
import EditControl from './components/EditControl';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ContentProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-slate-900">
          <Header onOpenModal={openModal} />
          
          <Routes>
            <Route path="/" element={<Home onOpenModal={openModal} />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/study/sql" element={<SqlStudy />} />
            
            {/* Legal Documents Routes */}
            <Route path="/privacy-policy" element={<Policy title="개인정보처리방침" docType="privacy" />} />
            <Route path="/terms-of-use" element={<Policy title="서비스 이용 약관" docType="terms" />} />
            <Route path="/policy/collection" element={<Policy title="개인정보 수집 및 이용 동의" docType="collection" />} />
            <Route path="/policy/marketing" element={<Policy title="마케팅 정보 수신 동의" docType="marketing" />} />
          </Routes>

          <Footer />
          <EditControl />
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </Router>
    </ContentProvider>
  );
};

export default App;