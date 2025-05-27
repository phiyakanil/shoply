import React, { useEffect, useRef } from 'react';

const Dialog = ({ open, onClose, title, children, actions }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="dialog-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="dialog-content"
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        style={{
          background: '#fff',
          borderRadius: 8,
          minWidth: 320,
          maxWidth: '90vw',
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          padding: 24,
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <h2 id="dialog-title" style={{ marginTop: 0 }}>{title}</h2>
        )}
        <div>{children}</div>
        {actions && (
          <div style={{ marginTop: 24, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {actions}
          </div>
        )}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Dialog;
