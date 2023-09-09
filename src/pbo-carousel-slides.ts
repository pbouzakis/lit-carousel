import { LitElement, html, css } from "lit";
import {
  customElement,
  property,
  queryAssignedElements
} from "lit/decorators.js";

@customElement("pbo-carousel-slides")
export class PboCarouselSlides extends LitElement {
  @property({ reflect: true })
  activeindex: number = 0;

  @queryAssignedElements({ selector: "img" })
  _slideImgs!: Array<HTMLElement>;

  static styles = css`
    ::slotted(img) {
      display: none;
    }
    ::slotted(img.active) {
      display: inline-block;
    }
  `;

  get _activeElement() {
    const slot = this.shadowRoot?.querySelector("slot");
    return slot
      ?.assignedElements()
      .filter((node) => node.matches(".active"))[0];
  }

  attributeChangedCallback(attr: string, prev: string, curr: string) {
    if (!prev || prev === curr) return;

    this._activeElement?.classList.remove("active");
    this._setActive();
  }

  prev() {
    if (this.activeindex === 0) {
      this.activeindex = 5;
      return;
    }
    this.activeindex = (this.activeindex - 1) % this._slideImgs.length;
  }

  next() {
    this.activeindex = (this.activeindex + 1) % this._slideImgs.length;
  }

  navToSlide(index: number) {
    this.activeindex = Math.max(0, Math.min(this._slideImgs.length, index));
  }

  firstUpdated() {
    this._setActive();
  }

  _setActive() {
    this._slideImgs[this.activeindex].classList.add("active");
  }

  render() {
    return html`
      <div>
        <slot>No images provided!</slot>
      </div>
    `;
  }
}
