(() => {
  "use strict";

  function initializeResearchLinks() {
    let navigation = 0;
    let cancelTransition = () => {};

    // Follow paper links, including older links to an element inside a callout.
    function followHash() {
      const request = ++navigation;
      cancelTransition();
      let id;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;

      const target = document.getElementById(id);
      const paper = target?.closest(".research-paper[id]");
      const body = paper?.querySelector(".callout-collapse");
      const Collapse = window.bootstrap?.Collapse;
      if (!body || !Collapse) return;

      const scrollToTarget = () => requestAnimationFrame(() => {
        if (request !== navigation) return;
        const navbar = document.getElementById("quarto-header");
        const fixedNavbar = navbar && ["fixed", "sticky"].includes(getComputedStyle(navbar).position);
        const offset = fixedNavbar ? navbar.getBoundingClientRect().height : 0;
        const top = window.scrollY + target.getBoundingClientRect().top - offset - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      });

      // Wait through an existing animation before showing, preserving Bootstrap's aria state.
      const reveal = () => {
        if (request !== navigation) return;
        if (!body.classList.contains("collapsing") && body.classList.contains("show")) {
          scrollToTarget();
          return;
        }

        const finished = (event) => {
          if (event.target !== body) return;
          cancelTransition();
          reveal();
        };
        cancelTransition = () => {
          body.removeEventListener("shown.bs.collapse", finished);
          body.removeEventListener("hidden.bs.collapse", finished);
          cancelTransition = () => {};
        };
        body.addEventListener("shown.bs.collapse", finished);
        body.addEventListener("hidden.bs.collapse", finished);
        if (!body.classList.contains("collapsing")) {
          Collapse.getOrCreateInstance(body, { toggle: false }).show();
        }
      };
      reveal();
    }

    window.addEventListener("hashchange", followHash);
    followHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeResearchLinks, { once: true });
  } else {
    initializeResearchLinks();
  }
})();
