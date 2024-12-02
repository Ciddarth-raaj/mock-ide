import React from 'react';
import styles from './styles.module.css';

interface AlertDialogProps {
  title: string;
  description: string | React.ReactNode;
  positiveButtonText: string;
  onPositiveAction: () => void;
  negativeButtonText: string;
  onNegativeAction: () => void;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  description,
  positiveButtonText,
  onPositiveAction,
  negativeButtonText,
  onNegativeAction,
  onClose
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button className={styles.negativeButton} onClick={onNegativeAction}>
            {negativeButtonText}
          </button>
          <button className={styles.positiveButton} onClick={onPositiveAction}>
            {positiveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
