"use strict";

import DashboardCtrl from './../DashboardListing/DashboardController';
export default class HeaderComponent {
    constructor() {
        this.PostsCtrl = new DashboardCtrl();
        this.header = null || document.getElementById('header-container');
        this.PostsCtrl = new DashboardCtrl();
    }
    async render() {
        // Lazy Load | This should be moved to a router. ???s
        
        this.header.innerHTML = await this.template();
        await this.after_render();
        // console.log(await this.template());
        // This works here, but not if called through the render() function in another component. Look into this and see why the this object is changing to undefined for invocation from another class (like app.js). The methods then would be undefined for the this object.

        // I am thinking a best way to do this would be to have a reusable setupTemplate function, which would then call a static HTML template file, and then would do a sprintf or search and replace through stuff if dynamic values needed to be loaded into that html file. But it's just a general idea for now and not sure on how to implement.
    }
    async after_render() {
        this.createBtn = document.getElementById('add-post-btn');
		this.createBtn.addEventListener('click', event => {
			// console.log(event);
			// console.log(this);
            // this would only toggle form show/hide and clear form values.
            // event.stopPropagation();
            this.toggleContent(event.target)
        });
        // this.PostsCtrl.SavePost("a");
        // var form = null || document.getElementById('create-post-form');
        // console.log(form);
        this.saveBtn = document.getElementById('save-post-btn');
        this.saveBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            // console.log(event);
            // console.log(event.target.form);
            // var title = document.getElementById('post-title').value;
            // var body = document.getElementById('post-content').value;
            // console.log(title);
            // console.log(body);

            this.newPostForm(event);

            // console.log(this.newPostForm()); PROMISE
            // let form = event.target.form;
            // var data = await new FormData(form);
            // console.log(await data);
            // console.log(await data);
            // await this.newPostForm();
            
            
            // capture data, validate it, store it to local object if valid || errors FE if unvalid
            // POST request to save new post. Update view to show it on list.

            // event.stopPropagation();
        }, false);
    }

    // button has a data-target attribute, or button has an id to be matched with a data atrribute on the toggleable div... is there a better way to this than data attributes?
    // Could be done with an anchor element to, and get hash value.. but that would probably interfere with router?
    async toggleContent(elem, time) {
        // This should be moved to a reusable file, an importable and reusable component to create toggles?
        
        // console.log(elem);
        // console.log(elem.dataset.target)
        let target = elem.dataset.target;
        let content = document.getElementById(target);
        // console.log(content);
        function show(content) {
            // // Get the natural height of the element
            // var getHeight = function () {
            //     elem.style.display = 'block'; // Make it visible
            //     var height = elem.scrollHeight + 'px'; // Get it's height
            //     elem.style.display = ''; //  Hide it again
            //     return height;
            // };

            // var height = getHeight(); // Get the natural height
            // elem.classList.add('is-visible'); // Make the element visible
            // elem.style.height = height; // Update the max-height

            // // Once the transition is complete, remove the inline max-height so the content can scale responsively
            // window.setTimeout(function () {
            //     elem.style.height = '';
            // }, 350);
            content.classList.add('is-visible');
            // console.log("SHow");
        }

        function hide(content) {
            // // Give the element a height to change from
            // elem.style.height = elem.scrollHeight + 'px';

            // // Set the height back to 0
            // window.setTimeout(function () {
            //     elem.style.height = '0';
            // }, 1);

            // // When the transition is complete, hide it
            // window.setTimeout(function () {
            //     elem.classList.remove('is-visible');
            // }, 350);
            // console.log("Hide");
            content.classList.remove('is-visible');
        }
        
        // Toggler
        if( content.classList.contains('is-visible') ) {
            hide(content);
            return;
        }
        show(content);
    }

    async newPostForm(event) {
        // This should get data, then validate it. 
        // If OK, format it, get current date and send to controller for saving. If not print errors.
        // console.log(event.target.form);
        var title = document.getElementById('post-title').value;
        var body = document.getElementById('post-content').value;
        // console.log(title);
        // console.log(body);
        let data = {
            title: title,
            body: body
        }
        var savePost = await this.PostsCtrl.SavePost(data);
        console.log(savePost);
        // console.log(data);
        /*
        if ( !isForm || isForm === null) {
            console.log(isForm);
        }
        
        

        this.data;
        // console.log(form);
        function logData(e) {
            var title = document.getElementById('post-title').value;
			var body = document.getElementById('post-content').value;

			let data = {
				title: title,
				body: body
            };
            e.stopPropagation();
            e.preventDefault();
            this.data = data;
        }*/
        // const newPostForm = document.getElementById('create-post-form');
        // newPostForm.addEventListener('submit', logData);
        // console.log(this.data);
        // var postsN = await this.postsC.NewPost(this.data);
        // console.log(postsN);
        /*
		this.submitBtn = document.getElementById('save-post-btn');
		this.submitBtn.addEventListener('click', event => {
			
			// NO time for validations... 
			
			console.log(data);
			console.log(event);
			this.createPost(data);
        });
        */
    }

    async template() {
        // this could be moved to a static HTML file that gets imported in the render function. Leaving as is for now.
        const HeaderContent = /*html*/`
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <h1>Newsmedia</h1>
                        </a>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                            <button type="button" class="btn" id="add-post-btn" data-target="create-post-form">
                                Add New Article
                            </button>
                            <!--<a class="navbar-item" href="/#/about">
                                About
                            </a>
                            <a class="navbar-item" href="/#/secret">
                                Secret
                            </a>-->
                        </div>
                        <form class="form add-post toggle-content" id="create-post-form">
                            <input name="postTitle" id="post-title" type="text" placeholder="Title"  />
                            <textarea name="" id="post-content" placeholder="Your post content.."></textarea>
                            <button type="submit" class="btn" id="save-post-btn">Save</button>                        
                        </form>
                        <!--<div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="/#/register">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a class="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>-->
                    </div>
                </div>
            </nav>
        `;
        return HeaderContent;
    }
}