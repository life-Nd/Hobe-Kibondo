// Function to load language JSON and apply translations
const loadLanguage = async (lang) => {
  // Calculate the depth of the current path by counting slashes
  const depth = window.location.pathname.split("/").length - 2; // -2 to ignore leading '/' and the filename
  const pathPrefix = "../".repeat(depth); // Repeat '../' based on the depth

  try {
    if (lang === "en") {
      const res = await fetch(`${pathPrefix}assets/lang/${lang}.json`);
      const translations = await res.json();

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
          // Replace '\n' with '<br />' and update innerHTML to handle HTML content
          el.innerHTML = translations[key].replace(/\n/g, "<br />");
        }
      });
    }
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};

// Function to set language, save preference, and reload page or translations
const setLanguage = (lang) => {
  localStorage.setItem("hobe-kibondo-language", lang);
  loadLanguage(lang);
  // Update URL
  updateURLLanguage(lang);
  // Reload page
  window.location.reload();
};

// Update the URL with the new language
function updateURLLanguage(newLocale) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", newLocale);
  window.history.pushState({}, "", url);
  //
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector");
  // const languageSelectorMobile = document.getElementById('language-selector-mobile');
  // if (!languageSelector || !languageSelectorMobile) {
  //     console.error('language-selector element not found');
  //     return;
  // }

  // Proceed with attaching event listeners and setting initial language
  const savedLanguage = localStorage.getItem("hobe-kibondo-language") || "fr";
  languageSelector.value = savedLanguage;
  // languageSelectorMobile.value = savedLanguage;
  loadLanguage(savedLanguage);

  languageSelector.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
});
