// Function call to get User details from API
function getUserDetails(){
  // Extract user Id from params
  const id = getUserId();
  // API call to get User data
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  .then((response) => {
    // Convert API response to json format so it can be easily parsed
    return response.json();
  })
  .then((data) => {
    // Set values from API response to profile details placeholders
    document.getElementById('user-name-header').innerHTML += `<h2>${data.name}</h2>`;
    document.getElementById('user-email').innerHTML += `${data.email}`;
    document.getElementById('user-username').innerHTML += `${data.username}`;
  });
}

// Function call to get all posts of current user from API
function getUserPosts(){
  // Extract user Id from params
  const id = getUserId();
  // API request to get all posts, filtered by userId
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  .then((response) => {
    // Convert API response to json format so it can be easily parsed
    return response.json();
  })
  .then((data) => {
    // Create post and comments using data from API response
    const postsAndCommentsContainer = document.getElementById('collapse-posts-and-comments');
    data.forEach( (post) => {
      // function call to dynamically create new posts
      const newPost = createPost(post);
      // Append each new post to posts container
      postsAndCommentsContainer.append(newPost);
    });
  });
}

// Extract user id from URL params
function getUserId(){
  // Get the current search string
  const queryString = window.location.search;
  // Initaite and extract URL params
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

// Function to dynamically create new Post
function createPost(post){
  const id = post.id;
  // Create outer container to save a post and its comments
  const postAndCommentsDiv = Object.assign( document.createElement('div'), {
    id: `post-${id}`,
    classList: ['container post-container']
  });
  // Create post container to save post
  const postEl = Object.assign( document.createElement('div'), {
    classList: ['card post']
  });
  // Create Post title
  const title = Object.assign(document.createElement('div'), {
    id: `title-${id}`,
    classList: ['card-title post-title'],
    innerHTML: `${post.title}`,
  })
  // Create Post body
  postEl.setAttribute('data-id', post.id);
  const body = Object.assign(document.createElement('p'), {
    id: `body-${id}`,
    classList: ['card-body post-body'],
    innerHTML: `${post.body}`,
  })
  // Create container to store buttons
  const buttonsContainer = Object.assign(document.createElement('div'), {
    classList: ['row']
  })
  // Create Edit Post Button
  const editButton = Object.assign(document.createElement('button'), {
    id: `edit-${id}`,
    classList: ['edit-post-btn col btn btn-secondary btn-sm'],
    innerHTML: 'Edit'
  })
  // Set post id attribute to edit button
  editButton.setAttribute('data-post-id', id)
  // Create Delete Post Button
  const deleteButton = Object.assign(document.createElement('button'), {
    id: `delete-${id}`,
    classList: ['delete-post-btn col btn btn-danger btn-sm'],
    innerHTML: 'Delete'
  })
  // Set post id attribute to delete button
  deleteButton.setAttribute('data-post-id', id)
  // Add edit and delete buttons to buttonsContainer
  buttonsContainer.append(editButton, deleteButton);
  // Append all elements to the post element
  postEl.append(title, body, buttonsContainer);
  // Append post to posts container
  postAndCommentsDiv.append(postEl);

  // Once a post is created, also get all its comments and attach to outer container
  getAndCreateComments(id, postAndCommentsDiv);

  // Return post element
  return postAndCommentsDiv;
}

// Function to get Comments for a Post
function getAndCreateComments(postId, postAndCommentsDiv){
  // Function call to dynamically create element using API response
  const comments = createComment(postId);
  // Append comments to its post
  postAndCommentsDiv.append(comments);
}

function createComment(postId){
  // Create a container for all comments of a post
  const commentsDiv = Object.assign(document.createElement('div'), {
    classList: [`comments-container`]
  })
  // Create a Header for Comments container
  const commentsHeader = Object.assign(document.createElement('p'), {
    classList: 'comments-header',
    innerHTML: 'Comments'
  })
  // Append comments header to comments container
  commentsDiv.append(commentsHeader);
  // API call to GET all comments of a post using nested resources
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Iterate through all comments of the post and create HTML elements for each
    data.forEach((comment) => {
      // Create element for each comment
      const commentCard = Object.assign(document.createElement('div'), {
        id: `comment-${comment.id}`,
        classList: ['card comment']
      })
      // Create element for Commenter's name
      const commenterName = Object.assign( document.createElement('div'), {
        classList: ['card-title commenter-name'],
        innerHTML: `<p>${comment.name}</p>\n<small>${comment.email}</small>`,
      });
      // Create element for Comment body
      const commentBody = Object.assign( document.createElement('div'), {
        classList: ['card-body comment-body'],
        innerHTML: `${comment.body}`,
      });
      // Append name and body to comment
      commentCard.append(commenterName, commentBody);
      // Append comment to comments container
      commentsDiv.append(commentCard);
    });
  });
  // Return created comments container
  return commentsDiv;
}

// Function call to get albums of a user
function getUserAlbums(){
  const id = getUserId();
  // API call to GET albums of a user
  fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
  .then((response) => { 
    return response.json();
  })
  .then((data) => {
    // Create albums container
    const albumsContainer = document.getElementById('collapse-albums');
    // Create albums list
    const albumsList = Object.assign(document.createElement('ul'), {
      classList: ['list-group albums']
    })
    data.forEach( (album) => {
      // Function call to create album list item dynamically
      const newAlbum = createAlbum(album);
      // Append posts container to main container
      albumsList.append(newAlbum)
    });
    // Append album list to albums container
    albumsContainer.append(albumsList);
  });
}

// Function to dynamically create album list item using data from API response
function createAlbum(album){
  // Create list item
  const albumListItem = Object.assign(document.createElement('li'), {
    id: `album-${album.id}`,
    classList: ['list-group-item list-group-item-action album-list-item'],
    innerHTML: `${album.title}`,
  });
  // Set attributes on album list item
  albumListItem.setAttribute('data-id', album.id);
  albumListItem.setAttribute('data-bs-target', 'albumModal');
  // return album list item
  return albumListItem;
}

// Function to create and show photos in albums modal
function showPhotos(albumId){
  // Create modal to show photos in a album
  const albumModal = new bootstrap.Modal(document.getElementById('albumModal'), {});
  // Create photos carousel element
  const carouselInner = document.getElementById('album-carousel-inner');
  // Create album title element
  const title = document.getElementById('modal-album-title');

  // Clear previously set photos in carousel
  carouselInner.innerHTML = '';
  // API call to get all photos of the album using nested resources
  fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then((response) => { 
    return response.json();
  })
  .then((data) => {
    // Create photo elements using data from API response
    data.forEach( (album, index) => {
      // Set title of the album
      title.innerHTML = `${album.title}`;
      // Create photo item
      const photoItem = Object.assign(document.createElement('div'), {
        classList: ['carousel-item'],
        innerHTML: `<img src='${album.url}' class="d-block w-100" alt='${album.title}'>`
      })
      // Add active class to first photo in carousel
      if(index==0){
        photoItem.classList.add('active');
      }
      // Create title for photo
      const itemTitle = Object.assign(document.createElement('div'), {
        classList: ['carousel-caption d-none d-md-block'],
        innerHTML: `<p>${album.title}</p>`
      });
      // And append it to the photo item element
      photoItem.append(itemTitle);
      // Append each photo container to album carousel
      carouselInner.append(photoItem);
    });
  });
  // Show the modal
  albumModal.show();
}

// Capture and handle click events on dynamically created elements
document.addEventListener('click', function(e){
  // if edit button is clicked
  if(e.target && e.target.classList.contains('add-post')){
    //TODO: create using the POST API request
    //TODO: get body params as inputs from a form
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //    // Show newly created post
    // });
  }
  else if(e.target && e.target.classList.contains('edit-post-btn')){
    //TODO: edit using the PUT/PATCH API request
  }
  // if delete button is clicked
  else if(e.target && e.target.classList.contains('delete-post-btn')){
    const postId = e.target.dataset.postId;
    // API call to delete a post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    }).then(
      alert('Deleted!')
    );
  }
  // show photos modal if album item is clicked
  else if(e.target && e.target.classList.contains('album-list-item')){
    const id = e.target.dataset.id;
    showPhotos(id);
  }
});

// Function calls to get User Details, Posts and Albums on page load
window.addEventListener('load', function(){
  getUserDetails();
  getUserPosts();
  getUserAlbums();
});
