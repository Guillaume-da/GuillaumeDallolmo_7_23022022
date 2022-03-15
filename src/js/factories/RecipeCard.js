export class RecipeCard {
	constructor(recipes) {
		this.recipesWrapper = document.querySelector('.recipes');
		this.displayAllRecipes(recipes);
	}

	createRecipeCard(recipe) {
		const article = document.createElement('article');
		article.classList.add('recipes__item');
		const recipeCard = `
                <img src="src/img/recipe-img.svg" alt="recipe" class="recipes__image">
                <div class="recipes__title-container">
                    <h2 class="recipes__title">${recipe.name}</h2>
                    <span class="recipes__duration"><i class="fas fa-clock"></i> ${recipe.time} min</span>
                </div>
                <div class="recipes__ingredients-container">
                    <ul class="recipes__ingredients">
                        ${recipe.ingredients.map(element => `
                        <li><span class="recipes__ingredient">${element.ingredient}</span> ${element.quantity ? `: ${element.quantity}` : ''}${element.unit ? `${element.unit}` : ''}</li>
                        `).join('')}
                    </ul>
                    <p class="recipes__description">${recipe.description}
                    </p>
                </div>
        `;
		article.innerHTML = recipeCard;
		return article;
	}

	displayAllRecipes(recipes) {
		// eslint-disable-next-line no-undef
		recipes.forEach(recipe => {
			this.recipesWrapper.appendChild(this.createRecipeCard(recipe));
		});
	} 
}