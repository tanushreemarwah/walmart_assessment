// Function to get Users List
function getUsers(){
  // GET API call to get list of Users and handling response
  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => { 
    // Convert API response to json format so it can be easily parsed
    return response.json();
  })
  .then((data) => {
    // Get the list element where items are to be added
    const list = document.getElementById('user-list');
    // Iterate over the API response data 
    data.forEach( (user) => {
      // Function call to dynamically create new user list item
      let listItem = createUserNode(user.id, user.name, user.email, user.username);
      // And append it to the list
      list.append(listItem);
    });
  });
}

// Create userNode dynamically and return new HTML node
function createUserNode(id, name, email, username){
  // Assign HTML properties like id, classes, innerHTML and data-attributes to new created element
  const newUser = Object.assign(document.createElement(`li`), {
    id: `${id}`,
    classList: ['list-group-item list-group-item-action'],
    innerHTML: `${name}`
  });
  newUser.setAttribute('title', `Email: ${email}\nUsername: ${username}`);
  newUser.setAttribute('data-email', email);
  newUser.setAttribute('data-username', username);
  // return user node
  return newUser;
}

// Function call to get Users List as soon as the page loads
window.addEventListener('load', function(){
  getUsers();
})

// Navigate to User Detail Page on clicking the name form the list
document.addEventListener('click', function(e){
  // delegate click function since elements are created dynamically
  if(e.target && e.target.classList.contains('list-group-item')){
    const id = e.target.id;
    window.open(`user.html?id=${id}`);
  }
});

// export functions to test them later
module.exports = createUserNode;
