import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <IntlProvider locale="en">
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </IntlProvider>,
    document.getElementById('root'));

addLocaleData([...en]);    
// registerServiceWorker();
