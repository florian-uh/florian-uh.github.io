let currentUser = {};
let comments = [];

const commentsContainer = document.querySelector('.comments-container');
const addCommentInput = document.querySelector('.add-comment-input');
const sendBtn = document.querySelector('.btn-send-main');
const modalOverlay = document.querySelector('.modal-overlay');
const btnCancel = document.querySelector('.btn-cancel');
const btnConfirm = document.querySelector('.btn-confirm');

let deleteId = null;

// Fetch data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    currentUser = data.currentUser;
    comments = data.comments;
    init();
  });

function init() {
  renderComments();
  document.querySelector('.main-input-avatar').src = currentUser.image.webp;
}

function renderComments() {
  commentsContainer.innerHTML = '';
  comments.sort((a, b) => b.score - a.score).forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentsContainer.appendChild(commentElement);
  });
}

function createCommentElement(comment, isReply = false) {
  const isCurrentUser = comment.user.username === currentUser.username;
  const wrapper = document.createElement('div');
  wrapper.className = isReply ? 'reply-wrapper' : 'comment-wrapper';

  const card = document.createElement('div');
  card.className = 'comment-card';
  card.dataset.id = comment.id;

  card.innerHTML = `
    <div class="comment-score">
      <button class="score-btn score-plus" onclick="updateScore(${comment.id}, 1)">
        <img src="images/icon-plus.svg" alt="plus">
      </button>
      <span class="score-value">${comment.score}</span>
      <button class="score-btn score-minus" onclick="updateScore(${comment.id}, -1)">
        <img src="images/icon-minus.svg" alt="minus">
      </button>
    </div>
    <div class="comment-header">
      <img src="${comment.user.image.webp}" alt="${comment.user.username}" class="user-avatar">
      <span class="user-name">${comment.user.username}</span>
      ${isCurrentUser ? '<span class="user-badge">you</span>' : ''}
      <span class="comment-date">${comment.createdAt}</span>
    </div>
    <div class="comment-content">
      ${comment.replyingTo ? `<span class="replying-to">@${comment.replyingTo}</span> ` : ''}
      <span class="text-content">${comment.content}</span>
    </div>
    <div class="comment-actions">
      ${isCurrentUser ? `
        <button class="action-btn btn-delete" onclick="showModal(${comment.id})">
          <img src="images/icon-delete.svg" alt="delete"> Delete
        </button>
        <button class="action-btn btn-edit" onclick="toggleEdit(${comment.id})">
          <img src="images/icon-edit.svg" alt="edit"> Edit
        </button>
      ` : `
        <button class="action-btn btn-reply" onclick="toggleReplyForm(${comment.id})">
          <img src="images/icon-reply.svg" alt="reply"> Reply
        </button>
      `}
    </div>
  `;

  wrapper.appendChild(card);

  if (comment.replies && comment.replies.length > 0) {
    const repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies-container';
    comment.replies.sort((a, b) => a.id - b.id).forEach(reply => {
      repliesContainer.appendChild(createCommentElement(reply, true));
    });
    wrapper.appendChild(repliesContainer);
  }

  return wrapper;
}

function updateScore(id, change) {
  const comment = findComment(id);
  if (comment) {
    comment.score += change;
    if (comment.score < 0) comment.score = 0;
    renderComments();
  }
}

function findComment(id) {
  for (let c of comments) {
    if (c.id === id) return c;
    if (c.replies) {
      for (let r of c.replies) {
        if (r.id === id) return r;
      }
    }
  }
  return null;
}

function showModal(id) {
  deleteId = id;
  modalOverlay.classList.add('active');
}

btnCancel.onclick = () => {
  modalOverlay.classList.remove('active');
  deleteId = null;
};

btnConfirm.onclick = () => {
  if (deleteId) {
    deleteComment(deleteId);
    modalOverlay.classList.remove('active');
    deleteId = null;
    renderComments();
  }
};

function deleteComment(id) {
  comments = comments.filter(c => {
    if (c.id === id) return false;
    if (c.replies) {
      c.replies = c.replies.filter(r => r.id !== id);
    }
    return true;
  });
}

function toggleReplyForm(id) {
  const existingForm = document.querySelector(`.reply-form[data-for="${id}"]`);
  if (existingForm) {
    existingForm.remove();
    return;
  }

  const commentCard = document.querySelector(`.comment-card[data-id="${id}"]`);
  const form = document.createElement('div');
  form.className = 'input-card reply-form';
  form.dataset.for = id;
  form.innerHTML = `
    <img src="${currentUser.image.webp}" alt="${currentUser.username}" class="input-avatar">
    <textarea class="comment-input" placeholder="Add a reply..."></textarea>
    <button class="btn-send">Reply</button>
  `;

  const textarea = form.querySelector('textarea');
  const targetComment = findComment(id);
  textarea.value = `@${targetComment.user.username} `;

  form.querySelector('.btn-send').onclick = () => {
    const content = textarea.value.replace(`@${targetComment.user.username}`, '').trim();
    if (content) {
      addReply(id, content);
    }
  };

  commentCard.after(form);
  textarea.focus();
}

function addReply(parentId, content) {
  const newReply = {
    id: Date.now(),
    content: content,
    createdAt: 'today',
    score: 0,
    replyingTo: findComment(parentId).user.username,
    user: currentUser,
    replies: []
  };

  for (let c of comments) {
    if (c.id === parentId || (c.replies && c.replies.some(r => r.id === parentId))) {
      c.replies = c.replies || [];
      c.replies.push(newReply);
      break;
    }
  }
  renderComments();
}

sendBtn.onclick = () => {
  const content = addCommentInput.value.trim();
  if (content) {
    const newComment = {
      id: Date.now(),
      content: content,
      createdAt: 'today',
      score: 0,
      user: currentUser,
      replies: []
    };
    comments.push(newComment);
    addCommentInput.value = '';
    renderComments();
  }
};

function toggleEdit(id) {
  const card = document.querySelector(`.comment-card[data-id="${id}"]`);
  const contentElement = card.querySelector('.comment-content');
  const textContent = card.querySelector('.text-content').innerText;
  const isReply = card.querySelector('.replying-to') !== null;
  const replyingTo = isReply ? card.querySelector('.replying-to').innerText : '';

  if (card.classList.contains('editing')) return;
  card.classList.add('editing');

  contentElement.innerHTML = `
    <textarea class="comment-input edit-input">${textContent}</textarea>
    <button class="btn-send btn-update" style="margin-top: 10px; align-self: end;">Update</button>
  `;

  const btnUpdate = contentElement.querySelector('.btn-update');
  btnUpdate.onclick = () => {
    const newContent = contentElement.querySelector('.edit-input').value.trim();
    if (newContent) {
      updateComment(id, newContent);
    }
  };
}

function updateComment(id, content) {
  const comment = findComment(id);
  if (comment) {
    comment.content = content;
    renderComments();
  }
}
