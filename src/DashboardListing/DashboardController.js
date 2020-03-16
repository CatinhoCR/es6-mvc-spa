

import PostsModel from './DashboardModel';
import DashboardView from './DashboardView';

export default class DashboardCtrl {

    constructor() {
        this.model = new PostsModel();
        this.view = new DashboardView();

    }
    async setupView() {
        // Here we create local reference to DOM container and an initial global post object
        this.container = document.getElementById('page-container');
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
        this.shownPosts = [];

        // Here we should show initial posts
        await this.GetPosts();
        // console.log(this.posts);
        await this.ShowPosts(this.posts);
        
        await this.after_setup();
    }

    async after_setup() {
        // Here we get event listeners for create/delete post buttons and update view
        
        this.deletePostBtns = document.querySelectorAll('.delete-post');
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // console.log(index);
                this.RemovePost(index);
            });
        });
    }

    async GetPosts() {
        // Here

        if (!this.posts || this.posts === null) {
            console.log("Fetch posts from DB");
            try {
                let posts = await this.model.GetPosts();
                this.posts = posts;
                localStorage.setItem('posts', JSON.stringify(this.posts));
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Posts already exist in localStorage");
        }
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
    }

    async ShowPosts(allPosts) {
        let posts = [];
        allPosts = allPosts.reverse();
        allPosts = allPosts.slice(0, 9);
        // console.log(allPosts);
        this.container.innerHTML = allPosts.forEach( (post, index) => {
            let thisPost = this.view.template(post, index);
            posts.push(thisPost);
        });
        this.container.innerHTML = posts.join('');
        this.shownPosts = allPosts;
        // console.log(allPosts);
        
        // Write to global var the list of shown posts. So that update view can get it and act accordingly.
    }

    async UpdateView(allPosts) {
        this.container.innerHTML = '';
        let posts = [];
        // allPosts = allPosts.reverse();
        // allPosts = allPosts.slice(0, 9);
        // console.log(allPosts);
        this.container.innerHTML = allPosts.forEach( (post, index) => {
            let thisPost = this.view.template(post, index);
            posts.push(thisPost);
        });
        this.container.innerHTML = posts.join('');
        this.shownPosts = allPosts;
        this.deletePostBtns = '';
        this.deletePostBtns = document.querySelectorAll('.delete-post');
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // console.log(index);
                this.RemovePost(index);
            });
        });
        // console.log(allPosts);
        
        // Write to global var the list of shown posts. So that update view can get it and act accordingly.
    }

    /*
    async UpdateView(postsToShow) {
        // Get list of shown posts.
        // Determine if action is to create ot delete
        this.container.innerHTML = '';
        // this.deletePostBtns = [];
        let posts = [];
        // console.log(postsToShow);
        this.shownPosts = postsToShow;
        // console.log(this.shownPosts);
        
        
        this.container.innerHTML = postsToShow.forEach( (post, index) => {
            let thisPost = this.view.template(post, index);
            posts.push(thisPost);
        });
        this.container.innerHTML = posts.join('');
        // this.deletePostBtns = document.querySelectorAll('.delete-post');
        
    }
    */

    async SavePost(post) {
        // *** TODO: Validate post to create has data.
        // console.log(this.shownPosts);
        
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
        let postsShown = this.posts.reverse();
        postsShown = postsShown.slice(0, 9);
        // console.log(this.posts);
        // console.log(post);
        this.container = document.getElementById('page-container');
        try {
            let postCreated = await this.model.CreatePost(post);
            
            // console.log(postCreated);
            postsShown.push(postCreated);
            console.log(postsShown);
            // this.container.prepend()
            // console.log(this.posts);
            // UPdate view
            // this.UpdateView(postCreated, this.posts);
            // return postCreated;
        } catch (error) {
            console.log(error);
        }
    }

    async RemovePost(post) {
        // *** TODO: Remove posts is only running once. Figure this out. Might want to get LS object of shown posts
        // await this.after_setup();
        // console.log(this.posts);
        // console.log(this.shownPosts);
        // console.log(post);

        let postDelete;
        try {
            postDelete = await this.model.DeletePost(post);
            // console.log(postDelete);
            this.shownPosts.splice(post, 1);
            console.log(this.shownPosts);
            await this.UpdateView(this.shownPosts);
            // await this.UpdateView(this.shownPosts);
            // Update View to reflect new shown posts
        } catch (error) {
            console.log(error);
        }
        
    }
}
