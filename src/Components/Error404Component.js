"use strict";

export default class Error404Component {
    constructor() {
        
    }

    async setupView() {
        console.log("404 page");
    }
    async after_setup() {
    
    }
}

/*
let Error404 = {

    render : async () => {
        let view =  /*html* /`
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;
*/