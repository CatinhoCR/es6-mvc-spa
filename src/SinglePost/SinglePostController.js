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
        // await this.comments.after_setup();

        // *** TODO: Make this modular...
        // Option 1: This would be a for each, with a querySelectorAll from another attr, NOT id. To follow DRY principles... no time now. Fix.
        this.editTitleBtn = document.getElementById('edit-post-title');
        this.editTitleBtn.addEventListener('click', event => {
            console.log("A");
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
        // console.log(request.id);

        // Type 1 would be title here, type 2 would be content. Could be optimized, no time RN.
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

    /*


    async saveNewTitle() {
        // *** TODO: Keep this DRY, rushing this atm.
        let request = Utils.parseRequestURL();
        // console.log(request.id);
        this.newText = document.getElementById('new-title').value;
        let newPost = await this.model.EditPostTitle(request.id, this.newText);
        // console.log(newPost);
        await this.EditPostTitle();
        
        // await this.ShowPostContent(newPost);
        
        // this.titleText.classList.add('is-visible');
        // this.titleForm.classList.remove('is-visible');
    }

    async EditPostContent(target) {

        // Crear input con el valor del titulo actual
        this.contentText = document.getElementById('content');
        this.contentForm = document.getElementById('edit-content-form');
        this.editInput = document.getElementById('new-content');
        // Toggler
        if (this.contentText.classList.contains('is-visible')) {
            // console.log("A");
            target.innerHTML = 'Cancel';
            this.contentText.classList.remove('is-visible');
            this.contentForm.classList.add('is-visible');
            this.editInput.focus();
            // hide(content);
            // return;
        } else {
            // console.log("b");
            
            target.innerHTML = 'Edit';
            this.contentText.classList.add('is-visible');
            this.contentForm.classList.remove('is-visible');
            
        }
        // show(content);
        // Capturar el save
        // Validar que no este vacio
        // SI : guardar. esconder input y mostrar titulo nuevo, y API PATCH Request
        // NO : errorbundleRenderer.renderToStream

    }

    async saveNewContent() {
        // Crear input con el valor del titulo actual
        // Capturar el save
        // Validar que no este vacio
        // SI : guardar. esconder input y mostrar titulo nuevo, y API PATCH Request
        // NO : errorbundleRenderer.renderToStream
        // *** TODO: Keep this DRY, rushing this atm.
        let request = Utils.parseRequestURL();
        // console.log(request.id);
        this.newText = document.getElementById('new-content').value;
        let newPost = await this.model.EditPostContent(request.id, this.newText);
        // console.log(newPost);
        await this.EditPostContent();
        
        // await this.ShowPostContent(newPost);

        // this.titleText.classList.add('is-visible');
        // this.titleForm.classList.remove('is-visible');

    }
    */

    async UpdateView() {

    }
    
}