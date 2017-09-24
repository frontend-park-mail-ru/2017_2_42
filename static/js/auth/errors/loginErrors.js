/**
 * 400 (BAD REQUEST)
 * Backend error values in response json while status code == 400 (BAD REQUEST)
 */
export const backendBadErrors = {
  USERNAME_FIELD_EMPTY: 'USERNAME_FIELD_EMPTY',
  USERNAME_FIELD_BAD: 'USERNAME_FIELD_BAD',
  USERNAME_FIELD_TOO_SHORT: 'USERNAME_FIELD_TOO_SHORT',

  PASSWORD_FIELD_EMPTY: 'PASSWORD_FIELD_EMPTY',
  PASSWORD_FIELD_BAD: 'PASSWORD_FIELD_BAD',
};

/**
 * 409 (CONFLICT)
 * Backend error values in response json while status code == 409 (CONFLICT)
 */
export const backendConflictErrors = {
  USERNAME_NOT_EXISTS: 'USERNAME_NOT_EXISTS',
  PASSWORD_WRONG: 'PASSWORD_WRONG',
};
