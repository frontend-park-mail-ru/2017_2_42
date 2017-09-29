export const signupConfig = {
  attrs: {},
  classes: ['signup'],
};

export const signupFields = [
  {
    attrs: {
      type: 'text',
      name: 'username',
      placeholder: 'username',
    },
    classes: ['input-ok'],
  },
  {
    attrs: {
      type: 'text',
      name: 'email',
      placeholder: 'email',
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
      type: 'password',
      name: 'confirmation',
      placeholder: 'one more time',
    },
    classes: ['input-ok'],
  },
  {
    attrs: {
      type: 'submit',
      value: 'DONE',
    },
    classes: [],
  },
];
