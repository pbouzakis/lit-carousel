import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("pbo-carousel-pagination")
export class PboCarouselPagination extends LitElement {
  @state()
  _numOfSlides: number = null;

  static styles = css`
    :host span {
      cursor: pointer;
    }
  `;  

  init(numOfSlides: number) {
    console.log("Render more components!", numOfSlides);
    this._numOfSlides = numOfSlides;
  }

  _handleClick(slide) {
    console.log("clicked pagination link", slide);
    const event = new CustomEvent("pboCarouselNavigation", {
      detail: { slide },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  navigate(controller: any, { slide }: any) {
    controller.navToSlide(slide);
  }

  render() {
    if (!this._numOfSlides) {
      return html`...`;
    }

    const nav = Array(this._numOfSlides).fill("⚪");

    return html`
      <div>
        ${nav.map(
          (dot, i) => html`
            <span class="navlink" @click=${() => this._handleClick(i)}
              >${dot}</span
            >
          `
        )}
      </div>
    `;
  }
}
