const IDS = {
  modal: "#modal",
  toggleModal: ".toggle-modal",
  closeModal: ".modal-close-btn",
};

const DOM_CACHE = {
  elements: {},

  getElements: (ID) => {
    if (ID in DOM_CACHE.elements) {
      return DOM_CACHE.elements[ID];
    } else {
      const ele = document.querySelector(ID);
      DOM_CACHE.elements[ID] = ele;
      return DOM_CACHE.elements[ID];
    }
  },
};

const closeModal = () => {
    DOM_CACHE.getElements(IDS.modal).style.display = "none";
}

DOM_CACHE.getElements(IDS.toggleModal).addEventListener("click", (e) => {
  DOM_CACHE.getElements(IDS.modal).style.display = "flex";
});

DOM_CACHE.getElements(IDS.closeModal).addEventListener("click", (e) => {
  closeModal();
});

window.onclick = function (e) {
  if (e.target === DOM_CACHE.getElements(IDS.modal)) {
    closeModal();
  }
};

window.onkeydown = function (e) {
  console.log(e)
  if (e.key == 'Escape') {
    closeModal();
  }
}
