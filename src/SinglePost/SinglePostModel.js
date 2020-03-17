import moment from 'moment';

export default class SinglePostModel {
    constructor() {

    }
    init() {


    }
    GetPostContent(id) {
        // instead of this, get local shit
        // proxy: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        var getPost = fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(
                response => response.json(),
                error => error)
            .then((getPost) => {
                return getPost;
            })
            .catch((error) => {
                console.log(error);
            });

        return getPost;

    }

    EditPost(id, newTitle) {
        
    }

    EditPostTitle(id, newTitle) {
        var newPost = fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'PATCH',
            body: JSON.stringify({
                title: newTitle
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(
                response => response.json(),
                error => error)
            .then((newPost) => {
                return newPost;
            })
            .catch((error) => {
                console.log(error);
            });

        return newPost;
    }

    EditPostContent(id, newContent) {
        var newPost = fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'PATCH',
            body: JSON.stringify({
                body: newContent
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(
                response => response.json(),
                error => error)
            .then((newPost) => {
                return newPost;
            })
            .catch((error) => {
                console.log(error);
            });

        return newPost;
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

    GetPostComments() {

    }

}