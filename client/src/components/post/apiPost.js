export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/api/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//show all post
export const showPosts = () => {
    return fetch(`/api/posts`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  };

  
export const singlePost = (postId) => {
  return fetch(`/api/post/${postId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};