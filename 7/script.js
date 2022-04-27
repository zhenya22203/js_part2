const postsContainer = document.getElementById("posts-container")
const filter = document.getElementById("filter")
const loader = document.querySelector(".loader")


let page = 1;
let limit = 5;
const dataFromBack = []
let loaderIdicate = false;

async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await res.json();
    ++page;

    for (key in data) {
        dataFromBack.push(data[key])
    }
    console.log(dataFromBack);


    return data
}

function renderItem({ title, id, body }) {
    return `
    <div class="post">
    <div class="number">${id}</div>
    <div class="post-info">
      <h2 class="post-title">${title} </h2>
      <p class="post-body">${body}</p>
    </div>
  </div>
    `
};

function renderItems(items) {
    let text = "";

    for (key in items) {
        text += renderItem(items[key])
    }
    return text
}

async function showPosts() {
    const post = await getPosts()

    postsContainer.innerHTML += renderItems(post)
}

function showLoading() {
    loaderIdicate = true;
    loader.classList.add("show")

    showPosts().then(() => {
        loader.classList.remove("show")
        loaderIdicate = false;
    });
}

function searchPosts(event){
    const term = event.target.value.toLowerCase();
    console.log(term);
    const filteredPosts = dataFromBack.filter ((post)=> {
        return post.title.toLowerCase().indexOf(term) >= 0 ||
        post.body.toLowerCase().indexOf(term) >= 0 ||
        post.id.toString().indexOf(term) >= 0
    })

    postsContainer.innerHTML = renderItems(filteredPosts)
}

showPosts();


window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loaderIdicate) {
        console.log("end");

        showLoading();
    }
})

filter.addEventListener("input",searchPosts)