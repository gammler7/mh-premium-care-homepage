(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var modal = document.getElementById("booking-modal");
  var openBtn = document.getElementById("open-booking-modal");
  var lastFocus = null;

  function openBookingModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    var firstField = modal.querySelector('input[name="name"]');
    if (firstField) firstField.focus();
  }

  function closeBookingModal() {
    if (!modal) return;
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  if (modal && openBtn) {
    openBtn.addEventListener("click", openBookingModal);
    modal.querySelectorAll("[data-close-booking-modal]").forEach(function (el) {
      el.addEventListener("click", function () {
        closeBookingModal();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
        closeBookingModal();
      }
    });
  }

  var bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(bookingForm);
      var lines = [
        "Buchungsanfrage (Website)",
        "",
        "Name: " + (fd.get("name") || ""),
        "Service: " + (fd.get("service") || ""),
        "E-Mail: " + (fd.get("email") || ""),
        "Telefon: " + (fd.get("phone") || ""),
        "Datum/Uhrzeit: " + (fd.get("datetime") || ""),
        "Ziel: " + (fd.get("destination") || ""),
        "Start: " + (fd.get("origin") || ""),
        "Personen: " + (fd.get("persons") || ""),
        "",
        "Nachricht:",
        String(fd.get("message") || ""),
      ];
      var subject = encodeURIComponent("Buchungsanfrage Fahrservice");
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href =
        "mailto:m.hosseinitaxi@gmail.com?subject=" + subject + "&body=" + body;
      closeBookingModal();
    });
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
