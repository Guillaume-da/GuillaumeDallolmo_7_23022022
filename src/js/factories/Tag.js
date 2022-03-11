/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export class Tag {
	constructor(){
		this.tagsContainer = document.getElementsByClassName('tags')[0];
		this.items = document.getElementsByClassName('search__dropdown-menu-link');
		// this.itemsArray = Array.prototype.slice.call( this.items, 0 );
		this.tagsIcons = document.getElementsByClassName('tags__icon');
		this.tagsIconsArray = Array.prototype.slice.call( this.tagsIcons, 0 );
		
		this.getItemClicked = (e) => this._getItemClicked(e);
		// this.closeItem = (e) => this._closeItem(e);

		this.bindEvent();
	}

	displayTag(tag, color){
		const span = document.createElement('span');
		span.classList.add('tags__item');
		span.style.backgroundColor = color;
		span.innerHTML = `${tag} <i class="far fa-times-circle tags__icon"></i>`;
		this.tagsContainer.appendChild(span);
		this.closeItem();
	} 

	_getItemClicked(e){
		let item = e.target;
		let backgroundColor = window.getComputedStyle(item.parentElement.parentElement).backgroundColor;
		this.displayTag(item.textContent, backgroundColor);
	}

	/* _closeItem(e) {
		console.log(e);
        
	} */

	closeItem() {
		let array = Array.prototype.slice.call( this.tagsIcons, 0 );
		array.forEach(element => {
			element.addEventListener('click', ()=> {
				element.parentNode.style.display = 'none';
			});
		});
	}

	bindEvent(){
		for(const element of this.items) {
			element.addEventListener('click', this.getItemClicked);
		}
		/* for(const icon of this.tagsIcons) {
			console.log(icon);
			icon.addEventListener('click', this.closeItem);
		} */
	} 
}