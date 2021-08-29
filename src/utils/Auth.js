const BASE_URL = 'https://auth.nomoreparties.co';

const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  };

  const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.token){
            localStorage.setItem('jwt', res.token);
            return res;
          } 
      })
      .catch((err) => console.log(err));
  }

  

  const authorization = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
          return res;
    })
      .catch((err) => console.log(err));
  }


// Пример успешного ответа:
// Скопировать код
// JSON
// {
//     "_id":"1f525cf06e02630312f3fed7",
//     "email":"email@email.ru"
// } 
// Коды ошибок:
// Скопировать код
// # Если токен не передан или передан без Bearer
// 400 — Токен не передан или передан не в том формате

// # Если передан некорректный токен
// 401 — Переданный токен некорректен

export { register, login, authorization }