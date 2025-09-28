import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import { TModalOverlay } from './type';

export const ModalOverlayUI: FC<TModalOverlay> = ({ onClose }) => (
  <div className={styles.overlay} onClick={onClose} />
);
