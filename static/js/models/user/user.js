'use strict';

/**
 * User class
 */
export class User {
  /**
   * Creates user without any info
   */
  constructor() {
    this.username = null;
    this.email = null;
  }

  /**
   * Authorizes user
   * @param {string} username users username
   * @param {string} email users email
   */
  login(username, email) {
    this.username = username;
    this.email = email;
  }


  /**
   * Checks if user is authorized
   * @return {boolean} is authorized
   */
  isAuthorized() {
    return !!this.username;
  }
}
