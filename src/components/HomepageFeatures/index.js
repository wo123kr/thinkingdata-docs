import React from 'react';
import clsx from 'clsx';
import { HiOutlineChartBarSquare, HiOutlineCpuChip, HiOutlineEye } from 'react-icons/hi2';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '실시간 데이터 분석',
    icon: <HiOutlineChartBarSquare size={80} />,
    description: (
      <>
        대용량 데이터를 실시간으로 처리하고 분석하여 즉시 인사이트를 제공합니다.
      </>
    ),
  },
  {
    title: 'AI 기반 인사이트',
    icon: <HiOutlineCpuChip size={80} />,
    description: (
      <>
        머신러닝을 활용한 자동 패턴 발견으로 숨겨진 트렌드를 찾아냅니다.
      </>
    ),
  },
  {
    title: '직관적인 시각화',
    icon: <HiOutlineEye size={80} />,
    description: (
      <>
        복잡한 데이터를 이해하기 쉬운 차트와 그래프로 표현합니다.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
} 