(() => {
  const startedAt = performance.now();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minimumDisplayTime = reducedMotion ? 350 : 1400;
  let dismissalScheduled = false;

  function dismissLoader() {
    if (dismissalScheduled) return;
    dismissalScheduled = true;
    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(0, minimumDisplayTime - elapsed);

    window.setTimeout(() => {
      const loader = document.getElementById("site-loader");
      document.body.classList.remove("loading-active");
      if (!loader) return;

      const removeLoader = () => loader.remove();
      loader.classList.add("is-leaving");
      loader.addEventListener("transitionend", removeLoader, { once: true });
      window.setTimeout(removeLoader, 800);
    }, remaining);
  }

  if (document.readyState === "complete") {
    dismissLoader();
  } else {
    window.addEventListener("load", dismissLoader, { once: true });
  }

  window.setTimeout(dismissLoader, 6000);
})();
