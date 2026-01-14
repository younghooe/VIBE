
import { Project, ProcessStep } from './types';

export const HERO_CONTENT = {
  role: "데이터 스토리텔러.",
  description: "복잡한 데이터 속에서 명확한 비즈니스 기회를 발견하고, 데이터 기반의 의사결정을 이끌어냅니다."
};

export const ABOUT_CONTENT = {
  title: "데이터의 불확실성을 비즈니스의 확신으로",
  education: "통계학 주전공 / 컴퓨터공학 부전공 (학사)",
  techStack: {
    analysis: "Python (Pandas, NumPy), R, SQL (Advanced)",
    statistics: "A/B Test, Causal Inference, Regression, Time-series",
    visualization: "Tableau, Amplitude, Seaborn, Matplotlib"
  },
  strength: "비즈니스 문제 정의, 가설 수립 및 검증, 액션 가능한 인사이트 도출, 데이터 파이프라인 설계"
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "산사태 취약지 예측 및 최적 방재 입지 선정",
    role: "공간 데이터 수집, GIS 분석, 머신러닝 모델링(XGBoost), 입지 최적화 알고리즘 구현",
    description: "기상청 강수 데이터와 지형 데이터를 결합하여 산사태 발생 확률을 예측하고, 피해 비용을 최소화할 수 있는 사방댐 설치 최적지를 도출했습니다.",
    insight: "단순한 예측 정확도(Accuracy) 향상을 넘어, 예산 제약 조건 하에서 '기대 손실 비용'을 최소화하는 최적화 관점의 접근이 중요함을 배웠습니다."
  },
  {
    id: 2,
    title: "재무 건전성 데이터를 활용한 기업 부도 예측",
    role: "불균형 데이터 처리(SMOTE), 피처 엔지니어링, 평가지표 설계(Recall/F1-score)",
    description: "기업 재무제표의 40여 개 파생 변수를 생성하고, Random Forest와 LightGBM 앙상블을 통해 부도 기업 탐지 모델을 구축했습니다.",
    insight: "금융 데이터 특성상 False Negative(부도 미탐지) 비용이 치명적임을 고려하여, 재현율(Recall) 중심의 임계값(Threshold) 튜닝을 수행하여 리스크를 15% 감소시켰습니다.",
    // 구글 드라이브 PDF 미리보기 링크 (예시 유지)
    presentationUrl: "https://drive.google.com/file/d/1gHRcTnY0P28qVQcO7y_gq8-uymIbw0PS/preview"
  },
  {
    id: 3,
    title: "[진행 중] 이커머스 고객 이탈 방지(Churn) 분석",
    role: "로그 데이터 분석, 코호트 분석, 이탈 예측 모델링",
    description: "GA4 및 내부 로그 데이터를 활용하여 유저의 구매 여정(Funnel)을 분석하고, 이탈 징후를 보이는 고객군을 정의하여 마케팅 액션을 제안하는 프로젝트입니다.",
    insight: ""
  }
];

export const STUDY_CONTENT = [
  {
    id: 'sql',
    category: 'SQL & Data Engineering',
    title: '데이터 추출 및 파이프라인 이해',
    items: [
      "HackerRank SQL Advanced 취득 및 프로그래머스 고득점 Kit 완주",
      "복잡한 비즈니스 로직 처리를 위한 Window Functions 활용 능숙",
      "대용량 데이터 쿼리 성능 최적화(Indexing, Partitioning) 학습",
      "Airflow를 활용한 기초적인 데이터 파이프라인(ETL) 구축 스터디"
    ]
  },
  {
    id: 'algo',
    category: 'Modeling & CS',
    title: '논리적 문제 해결 능력',
    items: [
      "Python 알고리즘 문제 풀이 (Greedy, DP, Graph 탐색)",
      "Scikit-learn/PyTorch 활용 머신러닝 & 딥러닝 이론 학습",
      "통계적 가설 검정 및 실험 설계(Experimental Design) 방법론 연구",
      "효율적인 연산을 위한 시간/공간 복잡도 최적화 습관화"
    ]
  },
  {
    id: 'comp',
    category: 'Projects & Kaggle',
    title: '실전 데이터 문제 해결',
    items: [
      "Kaggle/Dacon 데이터 분석 대회 3회 수상 (상위 5%)",
      "다양한 도메인(금융, 의료, 리테일) 데이터 핸들링 경험 축적",
      "모델 성능 개선을 위한 하이퍼파라미터 튜닝(Optuna) 및 앙상블 기법 적용",
      "Git을 활용한 협업 및 코드 버전 관리 익숙"
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    step: "01",
    title: "문제 정의 (Define)",
    description: "막연한 현상이 아닌, 해결해야 할 구체적인 비즈니스 문제를 정의하고 핵심 지표(KPI)를 설정합니다."
  },
  {
    id: 2,
    step: "02",
    title: "데이터 탐색 (EDA)",
    description: "데이터의 분포와 결측치, 이상치를 파악하고 변수 간의 상관관계를 시각화하여 가설을 구체화합니다."
  },
  {
    id: 3,
    step: "03",
    title: "분석 및 모델링",
    description: "문제 해결에 적합한 통계적 방법론이나 머신러닝 알고리즘을 적용하고, 교차 검증을 통해 신뢰도를 확보합니다."
  },
  {
    id: 4,
    step: "04",
    title: "액션 도출 (Action)",
    description: "분석 결과를 난해한 숫자가 아닌, 의사결정권자가 즉시 실행할 수 있는 전략과 제언으로 변환하여 전달합니다."
  }
];

export const CONTACT_CONTENT = {
  message: "함께 성장할 수 있는 기회를 기다립니다.",
  subMessage: "데이터 뒤에 숨겨진 맥락을 읽어내고, 비즈니스에 실질적인 가치를 더하는 분석가가 되겠습니다. 커피챗이나 이메일로 편하게 연락 주세요.",
  email: "analyst_kim@portfolio.com",
  links: "GitHub / LinkedIn / Technical Blog"
};
