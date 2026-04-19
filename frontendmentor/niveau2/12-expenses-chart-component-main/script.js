async function loadChart() {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    const chartContainer = document.getElementById('chart-container');
    
    // Find max amount to calculate height percentage
    const maxAmount = Math.max(...data.map(item => item.amount));
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();

    chartContainer.innerHTML = data.map(item => {
      const height = (item.amount / maxAmount) * 150; // Max height in pixels
      const isToday = item.day === today;

      return `
        <div class="bar-wrapper">
          <div class="bar ${isToday ? 'current' : ''}" style="height: ${height}px">
            <span class="tooltip">$${item.amount}</span>
          </div>
          <span class="bar-label">${item.day}</span>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Error loading chart data:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadChart);
