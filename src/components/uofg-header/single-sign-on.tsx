import { type FunctionalComponent, h } from '@stencil/core';

export const SingleSignOn: FunctionalComponent = () => (
  <form class="uofg-header-single-sign-on">
    <span>Please log in with your Central Login Account</span>

    <label>
      <span>Username</span>
      <input type="text" name="username" />
    </label>

    <label>
      <span>Password</span>
      <input type="password" name="password" />
    </label>

    <button type="submit">Sign in</button>

    <a href="#">Forgot your password?</a>
  </form>
);
