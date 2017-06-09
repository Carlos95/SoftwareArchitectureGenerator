import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

Popup.alert('I am alert, nice to meet you');

ReactDom.render(React.createElement(Popup, null), document.getElementById('search'));
