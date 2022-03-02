export class Dropdown {
    constructor() {
        this.ingredientsList = [];
        this.appliancesList = [];
        this.utensilsList = [];
        this.dropdownWrapperIngredients = document.getElementsByClassName('js-wrapper')[0];
        this.$dropdownApplianceWrapper = document.getElementsByClassName('js-wrapper')[1];
        this.$dropdownUtensilWrapper = document.getElementsByClassName('js-wrapper')[2];
        this.ingredientsButton = document.getElementById("ingredients");
        this.ingredientsListContainer = document.getElementById("ingredients-list");
        this.appliancesButton = document.getElementById("appliances");
        this.appliancesListContainer = document.getElementById("appliances-list");
        this.utensilsButton = document.getElementById("utensils");
        this.utensilsListContainer = document.getElementById("utensils-list");
        this.closeIngredients = document.getElementById('ingredients-close-icon');
        this.closeAppliances = document.getElementById("appliances-close-icon");
        this.closeUtensils = document.getElementById("utensils-close-icon");

        this.bindEvent();
        this.getAllIngredients();
        this.getAllAppliances();
        this.getAllUtensils();
    }

    openDropdown(button, container) {
        button.addEventListener('click', ()=> {
            container.style.display = "block";
        })
    }

    closeDropdown(button, container) {
        button.addEventListener('click', ()=> {
            container.style.display = "none";
        })
    }

    bindEvent(){
        this.openDropdown(this.ingredientsButton, this.ingredientsListContainer);   
        this.closeDropdown(this.closeIngredients, this.ingredientsListContainer);
        this.openDropdown(this.appliancesButton, this.appliancesListContainer);
        this.closeDropdown(this.closeAppliances, this.appliancesListContainer);
        this.openDropdown(this.utensilsButton, this.utensilsListContainer);
        this.closeDropdown(this.closeUtensils, this.utensilsListContainer);
    }

    getAllIngredients(){
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if(!this.ingredientsList.includes(ingredient.ingredient)){
                    this.createIngredientsList(ingredient.ingredient)
                    this.ingredientsList.push(ingredient.ingredient);
                }
            }) 
        })
    }

    getAllAppliances(){
        recipes.forEach(recipe => {
            if(!this.appliancesList.includes(recipe.appliance)){
                this.createAppliancesList(recipe.appliance)
                    this.appliancesList.push(recipe.appliance);
            }
        })
    }

    getAllUtensils(){
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
            if(!this.utensilsList.includes(ustensil)){
                this.createUtensilsList(ustensil)
                this.utensilsList.push(ustensil);
            }
        })
    })
    }

    createIngredientsList(data) {
        const $ingredient = document.createElement('li');
        $ingredient.classList.add('search__dropdown-menu-link');
        $ingredient.textContent = data;
        
        this.dropdownWrapperIngredients.appendChild($ingredient); 
    }

    createAppliancesList(data) {
        const $appliance = document.createElement('li');
        $appliance.classList.add('search__dropdown-menu-link');
        $appliance.textContent = data;

        this.$dropdownApplianceWrapper.appendChild($appliance); 
    }

    createUtensilsList(data) {
        const $utensil = document.createElement('li');
        $utensil.classList.add('search__dropdown-menu-link');
        $utensil.textContent = data;

        this.$dropdownUtensilWrapper.appendChild($utensil); 
    }
}