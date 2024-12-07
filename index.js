import { postCardData } from "./postData.js";

renderPosts(postCardData);

export function renderPosts(cardData) {
  let html = "";
  cardData.forEach((data) => {
    html += `
          <div class="blog-post-card js-blog-post-card">
            <div class="post-img-cont">
            <a href="${data.href}">
              <img
                src="${data.img}"
                class="post-img-cont__img"
                alt="${data.title}"
              />
            </a>
            </div>
            <div class="post-discription">
              <h3>
                <a class="truncate-2"
                  href="${data.href}"
                  >${data.description.title}</a
                >
              </h3>
              <div class="truncate-2">
                <p>
                 ${data.description.content}
                </p>
              </div>
            </div>
          </div>
          <hr style="border: 1px solid rgba(204, 204, 204, 0.521);">
      `;
  });

  document.querySelector(".js-blog-post-wrapper-card").innerHTML = html;
}

document.querySelector(".blog-topic-link").addEventListener("mouseover", () => {
  document
    .querySelector(".js-main__figure-overlay")
    .classList.add("active-link-bg");
});

document.querySelector(".blog-topic-link").addEventListener("mouseout", () => {
  document
    .querySelector(".js-main__figure-overlay")
    .classList.remove("active-link-bg");
});


// observer object 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slideInLeft')
    }
    else {
      entry.target.classList.remove("slideInLeft")
    }
  })
})

export function addAnimationClass(elementClass){
  if (elementClass){
    document.querySelectorAll(`.${elementClass}`).forEach(card => {
      observer.observe(card);
    })
  } else {
    document.querySelectorAll('.blog-post-card').forEach(card => {
      observer.observe(card);
    });
  }
} 
addAnimationClass()

