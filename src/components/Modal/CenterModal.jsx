import React, { useRef, useEffect } from 'react';

const CenterModal = ({ showModal, toggleModal, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                toggleModal();
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleOutsideClick);
            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }
    }, [showModal, toggleModal]);

    return (
        <>
            {showModal &&
                <div className={`fixed inset-20 flex `}>
                    <div className="modal-overlay fixed inset-0 bg-black opacity-40"></div>
                    <div className="modal-container bg-white bg-opacity-80 w-8/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6" ref={modalRef}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default CenterModal;
