import React, { FC } from 'react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  customStyles?: string;
  onClick: () => void;
}
import classes from './Button.module.scss';

const Button: FC<Props> = ({ children, onClick, customStyles, ...attributes }) => {
  return (
    <button type="button" className={`${classes.btn} ${customStyles}`} {...attributes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
