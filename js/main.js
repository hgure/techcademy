// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Scroll-triggered fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.9)';
  }
});

// Contact form handling with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.btn-primary');
    const statusDiv = document.getElementById('form-status');
    const originalText = btn.textContent;
    
    // Set _replyto to the email value
    const emailInput = document.getElementById('email');
    const replyToInput = document.getElementById('_replyto');
    if (emailInput && replyToInput) {
      replyToInput.value = emailInput.value;
    }
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    statusDiv.style.display = 'none';

    try {
      const formData = new FormData(contactForm);
      
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        statusDiv.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        statusDiv.style.background = '#d1fae5';
        statusDiv.style.color = '#065f46';
        statusDiv.style.border = '1px solid #34d399';
        statusDiv.style.display = 'block';
        
        btn.textContent = 'Message Sent!';
        btn.style.background = '#34d399';
        contactForm.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          statusDiv.style.display = 'none';
        }, 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      statusDiv.textContent = '✗ Failed to send message. Please try again or email us directly.';
      statusDiv.style.background = '#fee2e2';
      statusDiv.style.color = '#991b1b';
      statusDiv.style.border = '1px solid #f87171';
      statusDiv.style.display = 'block';
      
      btn.textContent = 'Try Again';
      btn.style.background = '#f87171';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
      
      console.error('Form submission error:', err);
    }
  });
}
