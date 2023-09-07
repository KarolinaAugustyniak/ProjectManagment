import React, { ChangeEvent } from "react";

interface InputWithLabelProps {
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  img: string;
  label?: string;
}
const InputWithLabel: React.FC<InputWithLabelProps> = ({
  name,
  handleChange,
  type,
  img,
  label,
}) => {
  return (
    <div className="input-border">
      <input
        type={type}
        name={name}
        id={name}
        placeholder=""
        className="input-border__input"
        onChange={handleChange}
      />
      <div className="input-border__wrapper">
        <img src={img} />
        <label htmlFor={name} className="input-border__label">
          {label ? label : name}
        </label>
      </div>
    </div>
  );
};

export default InputWithLabel;
