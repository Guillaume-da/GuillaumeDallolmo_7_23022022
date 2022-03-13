/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export class Tag {
	constructor(){
		this.tagsContainer = document.getElementsByClassName('tags')[0];
		this.items = document.getElementsByClassName('search__dropdown-menu-link');
		this.tagsIcons = document.getElementsByClassName('tags__icon');
		
		this.getItemClicked = (e) => this._getItemClicked(e);
		this.closeItem = (e) => this._closeItem(e);
		
		this.bindEvent();
	}

	displayTag(tag, color){
		const span = document.createElement('span');
		span.classList.add('tags__item');
		span.style.backgroundColor = color;
		span.innerHTML = `${tag} <i class="far fa-times-circle tags__icon"></i>`;
		this.tagsContainer.appendChild(span);
		this.bindEvent();
	} 

	_getItemClicked(e) {
		let item = e.target;
		let backgroundColor = window.getComputedStyle(item.parentElement.parentElement).backgroundColor;
		this.displayTag(item.textContent, backgroundColor);
	}

	_closeItem(e) {
		let item = e.target;
		item.parentElement.classList.add('hide');
	}

	bindEvent(){
		for(const element of this.items) {
			element.addEventListener('click', this.getItemClicked);
		}
		for(const icon of this.tagsIcons) {
			icon.addEventListener('click', this.closeItem);
		}
	} 
}