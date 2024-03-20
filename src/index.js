import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import FormularioReact from './components/formulario';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormularioReact/>
  </React.StrictMode>
);



reportWebVitals();
