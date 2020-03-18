export default class CommentsView {
    template(comment, index) {
        let singleComment = /*html*/`
            <div>
                <!-- Comment in loop start -->
                <div class="single-comment">
                    <div class="author-photo">
                        <span></span>
                    </div>
                    <div class="content-comment">
                        <h4>${comment.email}</h4>
                        <p>${comment.body}</p>
                    </div>
                    <button class="edit-btn transparent-btn btn" id="edit-comment">
                        Edit
                    </button>
                </div>
                <!-- Comment in loop end -->

            </div>
        `;
        return singleComment;
    }
    createCommentForm() {
        let newCommentForm = /*html*/`
            <button class="btn is-visible toggle-content" id="add-comment-post" type="button" data-target="create-comment-form" data-panel-header="add-comment-post">
                Add Comment
            </button>
            <form class="toggle-content form add-comment" id="create-comment-form">
                <div>
                    <label for="comment-username">Username:</label>
                    <input type="text" placeholder="JohnDoe@email.com" id="comment-author" name="comment-username">
                </div>
                <div>
                    <label for="comment-text">Comment:</label>
                    <textarea name="comment-text" id="comment-content" rows="5"></textarea>
                </div>
                <div id="show-error-comment">
                </div>
                <div>
                    <button class="edit-btn btn " id="cancel-comment-form" type="button" data-target="create-comment-form" data-panel-header="add-comment-post">
                        Cancel
                    </button>
                    <button class="btn" id="save-comment" type="submit" data-target="create-comment-form" data-panel-header="add-comment-post">
                        Submit
                    </button>
                </div>
            </form>
        `;
        return newCommentForm;
    }

    async after_render() {
        
    }
}