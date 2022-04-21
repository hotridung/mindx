const get_meal_btn = $("#get_meal");
const meal_container = $("#meal");

get_meal_btn.on("click", () => {
  get_meal_btn.html('loading...');
  get_meal_btn.css('background-color','gray');
  $.get("https://www.themealdb.com/api/json/v1/1/random.php", function (data, status) {
    createMeal(data.meals[0]);
  });
});

createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      continue;
    }
  }

  const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory
      ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
      : ""
    }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${meal.strTags
      ? `<p><strong>Tags:</strong> ${meal.strTags
        .split(",")
        .join(", ")}</p>`
      : ""
    }
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${truncate(meal?.strInstructions, 1000)}</p>
			</div>
		</div>
		${meal.strYoutube
      ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
      : ""
    }
	`;
  meal_container.html(newInnerHTML);
  get_meal_btn.html('Get Meal 🍔');
  get_meal_btn.css('background-color', '#33C3F0');
};
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
