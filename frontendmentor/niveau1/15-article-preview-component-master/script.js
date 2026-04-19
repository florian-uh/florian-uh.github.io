const shareBtn = document.querySelector('.share-btn');
const sharePopover = document.getElementById('share-popover');

shareBtn.addEventListener('click', () => {
  shareBtn.classList.toggle('active');
  sharePopover.classList.toggle('active');
});

// Close popover when clicking outside
document.addEventListener('click', (event) => {
  const isClickInside = shareBtn.contains(event.target) || sharePopover.contains(event.target);
  
  if (!isClickInside && sharePopover.classList.contains('active')) {
    shareBtn.classList.remove('active');
    sharePopover.classList.remove('active');
  }
});