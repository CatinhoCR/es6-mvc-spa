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
        <section class="section">
            <h1> Post Id : ${post.id}</h1>
            <p> Post Title : ${post.title} </p>
            <p> Post Content : ${post.body} </p>
            <p> Post Author : ${post.name} </p>
        </section>
        `;
        return article;
        


        
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