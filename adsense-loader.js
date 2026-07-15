(() => {
  const config = window.ADSENSE_CONFIG || {};
  const publisherId = String(config.publisherId || "").trim();
  const publisherPattern = /^ca-pub-\d{16}$/;
  if (!config.enabled || !publisherPattern.test(publisherId)) return;

  const accountMeta = document.createElement("meta");
  accountMeta.name = "google-adsense-account";
  accountMeta.content = publisherId;
  document.head.appendChild(accountMeta);

  const adScript = document.createElement("script");
  adScript.async = true;
  adScript.crossOrigin = "anonymous";
  adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
  document.head.appendChild(adScript);

  const slotId = String(config.manualSlots?.afterMap || "").trim();
  if (!/^\d+$/.test(slotId)) return;

  const shell = document.querySelector('[data-ad-placement="after-map"]');
  const unit = shell?.querySelector(".adsbygoogle");
  if (!shell || !unit) return;

  unit.dataset.adClient = publisherId;
  unit.dataset.adSlot = slotId;
  unit.style.display = "block";
  shell.hidden = false;
  adScript.addEventListener("load", () => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, { once: true });
})();
