import { rightNavData } from "./postData.js";

export function renderRightNav() {
  let html = "";
  rightNavData.forEach((data) => {
    html += `
        <div class="new-post-wrapper">
          <div>
            <figure>
              <a href="${data.href}">
                <img src="${data.img}" alt="${data.title}" />
              </a>
            </figure>
          </div>
          <div class="new-post-description">
            <h4 class="truncate-2">
              <a href="${data.href}">${data.title}</a> 
            </h4>
            <div class="new-post-description-content truncate-1">
              <p>${data.content}</p>
            </div>
          </div>
        </div>`;
  });
  return html;
}
let newPostContainerElement = document.querySelector(".js-new-post-cont");

if (newPostContainerElement) {
  newPostContainerElement.innerHTML = renderRightNav();
}
