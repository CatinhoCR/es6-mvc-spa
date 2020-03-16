"use strict";

import DashboardCtrl from './../DashboardListing/DashboardController';
export default class HeaderComponent {
    constructor() {
        this.PostsCtrl = new DashboardCtrl();
        // this.header = null || document.getElementById('header-container');
    }

    async render() {
        // this.header.innerHTML = await this.template();
        // await this.getTemplate();
        // await this.after_render();

        return await this.template();
    }

    async after_render() {

        this.createBtn = document.getElementById('add-post-btn');
        this.createBtn.addEventListener('click', event => {
            // this only toggles form show/hide and clear form values.
            this.toggleContent(event.target);
        });

        this.saveBtn = document.getElementById('save-post-btn');
        this.saveBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            // console.log(event);
            this.newPostForm(event.target);
        }, false);
    }

    async toggleContent(elem, time) {
        // This should be moved to a reusable file, an importable and reusable component to create toggles?
        // console.log(elem);
        // console.log(elem.dataset.target)
        let target = elem.dataset.target;
        let content = document.getElementById(target);
        // console.log(content);
        function show(elem) {
            // // Get the natural height of the element
            var getHeight = function () {
                elem.style.display = 'block'; // Make it visible
                var height = elem.scrollHeight + 'px'; // Get it's height
                elem.style.display = ''; //  Hide it again
                return height;
            };

            var height = getHeight(); // Get the natural height
            elem.classList.add('is-visible'); // Make the element visible
            elem.style.height = height; // Update the max-height

            // Once the transition is complete, remove the inline max-height so the content can scale responsively
            window.setTimeout(function () {
                elem.style.height = '';
            }, 350);
            // content.classList.add('is-visible');
            // console.log("SHow");
        }

        function hide(elem) {
            // Give the element a height to change from
            elem.style.height = elem.scrollHeight + 'px';

            // Set the height back to 0
            window.setTimeout(function () {
                elem.style.height = '0';
            }, 1);

            // When the transition is complete, hide it
            window.setTimeout(function () {
                elem.classList.remove('is-visible');
            }, 350);
            // console.log("Hide");
            // content.classList.remove('is-visible');
        }

        // Toggler
        if (content.classList.contains('is-visible')) {
            hide(content);
            return;
        }
        show(content);
    }

    async newPostForm(target) {
        // This should get data, then validate it. 
        // If OK, format it, get current date and send to controller for saving. If not print errors.
        var title = document.getElementById('post-title').value;
        var body = document.getElementById('post-content').value;

        // Validate Data
        this.errorsContainer = document.getElementById('show-error');
        this.errorsContainer.innerHTML = '';
        if (title === '' || body === '') {
            let error = document.createElement('p');
            error.setAttribute('class', 'main-color');
            error.innerHTML = '';
            if (title === '' && body != '') {
                error.innerHTML = 'Please add TITLE to your new post.';
            } else if (body === '' && title != '') {
                error.innerHTML = 'Please add a CONTENT to your new post.';
            } else {
                console.log("empty");
                error.innerHTML = 'Please add a TITLE and CONTENT to your new post.';
            }
            this.errorsContainer.append(error);
        } else {
            let data = {
                title: title,
                body: body
            }

            var savePost = await this.PostsCtrl.SavePost(data);
            this.toggleContent(target);
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
        }
    }

    async template() {
        // this could be moved to a static HTML file that gets imported in the render function. Leaving as is for now.
        const HeaderContent = /*html*/`
            <nav class="navbar main-nav" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="" href="/#/">
                            <h1>Sample babel boilerplate for testing stuff</h1>
                        </a>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="">
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
                </div> <!-- container -->
            </nav>
            <form class="form add-post toggle-content" id="create-post-form">
                <h2>Add New Post</h2>
                <input name="postTitle" id="post-title" type="text" placeholder="Title"  />
                <textarea name="" id="post-content" placeholder="Your post content.." rows="8"></textarea>
                <div id="show-error"></div>
                <button type="submit" class="btn third-btn" id="save-post-btn" data-target="create-post-form">Save</button>
            </form>
        `;
        return HeaderContent;
    }
}