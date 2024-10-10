import { ReactNode } from 'react';

interface TypographyProps {
    children: string | ReactNode;
    className?: string;
}

export const MainHeaderText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <h1 className={`text-2xl text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </h1>
    );
};

export const MediumHeaderText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <h1 className={`text-xl text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </h1>
    );
};

export const SmallHeaderText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <h1 className={`text-sm text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </h1>
    );
};

export const MediumBodyText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <p className={`text-base text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </p>
    );
};

export const LargeBodyText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <p className={`text-lg text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </p>
    );
};

export const SmallBodyText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <p className={`text-sm text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </p>
    );
};

export const XSmallBodyText: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <p className={`text-[0.625rem] text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </p>
    );
};

export const SmallBodyTextBold: React.FC<TypographyProps> = ({ children, className, ...props }) => {
    return (
        <p className={`text-sm font-semibold text-[color:var(--color-text)] ${className ? className : ''}`} {...props}>
            {children}
        </p>
    );
};
