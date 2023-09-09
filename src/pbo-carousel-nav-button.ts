import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pbo-carousel-nav-button")
export class PboCarouselNavButton extends LitElement {
  @property()
  action: string = "next";

  static styles = css`
    button {
      all: unset;
    }
  `;

  _handleClick() {
    const event = new CustomEvent("pboCarouselNavigation", {
      detail: { action: this.action },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  navigate(controller: any) {
    switch (this.action) {
      case "prev":
        controller.prev();
        break;

      case "next":
        controller.next();
        break;

      default:
        throw new Error("Unsupported nav-button action.");
    }
  }

  render() {
    return html`
      <button @click=${this._handleClick}>
        <slot>Click</slot>
      </button>
    `;
  }
}
