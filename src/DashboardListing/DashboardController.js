import PostsModel from "./DashboardModel";
import DashboardView from "./DashboardView";
import ConfirmationComponent from "./../Components/ConfirmationComponent";
export default class DashboardCtrl {
  constructor() {
    this.model = new PostsModel();
    this.view = new DashboardView();
    this.confirmation = new ConfirmationComponent();
  }

  async setupView() {
    this.container = document.getElementById("page-container");
    this.posts = JSON.parse(window.localStorage.getItem("posts"));
    this.shownPosts = [];

    //
    await this.GetPosts();
    this.show = await this.ShowPosts(this.posts);
    return this.show;
    //
  }

  async after_setup() {
    this.deletePostBtns = document.querySelectorAll(".delete-post");
    this.deletePostBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.RemovePost(btn, index);
      });
    });
  }

  async GetPosts() {
    if (!this.posts || this.posts === null) {
      console.log("Fetch posts from DB");
      try {
        let posts = await this.model.GetPosts();
        this.posts = posts;
        // console.log(this.posts);
        localStorage.setItem("posts", JSON.stringify(this.posts));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Posts already exist in localStorage");
    }
    this.posts = JSON.parse(window.localStorage.getItem("posts"));
  }

  async ShowPosts(allPosts) {
    let posts = [];
    allPosts = allPosts.reverse();
    allPosts = allPosts.slice(0, 9);
    this.container.innerHTML = allPosts.forEach((post, index) => {
      let thisPost = this.view.template(post, index);
      posts.push(thisPost);
    });
    this.shownPosts = allPosts;
    return (this.container.innerHTML = posts.join(""));
  }

  async UpdateView(allPosts) {
    this.container.innerHTML = "";
    let posts = [];
    this.container.innerHTML = allPosts.forEach((post, index) => {
      let thisPost = this.view.template(post, index);
      posts.push(thisPost);
    });
    this.container.innerHTML = posts.join("");
    this.shownPosts = allPosts;
    this.deletePostBtns = "";
    this.deletePostBtns = document.querySelectorAll(".delete-post");
    this.deletePostBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.RemovePost(btn, index);
      });
    });
  }

  async SavePost(post) {
    this.posts = JSON.parse(window.localStorage.getItem("posts"));
    // console.log(this.posts);
    let postsShown = this.posts.reverse();
    postsShown = this.posts.slice(0, 9);
    console.log(postsShown);
    // console.log(this.posts);
    // console.log(post);
    this.container = document.getElementById("page-container");
    try {
      let postCreated = await this.model.CreatePost(post);
      // console.log(postCreated);
      postsShown.unshift(postCreated);
      // console.log(postsShown);
      await this.UpdateView(postsShown);
    } catch (error) {
      console.log(error);
    }
  }

  async RemovePost(btn, post) {
    let otherTooltips = document.querySelectorAll(".tooltip");
    otherTooltips.forEach((tt) => {
      tt.classList.remove("show");
    });
    let tooltip = btn.nextElementSibling;
    tooltip.classList.toggle("show");
    document.getElementById("cancel_delete_" + post).onclick = () => {
      // tooltip.classList.toggle("show");
      console.log(tooltip);
      tooltip.classList.remove("show");
    };
    document.getElementById("confirm_delete_" + post).onclick = () => {
      try {
        // let postDelete = await this.model.DeletePost(post);
        this.shownPosts.splice(post, 1);
        this.UpdateView(this.shownPosts);
      } catch (error) {
        console.log(error);
      }
    };
  }
}
