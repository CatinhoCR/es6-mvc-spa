export default class CommentsView {
    template(comment, index) {
        let singleComment = /*html*/`
            <div>
                <!-- <h3>Comments</h3> -->
                <!-- Comment in loop start -->
                <div class="single-comment">
                    <div>
                        <div class="author-photo">
                            <!-- simulate whatever -->
                            <span>circle</span>
                        </div>
                    </div>
                    <div>
                        <h4>${comment.name}</h4>
                        <p>${comment.body}</p>
                    </div>
                    <button class="edit-btn transparent-btn btn" id="edit-comment">
                        Edit
                    </button>
                </div>
                <!-- Comment in loop end -->
                <!-- form, get index and create specific data target and id based on that  $ { comment.index } -->
                <form class="toggle-content" id="create-post-form">
                    <div>
                        <label for="comment-username">Username:</label>
                        <input type="text" placeholder="John Doe" id="comment-author" name="comment-username">
                    </div>
                    <div>
                        <label for="comment-text">Comment:</label>
                        <textarea name="comment-text" id="comment-content" rows="5"></textarea>
                    </div>
                    <div>
                        <button class="" id="" type="submit">
                            Submit
                        </button>
                        <button class="" id="" type="button">
                            Cancel
                        </button>
                    </div>
                </form>
                <!-- 
                This needs to be outside repeater template, just like the title for the section.
                <button class="btn" id="add-comment-post" type="button" data-target="create-post-form">
                    Add Comment
                </button> -->
                <!-- add comment button/form -->
            </div>
        `;
        return singleComment;
    }
}