import React, { TextareaHTMLAttributes } from 'react';
import './styles.css';

interface TextareaPropos extends  TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaPropos> = ({label,name, ...rest}) => {
  return (
    <>
    <div className="textarea-block">
        <label htmlFor={name}>{label}</label>
        <textarea  id={name} {...rest} />
    </div>
    </>
  );
}

export default Textarea;
