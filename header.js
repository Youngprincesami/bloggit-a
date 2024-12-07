function toggleMenu() {
  const navList = document.querySelector("nav ul");
  navList.classList.toggle("active");
}; 


function headerWatcher() {
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // If the user scrolls down and the scroll position is greater than 20px, hide the header
    if (currentScroll > lastScrollTop && currentScroll > 20) {
      header.style.top = "-70px"; // Move the header up (hide it)
    } else {
      header.style.top = "0"; // Show the header again
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
  });
}
// add the eventlistener
document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Ensure menu starts hidden
window.addEventListener('DOMContentLoaded', () => {
  headerFunctions();
  const navList = document.querySelector("nav ul");
  navList.classList.remove("active"); // Ensure no menu is visible by default
});




export default function headerFunctions() {
  toggleMenu();
  headerWatcher();
}
