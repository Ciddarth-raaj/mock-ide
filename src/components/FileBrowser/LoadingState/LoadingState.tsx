import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './styles.module.css';

const LOADER_WIDTH = '100%';

const SkeletonLoader: React.FC = () => {
  return (
    <SkeletonTheme baseColor="rgba(255, 255, 255, 0.05)" highlightColor="rgba(255, 255, 255, 0.1)">
      <div className={styles.container}>
        <div className={styles.item}>
          <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />

          <div className={styles.nested}>
            <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
            <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />

            <div className={styles.nested}>
              <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
          <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
          <div className={styles.nested}>
            <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
            <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
            <div className={styles.nested}>
              <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
              <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
            </div>
            <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
            <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
          </div>
          <Skeleton width={LOADER_WIDTH} height={20} className={styles.loaderStyle} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
