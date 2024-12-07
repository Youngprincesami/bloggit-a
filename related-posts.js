import { foodPostsCardData } from "./foodPostData.js";
import { techPostsCardData } from "./techPostData.js";
import { programmingPostsCardData } from "./programmingPostData.js";
import { healthPostsCardData } from "./healthPostData.js";
import { gamingPostsCardData } from "./gamingPostData.js";

const allPostsData = {
  food: foodPostsCardData,
  tech: techPostsCardData,
  programming: programmingPostsCardData,
  health: healthPostsCardData,
  gaming: gamingPostsCardData
};

export function getRelatedPosts(name) {
  // const related = allPostsData[name].slice(1, 6);
  console.log(name);
  const related = new Set();

  while (related.size < 5) {
    let randomIndex = Math.floor(Math.random() * allPostsData[name].length);
    related.add(allPostsData[name][randomIndex]);
    // console.log(allPostsData[name][randomIndex]);
  }
  // console.log(related);

  let html = "";
  related.forEach((data) => {
    html += `
            <div class="blog-post-card">
              <div class="post-img-cont">
                <a href="${data.href}" >
                    <img
                  src="${data.img}"
                  class="post-img-cont__img"
                  alt="${data.title}" width="150" height="150"
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
  document.querySelector(".blog-post-wrapper-card").innerHTML = html;
}
