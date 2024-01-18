import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.createModal();
    this.addCloseListener();
  }

  createModal() {
    this.modal = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>  
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопк<а закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">   
        </h3>
      </div>
      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>
    `);
  }

  open() {
    const body = document.querySelector("body");
    body.append(this.modal);
    body.classList.add("is-modal-open");
  }

  setTitle(title) {
    this.modal.querySelector(".modal__title").textContent = title;
  }

  setBody(elem) {
    this.modal.querySelector(".modal__body").innerHTML = "";
    this.modal.querySelector(".modal__body").append(elem);
  }

  close() {
    const body = document.querySelector("body");
    body.classList.remove("is-modal-open");
    this.modal.remove();
    document.removeEventListener("keydown", this.addKeyDown);
  }

  addCloseListener() {
    const modalClose = this.modal.querySelector(".modal__close");

    modalClose.addEventListener("click", () => {
      this.close();
    });

    this.addKeyDown = (event) => {
      if (event.code == "Escape") {
        this.close();
      }
    };
    document.addEventListener("keydown", this.addKeyDown);
  }
}
