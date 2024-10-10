import React from "react";

interface IInputProps {
    className?: string;
}

const baseInputStyle = `outline-0 w-3/4 mx-auto h-11 pl-2 rounded text-sm`;


export const Input:React.FC<IInputProps> = ({className, ...props})=>{
    return (
        <input className={`${baseInputStyle} ${className}`}
               {...props}
        />
    )
}