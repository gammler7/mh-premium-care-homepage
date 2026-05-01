(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var banner = document.getElementById("cookie-banner");
  var button = document.getElementById("accept-cookies");
  var key = "mh_premium_cookie_notice_accepted";

  if (!banner || !button) {
    return;
  }

  var accepted = window.localStorage.getItem(key) === "1";
  if (accepted) {
    banner.classList.add("is-hidden");
  }

  button.addEventListener("click", function () {
    window.localStorage.setItem(key, "1");
    banner.classList.add("is-hidden");
  });
})();
