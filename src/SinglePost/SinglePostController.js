import Utils from './../helpers/Utilities';
import SinglePostModel from './SinglePostModel';
import SinglePostView from './SinglePostView';

export default class SinglePostCtrl {

    constructor() {
        this.model = new SinglePostModel();
        this.view = new SinglePostView();

    }
    
    async setupView() {
        console.log("Single Post");
        this.container = document.getElementById('page-container');
        this.singlePost = JSON.parse(window.localStorage.getItem('singlePost'));
        await this.GetPostContent();
        this.show = await this.ShowPostContent(this.singlePost);
        return this.show;
    }

    async after_setup() {

    }

    async GetPostContent() {
        // Get requested resource from URL
        let request = Utils.parseRequestURL();
        console.log(request.id);

        // if localstorage single post object not exists
        if (!this.singlePost || this.singlePost === null) {
            console.log("Fetch post from DB");
            try {
                let singlePost = await this.model.GetPostContent(request.id);
                this.singlePost = singlePost;
                localStorage.setItem('singlePost', JSON.stringify(this.singlePost));
            } catch (error) {
                console.log(error);
            }
        } else if (this.singlePost.id != request.id) {
            // Check if the post in localStorage is the same as requested, if not query for it on DB.. This is only implemented because of API limitations, and some queries taking as long as 1 minute long to return and it's nonsense for development.
            try {
                let singlePost = await this.model.GetPostContent(request.id);
                this.singlePost = singlePost;
                localStorage.setItem('singlePost', JSON.stringify(this.singlePost));
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Post already exists in localStorage");
        }
        this.singlePost = JSON.parse(window.localStorage.getItem('singlePost'));
        console.log(this.singlePost);
    }

    async ShowPostContent(post) {
        console.log(post);
        
        let thisPost = this.view.template(post);
        return this.container.innerHTML = thisPost;
        
    }
    
}