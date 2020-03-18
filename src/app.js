// 
import './assets/scss/styles.scss';
import "regenerator-runtime/runtime";

// import Router from './config/routing';

import Utils from './helpers/Utilities';

import HeaderComponent from './Components/HeaderComponent';
import DashboardCtrl from './DashboardListing/DashboardController';
import SinglePostCtrl from './SinglePost/SinglePostController';
import Error404Component from './Components/Error404Component';
// import DashboardView from './DashboardListing/DashboardView';

// List of supported routes. Any url other than these routes will throw a 404 error

class App {
    constructor() {
        // this.Router = new Router();
        this.Navbar = new HeaderComponent();
        this.DashboardCtrl = new DashboardCtrl();
        this.SinglePostCtrl = new SinglePostCtrl();
        this.Error404 = new Error404Component();
    }
    async init() {

        this.header = null || document.getElementById('header-container');
        this.content = null || document.getElementById('page-container');
        
        this.routes = {
            '/': this.DashboardCtrl,
            '/post/:id': this.SinglePostCtrl
        };


        // This would need to be moved to router.js, imported and used from there. Not here... also there are hundreds of improvements to make here, plus the 404 is not really set up, for now it just exists and works at functional but basic level.
        await this.router();

    }
    async router() {
        // Lazy load view element:
        // this.content.innerHTML

        // Render header of page 
        // This header does not "reload" on route change, might need to change how header is being rendered in the specific components file
        this.header.innerHTML = await this.Navbar.render();
        await this.Navbar.after_render();


        // Get the parsed URl from the addressbar
        let request = Utils.parseRequestURL();

        // Parse the URL and if it has an id part, change it with the string ":id"
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');

        // Get the page from our hash of supported routes.
        // If the parsed URL is not in our list of supported routes, select the 404 page instead
        let page = this.routes[parsedURL] ? this.routes[parsedURL] : this.Error404;
        this.content.innerHTML = await page.setupView();
        await page.after_setup();
    }
}

const app = new App();
// window.addEventListener('load', () => app.init());

// Listen on hash change:
window.addEventListener('hashchange', () => app.router());
// Listen on page load:
window.addEventListener('load', () => app.init());


// window.addEventListener('load', router);