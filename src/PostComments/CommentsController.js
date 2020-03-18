import Utils from './../helpers/Utilities';
import CommentsModel from './CommentsModel';
import CommentsView from './CommentsView';
import ToggleComponent from './../Components/ToggleComponent';

export default class SinglePostCtrl {

    constructor() {
        this.model = new CommentsModel();
        this.view = new CommentsView();
        this.toggleComponent = new ToggleComponent();
    }
    
    async setupView() {
        // this.section = document.getElementById('comments-container');
        // this.section.innerHTML = await this.GetPostComments();
//         return this.GetPostComments();
        this.commentSection = document.getElementById('comments-container');
        // this.commentSection.innerHTML = await this.comments.setupView();
        this.comments = JSON.parse(window.localStorage.getItem('postComments'));
        await this.GetPostComments();
        this.show = await this.ShowPostComments(this.comments);
        return this.show;
        // console.log(this.comments);

        // await this.GetPostComments();
        // this.allComments = await this.GetPostComments();
        // return this.allComments;
        // this.comments = await this.ShowPostComments(this.postComments);
        // return this.comments;
    }

    async after_setup() {

    }

    async GetPostComments() {
        let request = Utils.parseRequestURL();
        if (!this.comments || this.comments === null) {
            try {
                let postComments = await this.model.GetPostComments(request.id);
                this.comments = postComments;
                localStorage.setItem('comments', JSON.stringify(this.comments));
                // console.log(postComments);
                // console.log(this.comments);
            } catch (error) {
                console.log(error);
            }
        }
        this.comments = JSON.parse(window.localStorage.getItem('comments'));
        // console.log(this.comments);
    }

    async ShowPostComments(postComments) {
        console.log(postComments)
        let allComments = [];
        postComments = postComments.reverse();
        postComments.forEach( (comment, index) => {
            let thisComment = this.view.template(comment, index);
            allComments.push(thisComment);
        });
        return this.commentSection.innerHTML = allComments.join('');
        // console.log(allComments);
        // this.comments = allComments.join('');
        // console.log(allComments);
        // return this.commentSection.innerHTML = allComments.join('');
        // return  allComments.join('');
        // return this.container.innerHTML = allComments.join('');
    }

    /*
    async ShowPostComments(comments) {
        let allComments = [];
        allComments = comments.reverse();
        console.log(allComments);
        this.container.innerHTML = allComments.forEach( (comment, index) => {
            let thisComment = this.view.template(comment, index);
            allComments.push(thisComment);
        });
        return this.container.innerHTML = allComments.join('');

        /*
        let commentsThis = 
        
        return this.container.innerHTML = commentsThis;


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
        * /
    }*/

}