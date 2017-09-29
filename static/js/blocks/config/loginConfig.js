export const loginConfig = {
    attrs: {},
    classes: ['login'],
};

export const loginFields = [
    {
        attrs: {
            type: 'text',
            name: 'login',
            placeholder: 'username',
        },
        classes: ['input-ok'],
    },
    {
        attrs: {
            type: 'password',
            name: 'password',
            placeholder: 'password',
        },
        classes: ['input-ok'],
    },
    {
        attrs: {
            type: 'submit',
            value: 'LOGIN',
        },
        classes: [],
    },
    {
        attrs: {
            type: 'button',
            value: 'SIGNUP',
            name: 'signup',
        },
        classes: [],
    },
];
