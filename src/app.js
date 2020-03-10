"use strict";
import './assets/scss/styles.scss';
import "regenerator-runtime/runtime";

import Router from './config/routing';

import Utils from './helpers/Utilities';

class App {
    constructor() {
        this.routing = new Router();
    }
    init() {

    }
}

const app = new App();
window.addEventListener('load', () => app.init());