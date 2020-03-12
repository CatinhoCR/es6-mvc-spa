export default class DashboardView {
    constructor() {
        
    }
    async render() {
        // this.container.innerHTML = await this.postsList();
        // console.log("A");
        // ssawait this.template();
    }
    async after_render() {
        // get buttons
    }
    async test() {

    }
    async template(post, i) {
        // inside a loop
        
        // console.log(post);
        // article.setAttribute('data-target', i);
        
        const article = /*html*/`
            <div class="article list-item col col-4">
                <button type="button" class="delete-post main-btn btn" id="delete-${post.index}">X</button>
                <a href="#" class="show-post" id="post-${post.id}">
                    <span class="category">News</span>
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <span class="date">10.14.19</span>
                </a>
            </div>
        `;
         
        
        return article;


        
        // div.innerHTML += `<span >${JSON.stringify(postsPage[i])}</span>`;
        // this.container.append(article);
        /*
        // let html = /*html* /``;
        let postsPage = posts;
        // console.log(postsPage);
        postsPage = postsPage.slice(0, 9);
        // console.log(postsPage);
        for (let i = 0; i < postsPage.length; i++) {
            let div = document.createElement('div');
            div.setAttribute('class', 'article list-item col col-4');
            div.setAttribute('data-target', i);
            div.innerHTML = /*html* /`<button type="button" class="delete-post main-btn btn" id="delete-${postsPage[i]['id']}">X</button>`;
            div.innerHTML += `<span class="category">News</span>`;
            // div.innerHTML += `<span >${JSON.stringify(postsPage[i])}</span>`;
            div.innerHTML += `<h2>${postsPage[i]['title']}</h2>`;
            div.innerHTML += `<p>${postsPage[i]['body']}</p>`;
            div.innerHTML += `<span class="date">10.14.19</span>`;
            div.innerHTML += `<button type="button" class="show-post" id="post-${postsPage[i]['id']}">Show</button>`;
            this.el.append(div);
        }

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