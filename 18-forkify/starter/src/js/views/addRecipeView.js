import icons from 'url:../../img/icons.svg';
import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _toggleWindow() {
    return () => {
      this._overlay.classList.toggle('hidden');
      this._window.classList.toggle('hidden');
    };
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow());
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow());
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _generateMarkup() {
  }
}

export default new AddRecipeView();
