export default class CommentsView {
    template() {
        let comment = /*html*/`
            
                <h3>Comments</h3>
                <!-- Comment in loop start -->
                <div class="single-comment">
                    <div>
                        <div class="author-photo">
                            <!-- simulate whatever -->
                        </div>
                    </div>
                    <div>
                        <h4>Comment Author</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, expedita culpa reiciendis in voluptatem qui ullam sunt pariatur explicabo ut vitae iste exercitationem distinctio rem eos dicta dolores voluptas cupiditate?</p>
                    </div>
                    <button class="edit-btn transparent-btn btn" id="edit-comment">
                        Edit
                    </button>
                </div>
                <!-- Comment in loop end -->
                <form class="" id="">
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
                <button class="" id="" type="button">
                    Add Comment
                </button>
                <!-- add comment button/form -->
            
        `;
        return comment;
    }
}