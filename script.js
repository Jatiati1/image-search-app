const accessKey = window.UNSPLASH_ACCESS_KEY;

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value.trim();
  if (!inputData) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(
    inputData
  )}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    data.results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Image result";

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description || "View image";

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
