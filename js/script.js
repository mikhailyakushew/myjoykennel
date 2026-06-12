(function () {
  const grid = document.getElementById("dogsGrid");
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalClose");

  function buildCard(dog) {
    const col = document.createElement("div");
    col.className = "dog-card";
    const img = document.createElement("img");
    img.className = "dog-card-img";
    img.src = dog.image;
    img.alt = dog.name;
    img.loading = "lazy";
    const body = document.createElement("div");
    body.className = "dog-card-body";
    const title = document.createElement("div");
    title.className = "dog-card-title";
    title.textContent = dog.name;
    const info = document.createElement("div");
    info.className = "dog-card-info";
    const arr = Object.entries(dog.details);
    info.textContent = arr.slice(0, 4).map(([k, v]) => k + ": " + v).join(" | ");
    body.appendChild(title);
    body.appendChild(info);
    col.appendChild(img);
    col.appendChild(body);
    col.addEventListener("click", function () {
      showDogDetail(dog);
    });
    return col;
  }

  function showDogDetail(dog) {
    let html = '<div class="modal-detail">';
    html += '<img class="modal-detail-img" src="' + dog.image + '" alt="' + dog.name + '">';
    html += '<div class="modal-detail-info">';
    html += '<h2>' + dog.name + '</h2>';
    html += '<table>';
    const arr = Object.entries(dog.details);
    for (let i = 0; i < arr.length; i++) {
      html += '<tr><td>' + arr[i][0] + '</td><td>' + arr[i][1] + '</td></tr>';
    }
    html += '</table></div></div>';
    content.innerHTML = html;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (grid) {
    for (let i = 0; i < dogs.length; i++) {
      grid.appendChild(buildCard(dogs[i]));
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      navList.classList.toggle("open");
    });
    navList.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navList.classList.remove("open");
      });
    });
  }

  // Random jumping sheep — one jump, then vanish
  (function () {
    var SVG = '<svg viewBox="0 0 80 80"><circle cx="40" cy="42" r="22" fill="#f5f5f5" stroke="#ddd" stroke-width=".5"/><circle cx="28" cy="36" r="12" fill="#fff"/><circle cx="40" cy="30" r="14" fill="#fff"/><circle cx="52" cy="36" r="12" fill="#fff"/><circle cx="24" cy="46" r="9" fill="#fff"/><circle cx="56" cy="46" r="9" fill="#fff"/><ellipse cx="62" cy="42" rx="8" ry="6" fill="#fff" stroke="#ddd" stroke-width=".5"/><ellipse cx="66" cy="38" rx="4" ry="2" fill="#e8e8e8" transform="rotate(15 66 38)"/><circle cx="65" cy="41" r="1.2" fill="#555"/><circle cx="69" cy="43" r=".8" fill="#ccc"/><line x1="28" y1="60" x2="26" y2="74" stroke="#ddd" stroke-width="3" stroke-linecap="round"/><line x1="38" y1="62" x2="36" y2="76" stroke="#ddd" stroke-width="3" stroke-linecap="round"/><line x1="48" y1="62" x2="50" y2="76" stroke="#ddd" stroke-width="3" stroke-linecap="round"/><line x1="56" y1="60" x2="58" y2="74" stroke="#ddd" stroke-width="3" stroke-linecap="round"/></svg>';
    var TEXT_TAGS = 'p,h1,h2,h3,h4,h5,h6,li,a,td,th,span,button,label,blockquote,cite,code,em,strong'.split(',');

    function anyBlocked(els) {
      for (var i = 0; i < els.length; i++) {
        var e = els[i];
        if (!e || e === document.body || e === document.documentElement) continue;
        if (e.classList && e.classList.contains('sheep-container')) return true;
        var t = e.tagName.toLowerCase();
        if (t === 'img' || t === 'svg' || t === 'video' || t === 'canvas') return true;
        var cs = window.getComputedStyle(e);
        if (cs.backgroundImage !== 'none') return true;
        if (TEXT_TAGS.indexOf(t) !== -1 && e.textContent.trim().length > 2) return true;
      }
      return false;
    }

    function isFree(vpX, vpY) {
      var half = 24;
      var checks = [[vpX, vpY]];
      if (vpX - half >= 0 && vpY - half >= 0) checks.push([vpX - half, vpY - half]);
      if (vpX + half <= window.innerWidth && vpY - half >= 0) checks.push([vpX + half, vpY - half]);
      if (vpX - half >= 0 && vpY + half <= window.innerHeight) checks.push([vpX - half, vpY + half]);
      if (vpX + half <= window.innerWidth && vpY + half <= window.innerHeight) checks.push([vpX + half, vpY + half]);
      for (var i = 0; i < checks.length; i++) {
        var els = document.elementsFromPoint(checks[i][0], checks[i][1]);
        if (els && anyBlocked(els)) return false;
      }
      return true;
    }

    function findSpot() {
      var vw = window.innerWidth, vh = window.innerHeight;
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      for (var i = 0; i < 120; i++) {
        var vx = 26 + Math.random() * (vw - 78);
        var vy = 26 + Math.random() * (vh - 78);
        if (isFree(vx, vy)) {
          return { x: vx + (window.pageXOffset || document.documentElement.scrollLeft), y: vy + scrollY };
        }
      }
      return null;
    }

    function spawn() {
      var pos = findSpot();
      if (!pos) return;
      var box = document.createElement('div');
      box.className = 'sheep-container';
      box.style.left = pos.x + 'px';
      box.style.top = pos.y + 'px';
      box.innerHTML = SVG;
      document.body.appendChild(box);
      var inner = box.firstElementChild;
      inner.classList.add('sheep-jump');
      inner.addEventListener('animationend', function () { box.remove(); });
    }

    window.addEventListener('load', function () { setTimeout(spawn, 600); });
    var timer;
    window.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(spawn, 400);
    });
  })();
})();