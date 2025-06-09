const IDS = {
  accordianContent: ".accordian",
  toggleArrowIcon: "#toggle-btn-icon"
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

const toggleAccordian = (e) => {
  console.log('e');

  const accordian = DOM_CACHE.getElements(IDS.accordianContent);
  const toggleArrowIcon = DOM_CACHE.getElements(IDS.toggleArrowIcon);

  console.log('a', accordian)
  if (accordian.classList.contains('show')) {
    accordian.classList.remove('show');
    tog
  } else {
    accordian.classList.add('show')
  }
}