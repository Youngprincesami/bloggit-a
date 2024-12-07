import { renderPosts, addAnimationClass } from "./index.js";
import { gamingPostsCardData } from "./gamingPostData.js";
import { foodPostsCardData } from "./foodPostData.js";
import { healthPostsCardData } from "./healthPostData.js";
import { programmingPostsCardData } from "./programmingPostData.js";
import { techPostsCardData } from "./techPostData.js";

import { renderRightNav } from './right-nav.js';
import headerFunctions from "./header.js";
import {renderFooter} from "./footer.js";

headerFunctions();
// renderRightNav();

const blogType  = document.querySelector('.posts-container').getAttribute('data-blog-type');
// console.log(blogType)

function handleBlogTypeRender(blogType) {
    // Create a mapping of blog types to corresponding data
    const blogTypeMap = {
        gaming: gamingPostsCardData,
        food: foodPostsCardData,
        health: healthPostsCardData,
        programming: programmingPostsCardData,
        tech: techPostsCardData,
    };

    // Check if the blog type exists in the map
    const postData = blogTypeMap[blogType];

    if (postData) {
        renderPosts(postData); // Call renderPosts with the correct data
        addAnimationClass();
    } // it loads the index cards by default;
}
handleBlogTypeRender(blogType);

renderFooter();



