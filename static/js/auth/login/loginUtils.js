export const loginForm = document.getElementById('login').getElementsByTagName('form')[0];

export const usernameField = loginForm.elements['username'];
export const passwordField = loginForm.elements['password'];

export const loginResponseHandler = (xhr, resp) => {
    switch (xhr.status) {
        case 200:
//todo
            break;

        case 400:
//todo
            break;

        case 409:
//todo
            break;
    }
};


