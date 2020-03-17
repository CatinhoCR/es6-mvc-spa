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
        this.container = document.getElementById('comments-container');
        // this.postComments = JSON.parse(window.localStorage.getItem('postComments'));
        this.postComments = await this.GetPostComments();
        this.comments = await this.ShowPostComments(this.postComments);
        return this.comments;
    }

    async after_setup() {

    }

    async GetPostComments() {
        console.log("Get");
        // Get requested resource from URL
        let request = Utils.parseRequestURL();
        console.log(request.id);
        try {
            let postComments = await this.model.GetPostComments(request.id);
            this.postComments = postComments;
            return this.postComments;
            /*
                localStorage.setItem('postComments', JSON.stringify(this.postComments));

                */
        } catch (error) {
            console.log(error);
        }
    }

    async ShowPostComments(comments) {
        console.log("Show");
        let commentsThis = this.view.template(comments);
        
        return this.container.innerHTML = commentsThis;
    }

}