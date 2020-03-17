export default class SinglePostView {
    constructor() {

    }
    async render() {
        // this.container.innerHTML = await this.postsList();
        // console.log("A");
        // ssawait this.template();
    }
    async after_render() {
        // get buttons
        /*
        this.deletePostBtns = document.querySelectorAll('.delete-post');
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                console.log(index);
                this.RemovePost(index);
                // let postId = btn.id;
                // let postId = postId.split('-')[1];
                // console.log(postId);
                // console.log(postId);
                // console.log(index);
                // let rp = RemovePost(postId, index);
                // this.deletePost(postId, index, postsPage;
                // this.render();

            });
        });
        */
    }
    async test() {

    }
    template(post) {
        let article;
        article = /*html*/`
        <article class="article post-details">
            <div class="article-header">
                <span class="category">News</span>
                <h1 class="post-title is-visible" id="post-title">${post.title}</h1>
                <form class="form post-title-edit" id="post-title-form">
                    <input class="" id="" value="${post.title}"/>
                    <button class="" id="save-edit-title" type="">Save Changes</button>
                </form>
                <span class="date">10.14.19</span>
                <button class="edit-btn btn" id="edit-post-title">
                    Edit
                </button>
            </div>
            <div class="article-content">
                <p>${post.body}.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </div>
            <button class="edit-btn btn" id="edit-post-content">
                Edit
            </button>
        </article>
        `;
        return article;



        /*
        <section class="section">
            <h1> Post Id : ${post.id}</h1>
            <p> Post Title : ${post.title} </p>
            <p> Post Content : ${post.body} </p>
            <p> Post Author : ${post.name} </p>
        </section>
        */
        // div.innerHTML += `<span >${JSON.stringify(postsPage[i])}</span>`;
        // this.container.append(article);
        /*
        this.deletePostBtns = document.querySelectorAll('.delete-post');
        this.deletePostBtns.forEach((btn, index) => {
            btn.addEventListener('click', event => {
                // console.log(btn);
                // console.log(index);
                // console.log(event);
                // Here we create our dynamic modal
                // console.log("Click");
                // let postId = event.target.id;
                let postId = btn.id;
                postId = postId.split('-')[1];
                // console.log(postId);
                this.deletePost(postId, index, postsPage);
            
            });
        });*/

    }
    async updatePosts() {

    }

}