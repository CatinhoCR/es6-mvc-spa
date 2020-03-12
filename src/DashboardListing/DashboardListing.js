// --------------------------------
//  Define Data Sources
// --------------------------------

// Model
let GetPostsList = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, options);
        const json = await response.json();
        // console.log(json);
        return json;
    } catch (err) {
        console.log('Error getting documents', err);
    }
}

let DeletePost = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, options);
        const json = await response.json();
        // console.log(json);
        return json;
    } catch (err) {
        console.log('Error getting documents', err);
    }
}

let CreatePost = async (content) => {

}

// End of Model

// Ctrl
let GetPosts = async () => {
    var posts = await GetPostsList();
    posts = posts.reverse();
    posts = posts.slice(0, 9);
    window.localStorage.setItem('posts', JSON.stringify(posts));
    return posts;

}
let RemovePost = async (id, index) => {
    // only getting index &bposts for array splice since api data is fake
    // console.log(id);
    // console.log(index);
    var deleteP = await DeletePost(id);
    var PostsLS = JSON.parse(window.localStorage.getItem('posts'));

    // console.log(PostsLs);
    
    PostsLS.splice(index, 1);

    // update view
    window.localStorage.setItem('posts', JSON.stringify(PostsLS));
    console.log(PostsLS);
    // need to refresh view list, and also update localStorage item
    return PostsLS;
}
let AddPost = async () => {
    
}

// End of Controller

// View
let Home = {
    constructor() {
        //         this.PostsLS = JSON.parse(window.localStorage.getItem('posts'));
        //     console.log(this.PostsLS);
        // this.postsNow;
    },
    render: async () => {
        var posts = await GetPosts();
        // this.posts = posts;
        // console.log(post);
        let view = posts.map(post => /*html*/`
            <div class="article list-item col col-4">
                <button type="button" class="delete-post main-btn btn" id="delete-${post.id}">X</button>
                <span class="category">News</span>
                <a href="#/post/${post.id}">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </a>
                <span class="date">10.14.19</span>
            </div>`
        ).join('\n ');
        return view;
    },
    after_render: async () => {
        // console.log(posts );
        let deletePostBtns = document.querySelectorAll('.delete-post');
        deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                let postId = btn.id;
                postId = postId.split('-')[1];
                // console.log(postId);
                // console.log(index);
                let rp = RemovePost(postId, index);
                // this.deletePost(postId, index, postsPage;
                this.render();

            });
        });
    }
}

export default Home;
/*
class Model {
    constructor() {

    }
}

class View {
    constructor() {

    }
}

class Controller {
    constructor() {

    }
}


import PostsCtrl from './../controllers/PostsListingCtrl';

import Modal from './../templates/ModalWindow';
export default class PostsListingView {
    constructor() {
        this.header = document.getElementById('site-header');
        this.el = document.getElementById('page-container');
        this.postsC = new PostsCtrl();
        // this.postsContainer = document.createElement('div');
        // this.postsContainer.setAttribute('id', 'blog-listing-page');
        // this.el.append(this.postsContainer);
    }
    async render() {
        
        this.el.innerHTML = '';
        this.createPostContainer = document.createElement('div');
        this.createPostContainer.setAttribute('id', 'create-post-container');
        this.createPostContainer.innerHTML = `<button type="button" class="btn" id="add-post-btn">Add Post</button>`;
        this.header.append(this.createPostContainer);
        await this.getPosts();
        this.createBtn = document.getElementById('add-post-btn');
		this.createBtn.addEventListener('click', event => {
			event.stopPropagation();
			// console.log(event);
			// console.log(this);
			this.newPostForm();
		});
    }

    async getPosts() {
        // This would be a "nice to have" but also important to be made into a reusable data service 
        var postsAll = window.localStorage.getItem('posts');
        // console.log(postsAll);
        if (postsAll != null) {
            console.log("Local Storage");
            var posts = JSON.parse(postsAll);
        } else {
            console.log("Fetch");
            var posts = await this.postsC.Posts();
        }
        // console.log(posts);
        // Needs refactor, long ass wait time.. obviously
        this.showPosts(posts);
    }
    async showPosts(posts) {
        // let html = /*html* /``;
        let postsPage = posts;
        // console.log(postsPage);
        postsPage = postsPage.slice(0, 9);
        // console.log(postsPage);
        for (let i = 0; i < postsPage.length; i++) {
            let div = document.createElement('div');
            div.setAttribute('class', 'article list-item col col-4');
            div.setAttribute('data-target', i);
            div.innerHTML = `<button type="button" class="delete-post main-btn btn" id="delete-${postsPage[i]['id']}">X</button>`;
            div.innerHTML += `<span class="category">News</span>`;
            // div.innerHTML += `<span >${JSON.stringify(postsPage[i])}</span>`;
            div.innerHTML += `<h2>${postsPage[i]['title']}</h2>`;
            div.innerHTML += `<p>${postsPage[i]['body']}</p>`;
            div.innerHTML += `<span class="date">10.14.19</span>`;
            div.innerHTML += `<button type="button" class="show-post" id="post-${postsPage[i]['id']}">Show</button>`;
            this.el.append(div);
        }

        this.deletePostBtns = document.querySelectorAll('.delete-post');
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', event => {
                // console.log(btn);
                // console.log(index);
                // console.log(event);
                // Here we create our dynamic modal
                // console.log("Click");
                // let postId = event.target.id;
                let postId = btn.id;
                postId = postId.split('-')[1];
                // console.log(postId);
                this.deletePost(postId, index, postsPage);
            
            });
        });

    }

    async newPostForm() {
        var form = document.createElement('form');
        form.setAttribute('class', 'form add-post');
        form.setAttribute('id', 'create-post-form');
		form.innerHTML = `<input name="postTitle" id="post-title" type="text" placeholder="Title"  />`;
		form.innerHTML += `<textarea name="" id="post-content">Your post content..</textarea>`;
		form.innerHTML += `<button type="submit" class="btn" id="save-post-btn">Save</button>`;
        this.header.append(form);

        this.data;
        function logData(e) {
            var title = document.getElementById('post-title').value;
			var body = document.getElementById('post-content').value;

			let data = {
				title: title,
				body: body
            };
            e.stopPropagation();
            e.preventDefault();
            this.data = data;
        }
        const newPostForm = document.getElementById('create-post-form');
        newPostForm.addEventListener('submit', logData);
        console.log(this.data);
        var postsN = await this.postsC.NewPost(this.data);
        console.log(postsN);
        /*
		this.submitBtn = document.getElementById('save-post-btn');
		this.submitBtn.addEventListener('click', event => {
			
			// NO time for validations... 
			
			console.log(data);
			console.log(event);
			this.createPost(data);
        });
        * /
    }

    async createPost(data) {
        // console.log(this);
        // let nPosts = await this.postsC.NewPost(data);
        // console.log(nPosts);
    }

    async deletePost(id, index, posts) {
        // console.log(id);
        // console.log(index);
        // console.log(posts);
        // let deleteOK = false;
        
        // var deleteModal = new Modal({
        //     title: posts[index].title,
        //     content: 'Really delete this post? There is no way back ! You have been warned.',
        // });
        // deleteModal.show().once('dismiss', function (modal, ev, button) {
        //     if (button && button.value) {
        //         // alert("You've clicked on an OK button.");
        //         console.log("A");
                            
        //     } else {
        //         console.log("B");
        //     }
        // });
        // deleteModal.on('dismiss', function(deleteOK){
            
        // });
        
        // console.log(deleteModal);
        let dPosts = await this.postsC.deletePost(id, index, posts);
        console.log(dPosts);
        this.updateView(dPosts);
    }

    async updateView(posts) {
        /*
        this.el.innerHTML = '';
        window.localStorage.clear();
        var newPosts = posts;
        window.localStorage.setItem('posts', JSON.stringify(newPosts));
        console.log(newPosts);
        this.paginatePosts(newPosts);
        * /

        this.el.innerHTML = '';
        
        // console.log(posts);
        this.showPosts(posts);
        // this.currentPostList = posts;
        window.localStorage.setItem('posts', JSON.stringify(posts));
    }
}

import PostsModel from '../models/PostsListingModel';
// import PostsListingView from '../views/PostsListingView';
// import Modal from './../templates/ModalWindow';

export default class PostsCtrl {
    constructor() {
        this.model = new PostsModel();
        // this.modalWindow = new Modal();
        // this.view = new PostsView();
    }
    init() {
        //  this.view.init();

    }
    async Posts() {
        var postsData = await this.model.getPosts();
        // console.log("this is the Ctrl");
        // console.log(postsData);
        postsData = postsData.reverse();
        window.localStorage.setItem('posts', JSON.stringify(postsData));
        return postsData;
    }

    async deletePost(id, index, posts) {
        // let rPosts = this.model.DeletePost(id);
        let rPosts = JSON.parse(window.localStorage.getItem('posts'));
        
        // rPosts = posts;
        
        rPosts.splice(index, 1);
        // console.log(rPosts);
        window.localStorage.clear();
        

        window.localStorage.setItem('posts', JSON.stringify(rPosts));
        return rPosts;
    }

    async NewPost(content) {
        console.log("C");
        console.log(content);
        var nPost = await this.model.CreatePost(content);
        console.log(nPost);
        return nPost;
    }

    async getPost(id) {
        //     const singlePost = await this.model.GetSinglePost(id);

        //     return singlePost;
    }

}
*/
/*
// --------------------------------
//  Define Data Sources
// --------------------------------

let getPostsList = async () => {
     const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
    render : async () => {
        let posts = await getPostsList()
        let view =  /*html* /`
        <section class="section">
        <h1> Home </h1>
        <ul>
            ${ posts.map(post => 
                /*html* /`<li><a href="#/p/${post.id}">${post.title}</a></li>`
                ).join('\n ')
            }
        </ul>
    </section>
`
return view
}
, after_render: async () => {
}

}

export default Home;
*/