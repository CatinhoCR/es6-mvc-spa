"use strict";

// import "regenerator-runtime/runtime";
import Utils from './../helpers/Utilities';
import DashboardCtrl from './../DashboardListing/DashboardController';
import SinglePostCtrl from './../SinglePost/SinglePostController';

export default class Router {
    constructor() {
        this.DashboardCtrl = new DashboardCtrl();
        this.SinglePostCtrl = new SinglePostCtrl();
        // this.Utils = new Utils();
        const routes = {
            '/': this.DashboardCtrl,
            '/post/:id': this.SinglePostCtrl
        };
    }
    async router_init () {
        // Lazy load view element:
        const content = null || document.getElementById('page_container');

        // Get the parsed URl from the addressbar
        let request = Utils.parseRequestURL();

        // Parse the URL and if it has an id part, change it with the string ":id"
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    }


}

/*
const routes = {
            '/': DashboardCtrl,
            '/post/:id': SinglePostCtrl
        };
export default class Router {

    constructor(){
       this.routes = [];
    }

    get(uri, callback){
        // ensure that the parameters are not empty
        if(!uri || !callback) throw new Error('uri or callback must be given');

        // ensure that the parameters have the correct types
        if(typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if(typeof callback !== "function") throw new TypeError('typeof callback must be a function');

        // throw an error if the route uri already exists to avoid confilicting routes
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        })

        // Step 5 - add route to the array of routes
        const route = {
            uri, // in javascript, this is the same as uri: uri, callback: callback, avoids repition
            callback
        }
        this.routes.push(route);
    }

    init(){
        this.routes.some(route=>{

            let regEx = new RegExp(`^${route.uri}$`); // i'll explain this conversion to regular expression below
            let path = window.location.pathname;

            if(path.match(regEx)){
                // our route logic is true, return the corresponding callback

                let req = { path } // i'll also explain this code below
                return route.callback.call(this, req);
            }
        })
    }
}
*/