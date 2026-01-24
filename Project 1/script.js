
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en' },
    'google-translate-element'
  );
}

const contactBtn = document.getElementById("contactBtn");

contactBtn.addEventListener("click", function() {
  const formSection = document.getElementById("form-wrap");

  formSection.scrollIntoView({
    behavior: "smooth",
    block: "start" 
  });

  formSection.style.transition = "transform 0.5s ease";
  formSection.style.transform = "translateY(-10px)";
  setTimeout(() => {
    formSection.style.transform = "translateY(0)";
  }, 100);
});

 const resumeBtn = document.getElementById("resume-btn");
  const modal = document.getElementById("resume-modal");
  const closeBtn = document.getElementById("close-modal");

  resumeBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
