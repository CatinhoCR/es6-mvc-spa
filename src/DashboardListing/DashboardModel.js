import * as moment from 'moment';

export default class PostsModel {
    constructor() {
        // this.moment = moment();
    }
    init() {

    }
    GetPosts() {
        var posts = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            },
        })
            .then(
                response => response.json(),
                error => error)
            .then((posts) => {
                return posts;
            })
            .catch((err) => {
                console.log(error);
            });

        return posts;
    }

    DeletePost(id) {
        var deletedPost = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            }
        })
            .then(
                response => response.json(),
                error => error)
            .then((deletedPost) => {
                return  deletedPost;
            })
            .catch((err) => {
                console.log(error);
            });
        return deletedPost;
    }

    CreatePost(content) {
        var newPost = fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: content.title,
                body: content.body,
                userId: 10
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                // 'Access-Control-Allow-Origin': '*'
            },
        })
        .then(
            response => response.json(),
            error => error)
        .then((newPost) => {
            return  newPost;
        })
        .catch((error) => {
            console.log(error);
        });
        return newPost;
    }

    
    setDate(month, year) {
        // this.now.month(month).year(year);
        
       //  let now = moment().format('MM.DD.YYYY');
        // return now;
    }
    
}