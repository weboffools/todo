import './style.css';
import layout from './layout.js';
import mainSection from './main.js';

const container = layout();
container.appendChild(mainSection());

document.body.appendChild(container);




