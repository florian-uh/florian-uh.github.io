document.addEventListener('DOMContentLoaded', () => {
  const markAllReadBtn = document.getElementById('mark-all-read');
  const unreadCount = document.getElementById('unread-count');
  const notifications = document.querySelectorAll('.notification');

  const updateCount = () => {
    const unreadNotifications = document.querySelectorAll('.notification.unread');
    unreadCount.textContent = unreadNotifications.length;
    if (unreadNotifications.length === 0) {
      unreadCount.classList.add('hidden');
    } else {
      unreadCount.classList.remove('hidden');
    }
  };

  markAllReadBtn.addEventListener('click', () => {
    notifications.forEach(notification => {
      notification.classList.remove('unread');
    });
    updateCount();
  });

  // Individual click to mark as read
  notifications.forEach(notification => {
    notification.addEventListener('click', () => {
      if (notification.classList.contains('unread')) {
        notification.classList.remove('unread');
        updateCount();
      }
    });
  });
});
