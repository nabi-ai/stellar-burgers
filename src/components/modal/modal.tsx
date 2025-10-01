import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { TModalProps } from './type';
import { ModalOverlayUI } from '@ui';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlayUI onClose={onClose} />
      <div className={styles.modal} data-testid='modal'>
        <h2 className='text text_type_main-large mt-10 ml-10'>{title}</h2>
        <button
          className={styles.closeButton}
          onClick={onClose}
          data-testid='modal-close'
        >
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('modals') as HTMLDivElement
  );
});
