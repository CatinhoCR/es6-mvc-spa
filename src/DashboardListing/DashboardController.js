

import PostsModel from './DashboardModel';
import DashboardView from './DashboardView';

export default class DashboardCtrl {

    /*
    Const: Get view, and model
    Init: Get Posts Listing Container. GET posts from localStorage (if any). Run main function to setup view with posts. GetPosts (& Show). 
    After init: Setup event listeners to deleting posts and creating posts. Then Update view if needed with the results of that deleted/created post. 
    Then: Event listener to show post and change route, and show specific post page.
    
    */

    constructor() {
        this.model = new PostsModel();
        this.view = new DashboardView();
        
    }
    async setupView() {
        this.container = document.getElementById('page-container');
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
        // this.postsShown = 
        // await this.view.render();
        await this.GetPosts();
        await this.after_setup();
    }

    async after_setup() {
        console.log("After Setup");
        // await this.view.after_render();
        await this.ShowPosts(this.posts);
    }

    async GetPosts() {
        // console.log(this.posts);
        // 1. Check if there are items in localStorage. If YES dont run query to database.
        // 2. if NOT, run query, pull posts and assign to localStorage. 
        if( !this.posts || this.posts ===  null) {
            console.log("Fetch posts from DB");
            try {
                let posts = await this.model.GetPosts();
                // console.log(posts);
                this.posts = posts;
            } catch (error) {
                console.log(error);
            }
            // console.log(this.posts);
            localStorage.setItem('posts', JSON.stringify(this.posts));
        } else {
            console.log("Posts already exist in localStorage");
            // console.log(this.posts);
        }
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
    }

    /*
        GetPosts
        1. Get posts from DB or LS 
        2. Create LS object of all posts
        3. Create LS object of shown posts (page)

        ShowPosts
        1. Show posts function gets all 100 posts initially set (either from DB or LS) 
        2. Slices array from another function, to get the ones to be shown
        3. Prepares them to be shown, and sends them to template function to render HTML

        UpdateView
        1. Clears view to be empty.
        2. Slices Array of total posts, to a new quantity, based on argument from parameter or calculation of current (plus/minus) the created/deleted post.
        3. 
        

        SavePost

        DeletePost
    */

    async ShowPosts(allPosts) {
        // console.log(allPosts);
        let posts = [];
        allPosts = allPosts.slice(0, 9);
        // console.log(allPosts);
        this.postsShown = allPosts;
        
        this.container.innerHTML = allPosts.forEach( (post, index) => {
            let thisPost = this.view.template(post, index);
            // console.log(thisPost);
            posts.push(thisPost);
        });

        this.container.innerHTML = posts.join('');
    }

    async UpdateView(newPost, postsToShow) {
        // Need to clear view.
        this.container = document.getElementById('page-container');
        let posts = [];


        
        console.log(newPost);
        console.log(postsToShow);
        
        // postsToShow = postsToShow.slice(0, 10);
        
        // *** TODO: This should be run only when a change is detected in model observers,
        // Add or Remove a specific post from view rendered container.
        // Post to be added ot deleted:

        posts = postsToShow.slice(0, 10);
        this.container.innerHTML = postsToShow.forEach( (post, index) => {
            let thisPost = this.view.template(post, index);
            // console.log(thisPost);
            posts.push(thisPost);
        });

        this.container.innerHTML = posts.join('');

    }

    async SavePost(data) {
        this.posts = JSON.parse(window.localStorage.getItem('posts'));
        // console.log(this.posts);
        try {
            let postCreated = await this.model.CreatePost(data);
            // console.log(postCreated);
            this.posts.push(postCreated);
            // console.log(this.posts);
            // UPdate view
            this.UpdateView(postCreated, this.posts);
            // return postCreated;
        } catch (error) {
            console.log(error);
        }

        
    }

    async DeletePost(post) {
        try {
            let postDelete = await this.model.DeletePost(post);
            console.log(postDelete);
        } catch (error) {

        }
        
    }

}
/*
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