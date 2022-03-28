import React from 'react';

function Button({ text, click }) {
    return <>
        <button onClick={click} className='btn'>{text}</button>
    </>
}

export default Button;