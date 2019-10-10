import React from 'react';
import ReactDOM from 'react-dom';

import 'react-dates/initialize';
import './Components/QA/react_dates_overrides.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
