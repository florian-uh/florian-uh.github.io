document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ticket-form');
  const dropArea = document.getElementById('drop-area');
  const avatarInput = document.getElementById('avatar');
  const uploadInstruction = document.getElementById('upload-instruction');
  const avatarPreview = document.getElementById('avatar-preview');
  const previewImg = document.getElementById('preview-img');
  const removeAvatarBtn = document.getElementById('remove-avatar');
  const changeAvatarBtn = document.getElementById('change-avatar');
  const avatarError = document.getElementById('avatar-error');
  const avatarInfo = document.getElementById('avatar-info');

  const registrationSection = document.getElementById('registration-section');
  const ticketSection = document.getElementById('ticket-section');

  const confName = document.getElementById('conf-name');
  const confEmail = document.getElementById('conf-email');
  const ticketAvatar = document.getElementById('ticket-avatar');
  const ticketName = document.getElementById('ticket-name');
  const ticketGithub = document.getElementById('ticket-github');

  let avatarFile = null;

  // --- Avatar Upload Logic ---

  const handleFile = (file) => {
    if (!file) return;

    // Check type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      showAvatarError('Please upload a valid image (JPG or PNG).');
      return;
    }

    // Check size (500KB)
    if (file.size > 500 * 1024) {
      showAvatarError('File too large. Please upload an image under 500KB.');
      return;
    }

    avatarFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      uploadInstruction.classList.add('hidden');
      avatarPreview.classList.remove('hidden');
      avatarError.classList.add('hidden');
      avatarInfo.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  };

  const showAvatarError = (message) => {
    avatarError.textContent = message;
    avatarError.classList.remove('hidden');
    avatarInfo.classList.add('hidden');
  };

  dropArea.addEventListener('click', () => avatarInput.click());

  avatarInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
  });

  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    handleFile(e.dataTransfer.files[0]);
  });

  removeAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarFile = null;
    avatarInput.value = '';
    avatarPreview.classList.add('hidden');
    uploadInstruction.classList.remove('hidden');
  });

  changeAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarInput.click();
  });

  // --- Form Submission ---

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Avatar
    if (!avatarFile) {
      showAvatarError('Please upload an avatar.');
      isValid = false;
    }

    // Validate Other Fields
    const fields = ['full-name', 'email', 'github'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      const error = input.nextElementSibling;
      
      if (!input.checkValidity()) {
        input.classList.add('error');
        error.classList.remove('hidden');
        isValid = false;
      } else {
        input.classList.remove('error');
        error.classList.add('hidden');
      }
    });

    if (isValid) {
      generateTicket();
    }
  });

  const generateTicket = () => {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const github = document.getElementById('github').value;

    // Fill confirmation section
    confName.textContent = fullName;
    confEmail.textContent = email;

    // Fill ticket
    ticketName.textContent = fullName;
    ticketEmail = email; // Not displayed in ticket but good for state
    ticketGithub.textContent = github.startsWith('@') ? github : `@${github}`;
    
    // Use the uploaded image for the ticket
    ticketAvatar.src = previewImg.src;

    // Switch views
    registrationSection.classList.add('hidden');
    ticketSection.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
  };
});
