/**
 * MAHI PATEL - CONTACT FORM & TOAST UTILITIES
 * Handles validation, copy actions, and client-side message preparation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Utility: Show Toast Notification
  window.showToast = function (message, duration = 3500) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  // Clipboard copy handler for contact info cards
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: "${textToCopy}"`);
        }).catch(() => {
          showToast(`Text: ${textToCopy}`);
        });
      }
    });
  });

  // Contact Form Handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validation
      if (!name || !email || !subject || !message) {
        showToast('⚠️ Please fill in all required fields.');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('⚠️ Please enter a valid email address.');
        return;
      }

      // Open user's default email client with pre-filled parameters
      const recipient = 'pmahi4834@gmail.com';
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        `[Portfolio Contact] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Hi Mahi,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
      )}`;

      window.location.href = mailtoUrl;

      showToast('Opening your email app to send message...');

      // Reset form
      contactForm.reset();
    });
  }
});
