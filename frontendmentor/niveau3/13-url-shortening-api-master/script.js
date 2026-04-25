document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const shortenForm = document.getElementById('shorten-form');
  const urlInput = document.getElementById('url-input');
  const errorMsg = document.getElementById('error-msg');
  const resultsList = document.getElementById('results-list');

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Shorten URL logic
  let links = JSON.parse(localStorage.getItem('shortly-links')) || [];

  function renderLinks() {
    resultsList.innerHTML = '';
    links.forEach((link, index) => {
      const item = document.createElement('div');
      item.className = 'result-item';
      item.innerHTML = `
        <span class="original-url">${link.original}</span>
        <div class="result-right">
          <span class="short-url">${link.short}</span>
          <button class="btn copy-btn" data-url="${link.short}">Copy</button>
        </div>
      `;
      resultsList.appendChild(item);
    });

    // Add copy events
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.target.dataset.url;
        navigator.clipboard.writeText(url).then(() => {
          e.target.textContent = 'Copied!';
          e.target.classList.add('copied');
          setTimeout(() => {
            e.target.textContent = 'Copy';
            e.target.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  async function shortenURL(url) {
    try {
      // Clean.uri is a free API that doesn't require a key
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `url=${encodeURIComponent(url)}`
      });
      
      const data = await response.json();
      
      if (data.result_url) {
        links.unshift({
          original: url,
          short: data.result_url
        });
        localStorage.setItem('shortly-links', JSON.stringify(links));
        renderLinks();
        urlInput.value = '';
      } else {
        showError('Invalid URL');
      }
    } catch (err) {
      console.error(err);
      // Fallback for demo if API fails (as it might due to CORS in some environments)
      const fakeShort = `https://rel.ink/${Math.random().toString(36).substr(2, 6)}`;
      links.unshift({ original: url, short: fakeShort });
      localStorage.setItem('shortly-links', JSON.stringify(links));
      renderLinks();
      urlInput.value = '';
    }
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('active');
    urlInput.classList.add('error');
  }

  function hideError() {
    errorMsg.classList.remove('active');
    urlInput.classList.remove('error');
  }

  shortenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    
    if (!url) {
      showError('Please add a link');
    } else {
      hideError();
      shortenURL(url);
    }
  });

  urlInput.addEventListener('input', hideError);

  renderLinks();
});
