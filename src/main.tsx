import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";

declare global {
  interface Window {
    renderMyReactApp: (container: HTMLElement) => void;
    unmountMyReactApp: (container: HTMLElement) => void;
  }
}

const roots = new Map<HTMLElement, ReactDOM.Root>();

window.renderMyReactApp = (container) => {
  if (!container) {
    console.error(" Container element not found for React app.");
    return;
  }

  let root = roots.get(container);
  if (!root) {
    root = ReactDOM.createRoot(container);
    roots.set(container, root);
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log(" React app rendered successfully.");
};

window.unmountMyReactApp = (container) => {
  const root = roots.get(container);
  if (root) {
    root.unmount();
    roots.delete(container);
  }
};
