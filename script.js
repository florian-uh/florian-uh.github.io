document.addEventListener("DOMContentLoaded", () => {
    // Dark mode
    const toggle = document.getElementById("toggle-dark-mode");
    if (toggle) {
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        toggle.textContent = isDark ? "☀️ Mode clair" : "🌙 Mode sombre";
        toggle.setAttribute("aria-pressed", isDark);
      });
    }
  
    // Pagination articles
    const posts = document.querySelectorAll(".post");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageInfo = document.getElementById("pageInfo");
  
    let currentPage = 1;
    const postsPerPage = 2;
    const totalPages = Math.ceil(posts.length / postsPerPage);
  
    function showPage(page) {
      posts.forEach((post, i) => {
        post.style.display = (i >= (page - 1) * postsPerPage && i < page * postsPerPage) ? "block" : "none";
      });
      pageInfo.textContent = `Page ${page}`;
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
    }
  
    if (prevBtn && nextBtn && pageInfo) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
        }
      });
  
      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
        }
      });
  
      showPage(currentPage);
    }
  
    // Toggle RSS
    const toggleRss = document.getElementById("toggle-rss");
    const fluxRss = document.getElementById("flux-rss");
    if (toggleRss && fluxRss) {
      toggleRss.addEventListener("click", () => {
        const hidden = fluxRss.getAttribute("aria-hidden") === "true";
        fluxRss.setAttribute("aria-hidden", !hidden);
        toggleRss.textContent = !hidden ? "Afficher" : "Masquer";
        toggleRss.setAttribute("aria-expanded", hidden);
      });
      fluxRss.setAttribute("aria-hidden", "false");
    }
  
    // RSS feeds
    const feeds = [
      { id: "feed-lemonde", url: "https://www.lemonde.fr/rss/une.xml" },
      { id: "feed-franceinfo", url: "https://www.francetvinfo.fr/titres.rss" },
      { id: "feed-france24", url: "https://www.france24.com/fr/rss" },
      { id: "feed-sciences", url: "https://www.futura-sciences.com/rss/actualites.xml" },
      { id: "feed-tech", url: "https://www.futura-sciences.com/rss/actualites/tech.xml" }
    ];
  
    feeds.forEach(feed => {
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById(feed.id);
          if (!container) return;
          container.innerHTML = "";
          data.items.slice(0, 5).forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.link;
            a.target = "_blank";
            a.textContent = item.title;
            li.appendChild(a);
            container.appendChild(li);
          });
        })
        .catch(err => {
          const container = document.getElementById(feed.id);
          if (container) container.innerHTML = "<li>Erreur de chargement</li>";
          console.error(`Erreur pour ${feed.id} :`, err);
        });
    });
  });