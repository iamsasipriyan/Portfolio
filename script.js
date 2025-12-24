/* ================= FORCE LIGHT THEME (DEFAULT) ================= */

// Always start in light mode
document.body.classList.remove("dark-theme");

// Reset icon to moon (dark-mode icon)
const themeButton = document.getElementById("theme-button");
themeButton.classList.remove("uil-sun");
themeButton.classList.add("uil-moon");

// DO NOT read previous theme
localStorage.removeItem("selected-theme");
localStorage.removeItem("selected-icon");

/* Manual toggle ONLY */
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
});

/* ================= ON LOAD ================= */

document.addEventListener("DOMContentLoaded", () => {
  highlightCurrentEducation();
  enableScrollSpy();
  modalHandler();
});

/* ================= Qualification Highlight ================= */

/* Highlight pursuing degree WITHOUT scrolling */
function highlightCurrentEducation() {
  const current = document.querySelector(".current-degree");
  if (current) {
    current.classList.add("highlighted-degree");
  }
}

/* ================= Scroll Spy (Active Nav Link) ================= */

function enableScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active-link");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active-link");
      }
    });
  });
}

/* ================= Modal System ================= */

function modalHandler() {
  const modalBtns = document.querySelectorAll(".services__button");
  const modals = document.querySelectorAll(".services__modal");
  const closeBtns = document.querySelectorAll(".services__modal-close");

  modalBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      modals[index].classList.add("active-modal");
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  window.addEventListener("click", e => {
    if (e.target.classList.contains("services__modal")) {
      closeAllModals();
    }
  });

  function closeAllModals() {
    modals.forEach(modal => modal.classList.remove("active-modal"));
  }
}
