import './style.css';
import layout from './layout.js';
import mainSection from './main.js';
import { makeSidebar } from './sidebar.js';

document.body.appendChild(layout());

const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main-section');
const header = document.querySelector('.header');

main.appendChild(mainSection());
sidebar.appendChild(makeSidebar());






