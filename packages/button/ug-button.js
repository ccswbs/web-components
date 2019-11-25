import { LitElement, html, css } from 'lit-element';

class UgButton extends LitElement {
  constructor() {
    super();
    this.label = "";
  }
  static get properties() {
    return {
      label: { type: String }
    }
  }
  static get styles() {
    return css`
      button::-moz-focus-inner {
        padding: 0;
        border-style: none;
      }
      .btn-primary::after {
        content: "\\f061";
        width: 2rem;
        font-family: 'FontAwesome';
        color: #fff;
        position: absolute;
        right: -2.15rem;
        top: 25%;
        bottom: 25%;
        line-height: 19px;
        display: inline-block;
        transition: 0.2s ease-in-out;
        pointer-events: all;
      }
      .btn-primary::before {
        content: "";
        width: 2rem;
        background: #C20430;
        position: absolute;
        right: -2rem;
        top: 0;
        bottom: 0;
        line-height: inherit;
        display: inline-block;
        border: 1rem solid #000;
        border-width: 0 0 0 .35rem;
        pointer-events: all;
        -webkit-transition: 0.2s ease-in-out;
        -o-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
        pointer-events: all;
        box-sizing: border-box;
      }
      .btn-primary.active::after, .btn-primary:active::after, .btn-primary:focus::after, .btn-primary:hover::after {
        color: #FFC72A;
      }
      .btn-primary.active::before, .btn-primary:active::before, .btn-primary:focus::before, .btn-primary:hover::before {
        background: #b8042e;
      }
      .btn:focus {
        outline: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
      }
      .btn-primary.active, .btn-primary:active, .btn-primary:focus, .btn-primary:hover {
        color: #000;
        background-color: #ccc;
        border-color: #333;
      }
      .btn:focus, .btn:hover {
        text-decoration: none;
      }
      .btn:not(:disabled):not(.disabled) {
        cursor: pointer;
      }
      ::selection {
        color: #000;
        background: #FFC72A;
      }
      .btn-primary {
        color: #000;
        background-color: #eee;
        position: relative;
        margin-right: 2.35rem;
        border: 0;
      }
      .btn {
        font-weight: 400;
        font-size: .95rem;
        line-height: 1.25;
        letter-spacing: 0.03rem;
        border-radius: 0;
        padding: 0.75rem 1rem;
        transition: 0.2s ease-in-out;
        display: inline-block;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
      }
      button {
        text-transform: none;
        overflow: visible;
        margin: 0;
        font-family: "Roboto", "Arial", sans-serif;
      }
      .btn-primary:not(:disabled):not(.disabled):active {
        background: #a6a6a6;
        color: #fff;
        border-color: #000;
      }
    `;
  }
  render() {
    return html`
      <button class="btn btn-primary">${this.label}</button>
    `;
  }
}

customElements.define('ug-button', UgButton);
