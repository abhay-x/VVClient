import React, { useState } from 'react';

const Modal = ({ isOpen, onRequestClose, children }) => {
    return (
        <>
            {isOpen && (
                <>
                    <button className='close_modal' onClick={onRequestClose}>Close Modal</button>
                    {children}
                </>
            )}
        </>
    );
};

export default Modal;
