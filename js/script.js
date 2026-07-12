document.addEventListener("DOMContentLoaded", () => {
  const bodyHeader = document.querySelector(".encabezado");
  const botonMenu = document.querySelector(".menu-movil");
  const menu = document.querySelector(".menu");
  const desplegables = document.querySelectorAll(".desplegable");
  const observerItems = document.querySelectorAll(".reveal");

  if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
      menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", menu.classList.contains("abierto"));
    });
  }

  desplegables.forEach(desplegable => {
    const boton = desplegable.querySelector(".desplegable-boton");
    if (boton) {
      boton.addEventListener("click", (e) => {
        if (window.innerWidth <= 980) {
          e.preventDefault();
          desplegable.classList.toggle("abierto");
        }
      });
    }
  });

  const activarNav = () => {
    const archivo = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach(enlace => {
      const destino = enlace.getAttribute("href").split("/").pop();
      if (destino === archivo) enlace.classList.add("activo");
    });
  };
  activarNav();

  const toggleHeaderShadow = () => {
    if (!bodyHeader) return;
    if (window.scrollY > 20) bodyHeader.classList.add("scrolled");
    else bodyHeader.classList.remove("scrolled");
  };
  toggleHeaderShadow();
  window.addEventListener("scroll", toggleHeaderShadow, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    observerItems.forEach((item, index) => {
      item.classList.add(`delay-${(index % 3) + 1}`);
      observer.observe(item);
    });
  } else {
    observerItems.forEach(item => item.classList.add("visible"));
  }
});