const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".tab-section");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // убрать активность
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    // активировать текущую вкладку
    tab.classList.add("active");
    document
      .getElementById(tab.dataset.tab)
      .classList.add("active");
  });
});