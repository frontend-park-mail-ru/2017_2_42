/**
 * Created by zwirec on 28.09.17.
 */

export default signup_fields = [
    {
        attrs: {
            type: 'text',
            name: 'username',
            placeholder: 'username'
        },
        classes: ["input-ok"]
    },
    {
        attrs: {
            type: 'email',
            name: 'email',
            placeholder: 'email'
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
    {
        attrs: {
            type: 'password',
            name: 'confirm-password',
            placeholder: 'one more time'
        },
        classes: ["input-ok"]
    },
];