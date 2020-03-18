import Utils from './../helpers/Utilities';
import SinglePostModel from './SinglePostModel';
import SinglePostView from './SinglePostView';
import ToggleComponent from './../Components/ToggleComponent';
import CommentsController from './../PostComments/CommentsController';

export default class SinglePostCtrl {

    constructor() {
        this.model = new SinglePostModel();
        this.view = new SinglePostView();
        this.toggleComponent = new ToggleComponent();
        this.comments = new CommentsController();
    }
    
    async setupView() {
        // console.log("Single Post");
        this.container = document.getElementById('page-container');
        this.singlePost = JSON.parse(window.localStorage.getItem('singlePost'));
        await this.GetPostContent();
        this.show = await this.ShowPostContent(this.singlePost);
        return this.show;
    }

    async after_setup() {
        // this.commentSection = document.getElementById('comments-container');
        // this.commentSection.innerHTML = await this.comments.setupView();
        await this.comments.setupView();
        await this.comments.after_setup();

        /*
            *** TODO: Important note here...
                This sucks bad... Tried implementing observer pattern and event listener interface but failed and barely have any free time to spend doing this 
                -
                Job sprints are heavy, traffic is heavier and gotta keep myself happy as well... 
                An unhappy mind does miserable code. This is not the case here, but I really can't get enough free time RN.
                
                An interview would showcase my knowledge way better than this :)
                 
                Callback hell PLEASE don't don't come back.... Or did it?! 
                I'm just wasting time now, might as well get some sleep to deliver some Vuelable code tomorrow. 
                (Yes, Im doing Vue.js and delivering valuable code to clients..)
                P.S: I know... That's why i'm a programmer, not a comedian.
                -
        */

        /* Create New Comment Form Button - Start */
        // *** TODO: This should be moved to the toggle component itself, creating buttons there somehow catching events with classes not IDs and be reusable...
        this.createCommentForm = document.getElementById('add-comment-post');
        this.createCommentForm.addEventListener('click', event => {
            // console.log("A");
            // this.EditPostTitle(event.target);
            this.toggleComponent.toggleContent(event.target);
            // this only toggles form show/hide and clear form values.
            
        });
        this.cancelCommentForm = document.getElementById('cancel-comment-form');
        this.cancelCommentForm.addEventListener('click', event => {
            // console.log("A");
            // this.EditPostTitle(event.target);
            this.toggleComponent.toggleContent(event.target);
            // this only toggles form show/hide and clear form values.
            
        });
        this.saveCommentBtn = document.getElementById('save-comment');
        this.saveCommentBtn.addEventListener('click', event => {
            event.preventDefault();
            // console.log(event);
            // this.toggleComponent.toggleContent(event.target);
            this.validateSubmitComment(event.target);
        });
        /* Create New Comment Form Button - End */

        /* Edit Comment Form Button - End */
        this.editCommentForm = document.querySelectorAll('.comment-edit-btn');
        this.editCommentForm.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                console.log(index);
                console.log(event);
                this.toggleComponent.toggleContent(event.target);
                // this.RemovePost(index);
                console.log("El");
            });
        });

        this.deleteComment = document.querySelectorAll('.comment-delete');
        this.deleteComment.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                console.log(index);
                console.log(event);
                this.toggleComponent.toggleContent(event.target);
                // this.RemovePost(index);
                console.log("Ss");
                // this.SaveEditField(0);
            });
        });

        this.saveEditComment = document.querySelectorAll('.comment-edit-save');
        this.saveEditComment.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                console.log(index);
                console.log(event);
                this.toggleComponent.toggleContent(event.target);
                // this.RemovePost(index);
                console.log("Ss");
                // this.SaveEditField(0);
            });
        });
        /* Edit Comment Form Button - End */

        /* Edit Post Title Button - Start */
        // *** TODO: Make this modular...
        // Option 1: This would be a for each, with a querySelectorAll from another attr, NOT id. To follow DRY principles... no time now. Fix.
        this.editTitleBtn = document.getElementById('edit-post-title');
        this.editTitleBtn.addEventListener('click', event => {
            // this.EditPostTitle(event.target);
            this.toggleComponent.toggleContent(event.target);
            // this only toggles form show/hide and clear form values.
            
        });
        this.saveTitleBtn = document.getElementById('save-edit-title');
        this.saveTitleBtn.addEventListener('click', event => {
            event.preventDefault();
            console.log(event);
            this.toggleComponent.toggleContent(event.target);
            this.SaveEditField(1);

        });
        /* Edit Post Title Button - End */
        
        /* Edit Post Content Button - Start */
        this.editContentBtn = document.getElementById('edit-post-content');
        this.editContentBtn.addEventListener('click', event => {
            console.log("B");
            this.toggleComponent.toggleContent(event.target);
            // this only toggles form show/hide and clear form values.
            
        });
        this.saveContentBtn = document.getElementById('save-edit-content');
        this.saveContentBtn.addEventListener('click', event => {
            event.preventDefault();
            console.log(event);
            this.toggleComponent.toggleContent(event.target);
            this.SaveEditField(0);

        });
        /* Edit Post Content Button - End */

    }

    async GetPostContent() {
        // Get requested resource from URL
        let request = Utils.parseRequestURL();
        // console.log(request.id);

        // if localstorage single post object not exists
        if (!this.singlePost || this.singlePost === null) {
            // console.log("Fetch post from DB");
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
            // console.log("Post already exists in localStorage");
        }
        this.singlePost = JSON.parse(window.localStorage.getItem('singlePost'));
        // console.log(this.singlePost);
    }

    async ShowPostContent(post) {
        // console.log(post);
        localStorage.setItem('singlePost', JSON.stringify(post));
        let thisPost = this.view.template(post);
        
        return this.container.innerHTML = thisPost;
        
        
    }

    async SaveEditField(type) {
        // *** TODO: Keep this DRY, rushing this atm.
        let request = Utils.parseRequestURL();

        if( type === 1) {
            // console.log("title");
            try {
                this.newText = document.getElementById('new-title').value;
                let newPost = await this.model.EditPostTitle(request.id, this.newText);
                // console.log(newPost);
                document.getElementById('title').innerHTML = newPost.title;
                localStorage.setItem('singlePost', JSON.stringify(newPost));
            } catch(error) {
                console.log(error);
            }
            
        } else {
            try {
                // console.log("content");
                this.newText = document.getElementById('new-content').value;
                let newPost = await this.model.EditPostContent(request.id, this.newText);
                // console.log(newPost);
                document.getElementById('content').innerHTML = newPost.body;
                localStorage.setItem('singlePost', JSON.stringify(newPost));
            } catch(error) {
                console.log(error);
            }
        }
    }

    async validateSubmitComment(target) {
        // This should get data, then validate it. 
        // If OK, format it, get current date and send to controller for saving. If not print errors.
        // console.log(target);
        this.author = document.getElementById('comment-author').value;
        this.content = document.getElementById('comment-content').value;

        // Validate Data
        this.errorsContainer = document.getElementById('show-error-comment');
        this.errorsContainer.innerHTML = '';
        
        if (this.author === '' || this.content === '') {
            
            var error;
            error = document.createElement('p');
            error.setAttribute('class', 'main-color');
            if ( this.author != '' ) {
                error.innerHTML = 'Please add CONTENT to your new post.';
            } else if ( this.content != '' ) {
                error.innerHTML = 'Please add an AUTHOR to your new post.';
            } else {
                error.innerHTML = 'Please add a USER and CONTENT to your new post.';
            }
            console.log(this.errorsContainer);
            this.errorsContainer.append(error);
        } else {
            let comment = {
                email: this.author,
                body: this.content
            }
            let request = Utils.parseRequestURL();
            var saveComment = await this.comments.SaveNewComment(request.id, comment);
            // console.log(saveComment);
            this.toggleComponent.toggleContent(target);
            document.getElementById('comment-author').value = '';
            document.getElementById('comment-content').value = '';
        }
    }

    async EditPostComment() {

    }
    
}