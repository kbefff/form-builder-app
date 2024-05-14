import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import the App component
import { FormProvider } from './context/FormContext'; // Import the FormProvider for context
import './styles/index.css'; // Import global styles

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <FormProvider>
        <App />
      </FormProvider>
    </React.StrictMode>
  );
}
