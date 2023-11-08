// Endpoints

const url = "http://localhost:3000";
const ramensUrl = url + "/ramens";
const ramensUrlId = ramensUrl + "/:id";

// Grabs and assigns elements on HTML to JS consts

const ramenMenu = document.getElementById("ramen-menu");

const ramenDetail = document.getElementById("ramen-detail");
const ramenDetailClass = (className) =>
  ramenDetail.querySelector(`.${className}`);

const ramenRating = document.getElementById("rating-display");
const ramenComment = document.getElementById("comment-display");

// Rendering functions

function renderRamenMenu(ramen) {
  const ramenImg = document.createElement("img");
  ramenImg.src = ramen.image;
  ramenMenu.appendChild(ramenImg);
  ramenImg.addEventListener("click", () => {
    renderRamenDetail(ramen);
  });
}

function renderRamenDetail(ramen) {
  ramenDetailClass("detail-image").src = ramen.image;
  ramenDetailClass("name").textContent = ramen.name;
  ramenDetailClass("restaurant").textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
}

// Ramen Rater

fetch(ramensUrl)
  .then((res) => res.json())
  .then((ramens) => {
    ramens.forEach((ramen) => {
      renderRamenMenu(ramen);
    });
  });

// New Ramen Form
const newRamenForm = document.getElementById("new-ramen");

newRamenForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newName = document.getElementById("new-name").value;
  let newRestaurant = document.getElementById("new-restaurant").value;
  let newImage = document.getElementById("new-image").value;
  let newRating = document.getElementById("new-rating").value;
  let newComment = document.getElementById("new-comment").value;
  fetch(ramensUrl, {
    method: "POST",
    body: JSON.stringify({
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    fetch(ramensUrl)
      .then((res) => res.json())
      .then((ramens) => {
        renderRamenMenu(ramens[ramens.length - 1]);
        renderRamenDetail(ramens[ramens.length - 1]);
      });
  });
});
