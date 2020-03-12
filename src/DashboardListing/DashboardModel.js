import moment from 'moment';

export default class PostsModel {
    constructor() {

    }
    init() {


    }
    GetPosts() {
        var posts = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((res) => {
                // console.log(res.json());
                return res.json();
            })
            .then((json) => {
                // console.log(json);
                return json;
            })
            .catch((err) => {
                console.log(err);
            });
        return posts;
    }

    DeletePost(id) {
        var deletedPost = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                // console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
        return deletedPost;
    }

    /*
    Commented block, API post requests are not available
    EditPost(id, body) {
        var editPost = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: 'foo',
                body: 'bar',
                userId: 1
            })
        })
            .then((res) => {
                // console.log(res);
                return res;
            })
            .then((json) => {
                // console.log(json);
                return json;
            })
            .catch((err) => {
                console.log(err);
            });
        return editPost;

    }*/

    CreatePost(content) {
        /*
        let newPost = content;
        let ePosts = JSON.parse(window.localStorage.getItem('posts'));
        ePosts.push(newPost);
        window.localStorage.setItem('posts', JSON.stringify(newPost));
        */

        // Commented block, API post requests are not available
        var newPost = fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: content.title,
                body: content.body,
                userId: 10
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
            .then((res) => {
                // console.log(res);
                return res;
            })
            .then((json) => {
                // console.log(json);
                return json;
            })
            .catch((err) => {
                console.log(err);
            });

        return newPost;
    }

    GetSinglePost() {

    }
    /*
    GetSinglePost(postId) {
        let selectedPost = fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( (res) => {
            return res.json();
        })
        .then( (json) => {
            return json
        })
        .catch ((err) => {
            console.log(err);
        })
        return selectedPost;
    }
    setDate(month, year) {
        // this.now.month(month).year(year);
    }
    */
}