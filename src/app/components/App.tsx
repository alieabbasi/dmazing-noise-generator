import React, { ChangeEvent, useState } from "react";
import "../styles/ui.css";

function App() {
  const [variables, setVariables] = useState({
    width: "",
    height: "",
    size: "",
    distribution: "",
  });

  const onCreate = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-shapes",
          width: +variables.width,
          height: +variables.height,
          size: +variables.size,
          scale: +variables.distribution,
        },
      },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  const handleVariableChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVariables((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div className="app">
      <p>Radial Distribution</p>
      <button id="create" onClick={onCreate}>
        Insert Noise
      </button>
    </div>
  );
}

export default App;
