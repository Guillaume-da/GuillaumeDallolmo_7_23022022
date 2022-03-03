export class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe;
        this.recipesWrapper = document.querySelector('.recipes');

        this.displayAllRecipes();
    }

    createRecipeCard(data) {
        const article = document.createElement('article');
        article.classList.add('recipes__item');
        const recipeCard = `
                <img src="src/img/recipe-img.svg" alt="recipe" class="recipes__image">
                <div class="recipes__title-container">
                    <h2 class="recipes__title">${data.name}</h2>
                    <span class="recipes__duration"><i class="fas fa-clock"></i> ${data.time}</span>
                </div>
                <div class="recipes__ingredients-container">
                    <ul class="recipes__ingredients">
                        ${data.ingredients.map(element => `
                        <li>${element.ingredient}: ${element.quantity ? `${element.quantity}` : ''}${element.unit ? `${element.unit}` : ''}</li>
                        `).join('')}
                    </ul>
                    <p class="recipes__description">${data.description.slice(0, 210) + ' ...'}
                    </p>
                </div>
        `;
        
        article.innerHTML = recipeCard;
        return article;
    }

    displayAllRecipes() {
        recipes.forEach(recipe => {
            this.recipesWrapper.appendChild(this.createRecipeCard(recipe));
        })
    }

    
}