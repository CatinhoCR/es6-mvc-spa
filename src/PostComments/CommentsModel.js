export default class CommentsModel {

    constructor() {

    }

    GetPostComments(id) {
        var comments = fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(
                response => response.json(),
                error => error)
            .then((comments) => {
                return comments;
            })
            .catch((error) => {
                console.log(error);
            });

        return comments;
    }
}