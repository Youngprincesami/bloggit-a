import { renderRightNav } from './right-nav.js';
import headerFunctions from "./header.js";
import {renderFooter} from "./footer.js";
import { getRelatedPosts } from "./related-posts.js";
import { renderCommentSection } from "./comment.js";



headerFunctions();


const relatedPostId = document.querySelector('.related-posts').getAttribute('data-related-post-id').toLocaleLowerCase();
getRelatedPosts(relatedPostId);

renderCommentSection();

renderFooter();