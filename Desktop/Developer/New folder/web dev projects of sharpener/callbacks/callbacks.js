const posts = [
  {
    title: "Post One",
    body: "This is Post One",
    createdAt: new Date().getTime(),
  },
  {
    title: "Post Two",
    body: "This is Post Two",
    createdAt: new Date().getTime(),
  },
];
let intervalId = 0;

function getPosts() {
  clearInterval(intervalId);
  // lastEditedInSecondsAgo(posts);
  intervalId = setInterval(() => {
    let output = "";
    posts.forEach((posts) => {
      // lastEditedInSecondsAgo(posts);
      output += `<li>${posts.title} - last updated ${
        Math.floor(new Date().getTime() - posts.createdAt) / 1000
      } Seconds ago</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post, callback) {
  setTimeout(() => {
    posts.push({ ...post, createdAt: new Date().getTime() });
    callback();
  }, 2000);
}

function create4thPost(post, callback2) {
  setTimeout(() => {
    posts.push({ ...post, createdAt: new Date().getTime() });
    callback2();
  }, 2000);
}

getPosts();

createPost({ title: "Post Three", body: "This is Post Three" }, getPosts);

create4thPost({ title: "Post Four", body: "This is Post Four" }, getPosts);

// let intervalIdOfEdited = 0;
// function lastEditedInSecondsAgo(post) {
//   clearInterval(intervalIdOfEdited);
//   intervalIdOfEdited = setInterval(() => {
//     let now = new Date().getTime();
//     let lastEdited = post.createdAt;
//     console.log(`last Edited ${(now - lastEdited) / 1000} seconds ago`);
//   }, 1000);
// }
