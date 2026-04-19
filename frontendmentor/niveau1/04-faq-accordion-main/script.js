document.addEventListener('DOMContentLoaded', () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const accordionItem = header.parentElement;
      const content = accordionItem.querySelector('.accordion-content');
      const icon = header.querySelector('.icon');

      // Close all other accordion items
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          const otherItem = otherHeader.parentElement;
          const otherContent = otherItem.querySelector('.accordion-content');
          const otherIcon = otherHeader.querySelector('.icon');
          
          otherContent.hidden = true;
          otherIcon.src = 'assets/images/icon-plus.svg';
        }
      });

      // Toggle the clicked item
      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        content.hidden = true;
        icon.src = 'assets/images/icon-plus.svg';
      } else {
        header.setAttribute('aria-expanded', 'true');
        content.hidden = false;
        icon.src = 'assets/images/icon-minus.svg';
      }
    });
  });
});
