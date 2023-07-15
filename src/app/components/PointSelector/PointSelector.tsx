import React, { FC, Fragment, useMemo, useState } from "react";
import "./point-selector.css";
import SelectionHoverSVG from "../../assets/images/selection-hover.svg";
import SelectionSVG from "../../assets/images/selection.svg";

interface PointSelectorProps {
  onSelect: (i: number, j: number) => void;
}

const PointSelector: FC<PointSelectorProps> = ({ onSelect }) => {
  const [selectedIJ, setSelectedIJ] = useState<{ i: number; j: number }>({
    i: undefined,
    j: undefined,
  });
  const circlesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }

    return arr;
  }, []);

  const pointSelectionHandler = (i: number, j: number) => {
    setSelectedIJ({ i, j });
    onSelect(i, j);
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
                    {selectedIJ.i === i && selectedIJ.j === j ? (
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
