import React, { FC } from "react";
import "./slider.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Input from "../Input/Input";
import SliderBackgroundPNG from "../../assets/images/slider-bg.png";

interface SliderProps {
  value: number;
  name: string;
  onChange: (value: number) => void;
}

const Slider: FC<SliderProps> = ({ value, name, onChange }) => {
  return (
    <div className="slider-container">
      <div className="slider-range">
        <InputRange
          name={name}
          minValue={0}
          maxValue={100}
          value={value}
          formatLabel={() => null}
          onChange={onChange}
        />
        <img src={SliderBackgroundPNG} alt="" className="slider-bg" />
      </div>
      <div className="slider-input-container">
        <Input
          value={value.toString()}
          name="distribution"
          onChange={(e) => onChange(+e.target.value)}
          customWidth="75px"
          suffix={<p className="slider-percent-suffix">%</p>}
        />
      </div>
    </div>
  );
};

export default Slider;
