import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

class DropDown extends PolymerElement {
  static get properties() {
    return {
      currentSelected: {
        type: String,
        value: "Select Option",
      },
    };
  }
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          padding: 10px;
        }
        .menuLabel {
          padding: 10px 0;
          color: #02b875;
        }
        .menuHead {
          padding: 10px 0;
          cursor: pointer;
        }
        .menuHead,
        .menuBody {
          background-color: #02b875;
          color: #ffffff;
          text-align: center;
          font-size: 14px;
        }
        .menuBody {
          display: none;
        }
        ::slotted(.menuOption) {
          cursor: pointer;
          padding: 10px 0;
        }
        ::slotted(.menuOption:hover) {
          color: #02b875;
          background: #ffffff;
          transition: 0.3s;
        }
      </style>

      <!-- shadow DOM goes here -->
      <div class="menuWrapper" id="menuWrapperID">
        <div class="menuLabel">Select Your Option</div>
        <div class="menuHead" id="menuHeadID" on-click="onClickHandler">
          <div class="currentChoice">[[currentSelected]]</div>
        </div>
        <div class="menuBody" id="menuBodyID">
          <slot on-click="changeSelected"></slot>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
  }
  onClickHandler(e) {
    let shadow = this.shadowRoot;
    let menuBody = shadow.getElementById("menuBodyID");
    menuBody.style.display == "block"
      ? (menuBody.style.display = "none")
      : (menuBody.style.display = "block");
  }

  changeSelected(e) {
    let shadow = this.shadowRoot;
    let menuBody = shadow.getElementById("menuBodyID");
    this.currentSelected = e.target.textContent;
    menuBody.style.display = "none";
  }
}

customElements.define("drop-down", DropDown);
