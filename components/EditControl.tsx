import React from 'react';
import { PenLine, Save, RotateCcw } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const EditControl: React.FC = () => {
  const { isEditMode, toggleEditMode, resetContent } = useContent();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {isEditMode && (
        <button
          onClick={resetContent}
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all hover:scale-110 flex items-center justify-center"
          title="초기화 (Reset to Default)"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      )}
      
      <button
        onClick={toggleEditMode}
        className={`${
          isEditMode ? 'bg-green-600' : 'bg-slate-900'
        } text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center`}
        title={isEditMode ? "편집 완료 (Save)" : "페이지 내용 수정 (Edit Mode)"}
      >
        {isEditMode ? <Save className="w-6 h-6" /> : <PenLine className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default EditControl;