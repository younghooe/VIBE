
import { useState, useEffect, useRef } from 'react';
import { ABTestManager, Variant } from '../utils/abTest';

export const useABTest = (testId: string) => {
  const [variant, setVariant] = useState<Variant | null>(null);
  const managerRef = useRef<ABTestManager | null>(null);

  useEffect(() => {
    // 매니저 인스턴스 생성
    if (!managerRef.current) {
      managerRef.current = new ABTestManager(testId);
    }

    const manager = managerRef.current;
    
    // 그룹 배정
    const assignedGroup = manager.getGroup();
    setVariant(assignedGroup);

    // 노출 트래킹 (한 번만 실행되도록 처리하거나, 페이지 뷰마다 실행할지 결정)
    // 여기서는 그룹이 결정된 직후 트래킹
    manager.trackExposure(assignedGroup);

  }, [testId]);

  return { 
    variant, 
    isLoading: variant === null 
  };
};
