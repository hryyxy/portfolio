(function () {
  "use strict";

  // 移动端菜单
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // 滚动显现
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // 导航高亮当前区块
  var nav = document.getElementById("siteNav");
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = ["home", "about", "chain", "cases", "skills", "strengths", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.style.opacity = a.getAttribute("href") === "#" + entry.target.id ? "1" : "";
          a.style.fontWeight = a.getAttribute("href") === "#" + entry.target.id ? "700" : "";
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(function (s) { sectionObserver.observe(s); });
})();
