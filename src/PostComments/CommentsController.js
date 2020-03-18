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
        this.commentSection = document.getElementById('comments-container');
        this.comments = JSON.parse(window.localStorage.getItem('comments'));
        await this.GetPostComments();
        this.show = await this.ShowPostComments(this.comments);
        return this.show;
    }

    async after_setup() {
        this.newCommentForm = document.getElementById('new-comment-form');
        let form = await this.view.createCommentForm();
        return this.newCommentForm.innerHTML = form;
    }

    async GetPostComments() {
        let request = Utils.parseRequestURL();
        if (!this.comments || this.comments === null) {
            try {
                let postComments = await this.model.GetPostComments(request.id);
                // this.comments = postComments.reverse();
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
        // console.log(postComments)
        let allComments = [];
        // postComments = postComments.reverse();
        postComments.forEach( (comment, index) => {
            let thisComment = this.view.template(comment, index);
            allComments.push(thisComment);
        });
        return this.commentSection.innerHTML = allComments.join('');
    }

    async UpdateComments(comment) {
        // console.log(comment);
        // this.comments = JSON.parse(window.localStorage.getItem('comments'));
        this.comments = JSON.parse(window.localStorage.getItem('comments'));
        // console.log(this.comments);
        let postComments = this.comments;
        // let postComments = this.comments.reverse();
        postComments.push(comment);
        // console.log(postComments);
        localStorage.setItem('comments', JSON.stringify(postComments));
        return await this.ShowPostComments(postComments);
    }

    async SaveNewComment(id, comment) {
        // console.log(comment);
        try {
            let commentCreated = await this.model.SavePostComment(id, comment);
            // return commentCreated;
            await this.UpdateComments(commentCreated);
        } catch (error) {
            console.log(error);
        }
    }

}