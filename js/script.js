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
})();