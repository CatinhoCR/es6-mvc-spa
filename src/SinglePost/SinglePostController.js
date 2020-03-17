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
        this.editTitleBtn = document.getElementById('edit-post-title');
        this.editTitleBtn.addEventListener('click', event => {
            this.EditPostTitle();
            // this only toggles form show/hide and clear form values.
            
        });
        this.editTitleBtn = document.getElementById('save-edit-title');
        this.editTitleBtn.addEventListener('click', event => {
            console.log(event);
        });
        /*
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // console.log(index);
                this.RemovePost(index);
            });
        });*/
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

    async EditPostTitle() {
        // Crear input con el valor del titulo actual
        this.titleText = document.getElementById('post-title');
        this.titleForm = document.getElementById('post-title-form');
        // Toggler
        if (this.titleText.classList.contains('is-visible')) {
            this.titleText.classList.remove('is-visible');
            this.titleForm.classList.add('is-visible');
            // hide(content);
            // return;
        } else {
            this.titleText.classList.add('is-visible');
            this.titleForm.classList.remove('is-visible');
        }
        // show(content);
        // Capturar el save
        // Validar que no este vacio
        // SI : guardar. esconder input y mostrar titulo nuevo, y API PATCH Request
        // NO : errorbundleRenderer.renderToStream

    }

    async EditPostBody() {
        // Crear input con el valor del titulo actual
        // Capturar el save
        // Validar que no este vacio
        // SI : guardar. esconder input y mostrar titulo nuevo, y API PATCH Request
        // NO : errorbundleRenderer.renderToStream

    }
    
}