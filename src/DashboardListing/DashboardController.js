import PostsModel from './DashboardModel';
import DashboardView from './DashboardView';

export default class DashboardCtrl {
    constructor() {
        this.model = new PostsModel();
        this.view = new DashboardView();
    }
    setupView() {
        this.view.render();
    }

    async GetPosts() {
        let allPosts = await this.model.GetPosts();
        console.log(allPosts);
        
    }

    async SavePost(data) {
        // console.log("a");
        // console.log(data);
        let postCreated = await this.model.CreatePost(data);
        console.log(postCreated);
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