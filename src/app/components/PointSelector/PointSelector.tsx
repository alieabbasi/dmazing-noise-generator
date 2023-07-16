import React, { FC, Fragment, useMemo, useState } from "react";
import "./point-selector.css";
import SelectionHoverSVG from "../../assets/images/selection-hover.svg";
import SelectionSVG from "../../assets/images/selection.svg";
import NotchSVG from "../../assets/images/notch.svg"

interface PointSelectorProps {
  y: number;
  x: number;
  onSelect: (i: number, j: number) => void;
}

const PointSelector: FC<PointSelectorProps> = ({ x, y, onSelect }) => {
  const [tooltipXY, setTooltipXY] = useState({ x: -100, y: -100 });

  const circlesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }

    return arr;
  }, []);

  const tooltipLabel = useMemo(() => {
    if (x === 9 && y === 9) return "Center";
    let label: string = "";
    if (x >= 0 && x < 9) label = "Top";
    else if (x > 9 && x < 19) label = "Down";

    if (y >= 0 && y < 9) label += `${label === "" ? "" : ", "}Left`;
    else if (y > 9 && y < 19) label += `${label === "" ? "" : ", "}Right`;

    return label;
  }, [x, y]);

  const pointSelectionHandler = (i: number, j: number) => {
    onSelect(i, j);
    const el = document.getElementById(`${i}-${j}`) as HTMLDivElement;
    const elBounds = el.getBoundingClientRect();
    setTooltipXY({ x: elBounds.x + 7.5, y: elBounds.y + 7.5 });
  };

  return (
    <div className="point-selector-wrapper">
      <div className="point-selector">
        <Circles circlesArr={circlesArr} />
        {circlesArr.map((i) => (
          <Fragment key={`fg-${i}`}>
            {circlesArr.map(
              (j) =>
                i < circlesArr.length - 1 &&
                j < circlesArr.length - 1 && (
                  <div
                    className="selectoion-box"
                    id={`${i}-${j}`}
                    key={`${i}-${j}`}
                    onClick={() => pointSelectionHandler(i, j)}
                  >
                    {x === i && y === j ? (
                      <div className="selectoion-box-selected">
                        <img src={SelectionSVG} alt="" />
                      </div>
                    ) : (
                      <div className="selectoion-box-hover">
                        <img src={SelectionHoverSVG} alt="" />
                      </div>
                    )}
                  </div>
                )
            )}
          </Fragment>
        ))}
        {x >= 0 && y >= 0 && (
          <div
            className="selection-tooltip"
            style={{ top: tooltipXY.y - 50, left: tooltipXY.x }}
          >
            <div className="selection-tooltip-label">{tooltipLabel}</div>
            <img src={NotchSVG} alt="" className="selection-tooltip-notch" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PointSelector;

const Circles = ({ circlesArr }: { circlesArr: any[] }) => (
  <Fragment>
    {circlesArr.map((i) => (
      <Fragment key={`fgg-${i}`}>
        {circlesArr.map((j) => (
          <div
            key={`dot-${i}-${j}`}
            className="point-selection-dot"
            style={{ top: i * 13.05, left: j * 13.05 }}
          ></div>
        ))}
      </Fragment>
    ))}
  </Fragment>
);
