import { Link } from 'react-router-dom'
import {Icon, IconPlus} from '@tabler/icons-react';
import React from "react";

interface AddButtonProps {
    to: string;
    Icon?: Icon;
    size?: number
}

const AddButton: React.FC<AddButtonProps> = ({to, Icon, size}) => {
    return (
        <Link to={to}
              className={`absolute bottom-6 right-4 border-0 w-[60px] h-[60px] rounded-full flex items-center 
              justify-center cursor-pointer bg-[color:var(--color-main)]`}>
            {Icon ? <Icon size={size ? size : 48} className={`text-[color:var(--color-white)]`}/> : <IconPlus size={48} className={`text-[color:var(--color-white)]`}/>}
        </Link>
    )
}

export default AddButton