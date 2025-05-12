const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const toast = document.getElementById('toast');
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');
const contactForm = document.getElementById('contactForm');
const profileForm = document.getElementById('profileForm');
const faqQuestions = document.querySelectorAll('[data-faq-toggle]');
const blogCategoryButtons = document.querySelectorAll('.blog-category-button');
const blogCards = document.querySelectorAll('.blog-card');


function handleScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}


function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('show');
  
  if (isOpen) {
    menuIcon.classList.add('close');
  } else {
    menuIcon.classList.remove('close');
  }
}


function showToast(title, description, duration = 3000) {
  const toastTitle = document.querySelector('.toast-title');
  const toastDescription = document.querySelector('.toast-description');
  
  toastTitle.textContent = title;
  toastDescription.textContent = description;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}


function filterProducts() {
  if (!filterButtons.length) return; 
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
     
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
     
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      
      productCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          if (card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}


function setupContactForm() {
  if (!contactForm) return; 
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
  
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
   
    const formData = {
      name: contactForm.querySelector('#name').value,
      phone: contactForm.querySelector('#phone').value,
      email: contactForm.querySelector('#email').value,
      subject: contactForm.querySelector('#subject').value,
      message: contactForm.querySelector('#message').value,
      _replyto: 'carlsoariad@gmail.com' 
    };
    
    
    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        showToast('Mensaje enviado', 'Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
      } else {
        showToast('Error', 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.', 5000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Error', 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.', 5000);
    })
    .finally(() => {
     
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
  });
}


function setupProfileForm() {
  if (!profileForm) return; 
  
  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const submitButton = profileForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
   
    const formData = new FormData(profileForm);
    const profileData = {};
    
    
    for (const [key, value] of formData.entries()) {
      if (profileData[key] === undefined) {
        profileData[key] = value;
      } else if (Array.isArray(profileData[key])) {
        profileData[key].push(value);
      } else {
        profileData[key] = [profileData[key], value];
      }
    }
    
   
    profileData._replyto = 'carlsoariad@gmail.com';
    profileData._cc = 'carlsoariad@gmail.com';
    
   
    fetch(profileForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
    .then(response => {
      if (response.ok) {
        showToast('Perfil enviado', 'Hemos recibido tu información y la revisaremos pronto.');
        profileForm.reset();
      } else {
        showToast('Error', 'Hubo un problema al enviar el perfil. Por favor, intenta de nuevo.', 5000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Error', 'Hubo un problema al enviar el perfil. Por favor, intenta de nuevo.', 5000);
    })
    .finally(() => {
  
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
  });
}


function setupFaqAccordion() {
  if (!faqQuestions.length) return; 
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      
      const faqItem = this.parentElement;
      faqItem.classList.toggle('active');
      
  
      const icon = this.querySelector('.faq-icon');
      if (icon) {
        icon.classList.toggle('open');
      }
      
     
      const answer = faqItem.querySelector('.faq-answer');
      if (answer) {
        if (faqItem.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
      }
    });
  });
}


function setupBlogFilters() {
  if (!blogCategoryButtons.length) return; 
  
  blogCategoryButtons.forEach(button => {
    button.addEventListener('click', function() {
     
      blogCategoryButtons.forEach(btn => btn.classList.remove('active'));
      
      
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      
     
      blogCards.forEach(card => {
        if (category === 'all') {
          card.style.display = 'block';
        } else {
          if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}


function setupFloatingElements() {
  const floatingElements = document.querySelectorAll('.animate-float');
  
  if (floatingElements.length === 0) return;
  
  floatingElements.forEach(element => {
    let startY = 0;
    let animationDirection = 1;
    let animationSpeed = 0.5 + Math.random() * 0.5; 
    
    function animateFloat() {
      startY += 0.05 * animationDirection * animationSpeed;
      
      if (startY > 10) {
        animationDirection = -1;
      } else if (startY < -10) {
        animationDirection = 1;
      }
      
      element.style.transform = `translateY(${startY}px)`;
      requestAnimationFrame(animateFloat);
    }
    
    animateFloat();
  });
}


function setupPageTransitions() {
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && 
        link.pathname.endsWith('.html')) {
      
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href) {
          e.preventDefault();
          
          document.body.style.opacity = 0;
          document.body.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    }
  });
}


window.addEventListener('scroll', handleScroll);
if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMobileMenu);


document.addEventListener('DOMContentLoaded', function() {
 
  handleScroll();
  
  
  filterProducts();
  
 
  setupContactForm();
  

  setupProfileForm();
  

  setupFaqAccordion();
  

  setupBlogFilters();
  

  setupFloatingElements();
  
  setupPageTransitions();
});