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

    SavePostComment(id, comment) {
        var newComment = fetch(`https://jsonplaceholder.typicode.com/posts/` + id + `/comments`, {
            method: 'POST',
            body: JSON.stringify({
                email: comment.email,
                body: comment.body
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                // 'Access-Control-Allow-Origin': '*'
            },
        })
        .then(
            response => response.json(),
            error => error)
        .then((newComment) => {
            return  newComment;
        })
        .catch((error) => {
            console.log(error);
        });
        return newComment;
    }

}