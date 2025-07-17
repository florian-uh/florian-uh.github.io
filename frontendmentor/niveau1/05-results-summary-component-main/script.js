fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const colors = {
      Reaction: 'var(--light-red)',
      Memory: 'var(--orangey-yellow)',
      Verbal: 'var(--green-teal)',
      Visual: 'var(--cobalt-blue)'
    };
    data.forEach(item => {
      const id = item.category.toLowerCase();
      const div = document.getElementById(id);
      div.innerHTML = `
        <div class="summary-row ${id}">
          <img src="${item.icon}" alt="${item.category} icon" class="icon"/>
          <span class="category" style="color:${colors[item.category]}">${item.category}</span>
          <span class="score"><strong>${item.score}</strong> <span class="max">/ 100</span></span>
        </div>
      `;
    });
});