

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
        
        
        // await this.view.render();
        

        await this.GetPosts(this.posts);
        await this.after_setup();
        
    }
    async after_setup() {
        
        // await this.view.after_render();
        await this.UpdatePosts(this.posts);
        
    }

    async GetPosts(posts) {
        // console.log(posts);
        let allPosts;
        if (posts === null) {
            allPosts = await this.model.GetPosts();
            allPosts = allPosts.reverse();
            window.localStorage.setItem('posts', JSON.stringify(allPosts));
            
        } else {
            allPosts = JSON.parse(window.localStorage.getItem('posts'));
        }
        this.posts = allPosts;
        // this.posts = posts;
        // console.log(posts);
        // this.posts = allPosts;
        
    }

    async UpdatePosts(allPosts) {
        // console.log(allPosts);
        allPosts = allPosts.slice(0, 9);
        const postsToRender = allPosts.map( async (post, index) => {
            console.log(post);
            post += this.view.template(post, index)
            return post;
        });
        Promise.all(postsToRender).then( (resolve) => {
            this.container.append(resolve);
            // console.log(resolve);
            // console.log(this.view.template(resolve));
        });

        

        /*
        const postsToRender = await
        await postsToRender.map((post, index) => {
            // console.log(post);
            // console.log(index);
            this.view.template(post, index);
            this.container.append(this.view.template(post, index));
        });
        */
        
        /* 
        await allPosts.forEach((post, index) => {
            // console.log(post);
            // this.view.template(post, index);
            this.container.append(this.view.template(post, index));
        });
        */
    }

    async SavePost(data) {
        // console.log("a");
        // console.log(data);
        let postCreated = await this.model.CreatePost(data);
        // console.log(postCreated);
        return postCreated;
        
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