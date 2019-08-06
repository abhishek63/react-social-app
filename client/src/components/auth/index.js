export const signup = user => {
  return fetch(`/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`/api/signin`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};


export const signout = next => {
  localStorage.removeItem("token");
  next();
  return fetch("/api/signout", {
    method: "GET"
  })
    .then(response => {
      console.log(response, "response");
      return response.json();
    })
    .catch(err => console.log(err));
};

//this method is helpful in change the sign/signout dynamically
export const isAuthenticated = () => {
  if (localStorage.getItem("token"))
    return JSON.parse(localStorage.getItem("token"));
  else return false;
};
