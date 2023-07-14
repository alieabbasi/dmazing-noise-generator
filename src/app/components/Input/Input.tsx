import React, { ChangeEvent, FC, ReactNode } from "react";
import "./input.css";

interface InputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  suffix?: ReactNode;
  placeholder?: string;
  customWidth?: string;
}

const Input: FC<InputProps> = ({
  value,
  label,
  suffix,
  placeholder,
  name,
  customWidth,
  onChange,
}) => {
  return (
    <div className="input-container" style={{ width: customWidth }}>
      {label && <p className="input-label">{label}</p>}
      <input
        className="input"
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        style={{ textAlign: customWidth ? "center" : "left" }}
      />
      {suffix}
    </div>
  );
};

export default Input;
