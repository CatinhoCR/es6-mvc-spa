// 
import './assets/scss/styles.scss';
import "regenerator-runtime/runtime";

import Router from './config/routing';

import Utils from './helpers/Utilities';

import DashboardCtrl from './DashboardListing/DashboardController';
import HeaderComponent from './Components/HeaderComponent';
// import DashboardView from './DashboardListing/DashboardView';

class App {
    constructor() {
        // this.routing = new Router();

        
        this.Navbar = new HeaderComponent();
        this.DashboardCtrl = new DashboardCtrl();       
        
        
        
    }
    async init() {
        // console.log(this.header);
        // console.log(await this.Navbar.template());
        // await this.Navbar.render();
        // this.header.innerHTML = await this.Navbar.template();
        // await this.Navbar.after_render();
        await this.Navbar.render();
        // console.log("App");
        await this.DashboardCtrl.setupView();
        
    }   
}

const app = new App();
window.addEventListener('load', () => app.init());