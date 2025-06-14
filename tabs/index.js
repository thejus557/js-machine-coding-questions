const IDS = {
  tabHeader: ".tabs-header",
  tabContent: ".tabs-content",
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

let prevActiveTab;

DOM_CACHE.getElements(IDS.tabHeader).addEventListener("click", (e) => {
  let activeTab = e.target.classList[0];

  if (prevActiveTab) {
    const prevActiveTabId = prevActiveTab.classList[0];
    document.getElementById(prevActiveTabId).classList.remove("show");
    prevActiveTab.classList.remove('active')
  }

  document.getElementById(activeTab).classList.add("show");
  e.target.classList.add('active')
  prevActiveTab = e.target;
});

