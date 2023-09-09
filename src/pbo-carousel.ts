import { LitElement, html } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";

@customElement("pbo-carousel")
export class PboCarousel extends LitElement {
  @queryAssignedElements({ selector: "* pbo-carousel-slides,[slides]" })
  _allSlides!: Array<HTMLElement>;

  @queryAssignedElements({ selector: "* pbo-carousel-pagination,[pagination]" })
  _allPagination!: Array<HTMLElement>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pboCarouselNavigation", (e: Event) => {
      e.target?.navigate(this, e.detail);
    });
  }

  firstUpdated() {
    const numOfSlides = this._slides.querySelectorAll("img").length;
    this._pagination.init(numOfSlides);
  }

  get _pagination() {
    return this._allPagination[0];
  }

  get _slides() {
    return this._allSlides[0];
  }

  prev() {
    this._slides?.prev();
  }

  next() {
    this._slides?.next();
  }

  navToSlide(...args: any) {
    this._slides?.navToSlide(...args);
  }

  render() {
    return html`
      <slot>Missing carousel children</slot>
    `;
  }
}
