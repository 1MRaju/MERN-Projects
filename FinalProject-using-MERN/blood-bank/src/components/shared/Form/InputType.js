import React from 'react';

function InputType({value,onChange,name,inputType,labelText,labelFor}) {
    return (
        <>
        <div className='mb-1'>
             <label htmlFor={labelFor} className="form-label">{labelText}</label>
             <input type={inputType} className="form-control" name={name} value={value} onChange={onChange} />
        </div>
        </>
    );
}

export default InputType;