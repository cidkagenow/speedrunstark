import React, { FC, ReactNode, MouseEventHandler } from "react";

interface ButtonFormProps {
  children: ReactNode;
  onClick?: () => void;
}

const ButtonForm: FC<ButtonFormProps> = ({ children, onClick }) => {
  return (
    <button
      className="btn btn-primary h-[2.2rem] min-h-[2.2rem] mt-6 mx-5 text-base-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonForm;
