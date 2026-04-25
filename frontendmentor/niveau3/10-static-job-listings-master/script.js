document.addEventListener('DOMContentLoaded', () => {
  const jobListElement = document.getElementById('job-list');
  const filterBar = document.getElementById('filter-bar');
  const filterTagsElement = document.getElementById('filter-tags');
  const clearBtn = document.getElementById('clear-btn');

  let jobs = [];
  let activeFilters = new Set();

  async function fetchJobs() {
    try {
      const response = await fetch('./data.json');
      jobs = await response.json();
      renderJobs();
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  function renderJobs() {
    jobListElement.innerHTML = '';
    
    const filteredJobs = jobs.filter(job => {
      if (activeFilters.size === 0) return true;
      const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
      return [...activeFilters].every(filter => jobTags.includes(filter));
    });

    filteredJobs.forEach(job => {
      const card = createJobCard(job);
      jobListElement.appendChild(card);
    });
  }

  function createJobCard(job) {
    const card = document.createElement('div');
    card.className = `job-card${job.featured ? ' featured' : ''}`;
    
    const tags = [job.role, job.level, ...job.languages, ...job.tools];
    
    card.innerHTML = `
      <img src="${job.logo}" alt="${job.company} logo" class="job-logo">
      <div class="job-info">
        <div class="job-header">
          <span class="company">${job.company}</span>
          ${job.new ? '<span class="badge badge-new">New!</span>' : ''}
          ${job.featured ? '<span class="badge badge-featured">Featured</span>' : ''}
        </div>
        <h2 class="position">${job.position}</h2>
        <div class="job-meta">
          <span>${job.postedAt}</span>
          <span>${job.contract}</span>
          <span>${job.location}</span>
        </div>
      </div>
      <div class="job-tags">
        ${tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}
      </div>
    `;

    card.querySelectorAll('.tag').forEach(tagElement => {
      tagElement.addEventListener('click', () => {
        addFilter(tagElement.dataset.tag);
      });
    });

    return card;
  }

  function addFilter(tag) {
    if (activeFilters.has(tag)) return;
    activeFilters.add(tag);
    updateFilterBar();
    renderJobs();
  }

  function removeFilter(tag) {
    activeFilters.delete(tag);
    updateFilterBar();
    renderJobs();
  }

  function updateFilterBar() {
    if (activeFilters.size > 0) {
      filterBar.classList.add('active');
    } else {
      filterBar.classList.remove('active');
    }

    filterTagsElement.innerHTML = '';
    activeFilters.forEach(tag => {
      const tagElement = document.createElement('div');
      tagElement.className = 'filter-tag';
      tagElement.innerHTML = `
        <span>${tag}</span>
        <button aria-label="Remove ${tag}" data-tag="${tag}">
          <img src="./images/icon-remove.svg" alt="">
        </button>
      `;
      tagElement.querySelector('button').addEventListener('click', () => {
        removeFilter(tag);
      });
      filterTagsElement.appendChild(tagElement);
    });
  }

  clearBtn.addEventListener('click', () => {
    activeFilters.clear();
    updateFilterBar();
    renderJobs();
  });

  fetchJobs();
});
