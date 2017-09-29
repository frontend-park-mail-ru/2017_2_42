/**
 * Created by zwirec on 28.09.17.
 */

let login_fields = [
    {
        attrs: {
            type: 'text',
            name: 'login',
            placeholder: 'username'
        },
        classes: ["input-ok"]
    },
    {
        attrs: {
            type: 'password',
            name: 'password',
            placeholder: 'password',
        },
        classes: ["input-ok"]
    },
];

let social_button = [
    {
        classes: ["social-login-vk"],
        value: "VK"
    },
    {
        classes: ["social-login-fb"],
        value: "FB"
    },

];

export {login_fields, social_button}