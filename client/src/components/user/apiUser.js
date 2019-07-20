//view user profile
exports.viewUser = (userId, token) => {
  console.log("hello chik", userId);
  return fetch(`/api/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

//show all users
exports.showUsers = () => {
  return fetch(`/api/users`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

//delete user
exports.deleteAccount = (userId, token) => {
  return fetch(`/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("error in deleting user");
    });
};

//update user
exports.update = (userId, token, user) => {
  return fetch(`/api/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log("error in updating user");
    });
};
