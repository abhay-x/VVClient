import React from 'react';

const Button = ({ text = 'Click Me!!', type = 'button', className = {}, onClick = () => { } }) => {
    return (
        <button type={type} className={className} onClick={onClick} >
            {text}
        </button>
    );
};

export default Button;
