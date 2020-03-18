

import PostsModel from './DashboardModel';
import DashboardView from './DashboardView';
export default class DashboardCtrl {

    constructor() {
        this.model = new PostsModel();
        this.view = new DashboardView();
    }
    
    async setupView() {
        this.container = document.getElementById('page-container');
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
        this.shownPosts = [];

        // 
        await this.GetPosts();
        this.show = await this.ShowPosts(this.posts);
        return this.show;
        // 
    }

    async after_setup() {
        this.deletePostBtns = document.querySelectorAll('.delete-post');
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // console.log(index);
                this.RemovePost(index);
            });
        });
    }

    async GetPosts() {
        if (!this.posts || this.posts === null) {
            console.log("Fetch posts from DB");
            try {
                let posts = await this.model.GetPosts();
                this.posts = posts;
                // console.log(this.posts);
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
        // console.log(allPosts);
        allPosts = allPosts.reverse();
        allPosts = allPosts.slice(0, 9);
        // console.log(allPosts);
        this.container.innerHTML = allPosts.forEach( (post, index) => {
            let thisPost = this.view.template(post, index);
            posts.push(thisPost);
        });
        this.shownPosts = allPosts;
        return this.container.innerHTML = posts.join('');
    }

    async UpdateView(allPosts) {
        this.container.innerHTML = '';
        let posts = [];
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
    }

    async SavePost(post) {
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
        // console.log(this.posts);
        let postsShown = this.posts.reverse();
        postsShown = this.posts.slice(0, 9);
        console.log(postsShown);
        // console.log(this.posts);
        // console.log(post);
        this.container = document.getElementById('page-container');
        try {
            let postCreated = await this.model.CreatePost(post);
            // console.log(postCreated);
            postsShown.unshift(postCreated);
            // console.log(postsShown);
            await this.UpdateView(postsShown);
        } catch (error) {
            console.log(error);
        }
    }

    async RemovePost(post) {
        let postDelete;
        try {
            postDelete = await this.model.DeletePost(post);
            // console.log(postDelete);
            this.shownPosts.splice(post, 1);
            // console.log(this.shownPosts);
            await this.UpdateView(this.shownPosts);
        } catch (error) {
            console.log(error);
        }
    }
}
