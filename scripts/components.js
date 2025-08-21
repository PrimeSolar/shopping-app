// The Library of Custom Reusable Web Components
// This file is the library containing my collection of custom, reusable web components
// that can be used across different parts of the project. These components go beyond what browsers provide,
// allowing for expanded capabilities and functionality in the project.

// The Scroll to Top Button
class scrollToTop extends HTMLElement {
  connectedCallback() {
    this.innerHTML += `
    <a href="#" class="to-top" aria-label="Scroll to top" title="Scroll to top">
      <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" fill="none" stroke="#fff" stroke-width="1"/>
        <path d="M6 15L12 9L18 15" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
    `;
  }
}
customElements.define("to-top", scrollToTop);

document.querySelector("body").appendChild(document.createElement("to-top"));

const toTop = document.querySelector("to-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

// The Footer
footerContainer = document.querySelector("footer");
const year = new Date().getFullYear();
function footerContainerF(e) {
  e &&
    // Define the footer content:
    (e.innerHTML += `
      <p>Copyright © <a href="https://primesolar.github.io/web-developer/" rel="noopener noreferrer">Vladislav Kazantsev</a> ${year}</p>
      <a type="button" class="bmc-button" href="https://www.buymeacoffee.com/CocaCola" target="_blank" rel="noopener noreferrer" aria-label="Buy me a coffee" role="button">☕ Buy me a coffee</a>`);
}
footerContainerF(footerContainer);

console.log("components.js is completed");
