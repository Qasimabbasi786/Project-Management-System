const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const footer = document.getElementById('footer');
const cta = document.querySelector('.cta');
const timelineContents = document.querySelectorAll('.timeline-item-content');
const timelinePointers = document.querySelectorAll('.timeline-pointer');
const blogCards = document.querySelectorAll('.blog-card');
const blogHeader = document.querySelector('.blog-header');
const contactForm = document.getElementById('contactForm');
const contactDetailsBox = document.querySelector('.contact-details-box');
const faqHeader = document.querySelector('header.text-center');
const faqAccordion = document.querySelectorAll('.accordion-item');
const servicesSection = document.getElementById('services');
const serviceCards = document.querySelectorAll('.service-card');
const featuresIcons = document.querySelectorAll('.features .icon');

// Utility function to update styles safely
const updateStyles = (elements, styles) => {
  elements.forEach(element => {
    if (element) {
      Object.assign(element.style, styles);
    }
  });
};

// Apply theme to all components across pages
const applyTheme = () => {
  const isLightTheme = document.body.classList.contains('light-theme');

  // Update navbar
  if (navbar) {
    navbar.className = isLightTheme
      ? 'navbar navbar-expand-lg navbar-light bg-light'
      : 'navbar navbar-expand-lg navbar-dark';
  }

  // Update footer
  if (footer) {
    updateStyles([footer], {
      backgroundColor: isLightTheme ? '#f8f9fa' : '#343a40',
      color: isLightTheme ? '#212529' : '#ffffff'
    });

    const footerLinks = footer.querySelectorAll('a, i, p, h5, li');
    updateStyles(footerLinks, {
      color: isLightTheme ? '#000000' : '#ffffff'
    });

    const footerHrs = footer.querySelectorAll('hr');
    updateStyles(footerHrs, {
      borderColor: isLightTheme ? '#000000' : '#ffffff'
    });
  }

  // Update CTA
  if (cta) {
    updateStyles([cta], {
            backgroundColor: isLightTheme ? '#f8f9fa' : '#343a40',
            color: isLightTheme ? '#000000' : '#ffffff'
        });

        const ctaButton = cta.querySelector('.btn');
        if (ctaButton) {
            updateStyles([ctaButton], {
                backgroundColor: isLightTheme ? '#f4ede4' : '#8c7851',
                color: isLightTheme ? '#000000' : '#ffffff'
            });
        }
  }

  // Update timeline (index, about)
  updateStyles(timelineContents, {
    backgroundColor: isLightTheme ? '#f8f9fa' : '#2c2f33',
    color: isLightTheme ? '#212529' : '#ffffff'
  });

  updateStyles(timelinePointers, {
    borderColor: isLightTheme ? '#ffffff' : '#f1f1f1'
  });

  // Update blog cards and header (blog)
  if (blogCards) {
    blogCards.forEach(card => {
      updateStyles([card], {
        border: isLightTheme ? '2px solid #d0d0d0' : '2px solid #555555'
      });
    });
  }

  if (blogHeader) {
    updateStyles([blogHeader], {
      background: isLightTheme ? 'linear-gradient(to right, #f4ede4, #d6d6d6)' : '#343a40',
      color: isLightTheme ? '#212529' : '#ffffff'
    });
  }

  // Update contact form and details box (contact)
  if (contactForm) {
    updateStyles([contactForm], {
      backgroundColor: isLightTheme ? '#f8f9fa' : '#242526',
      color: isLightTheme ? '#212529' : '#e4e6eb'
    });

    const formElements = contactForm.querySelectorAll('input, textarea, button');
    updateStyles(formElements, {
      backgroundColor: isLightTheme ? '#ffffff' : '#343a40',
      color: isLightTheme ? '#212529' : '#ffffff',
      borderColor: isLightTheme ? '#ced4da' : '#444951'
    });

    const formLabels = contactForm.querySelectorAll('label');
    updateStyles(formLabels, {
      color: isLightTheme ? '#212529' : '#e4e6eb'
    });
  }

  if (contactDetailsBox) {
    updateStyles([contactDetailsBox], {
      backgroundColor: isLightTheme ? '#ffffff' : '#343a40',
      color: isLightTheme ? '#212529' : '#e4e6eb'
    });
  }

  // Update FAQ accordion (faqs)
  if (faqAccordion) {
    faqAccordion.forEach(item => {
      updateStyles([item], {
        backgroundColor: isLightTheme ? '#f8f9fa' : '#343a40',
        color: isLightTheme ? '#000000' : '#e9ecef'
      });

      const buttons = item.querySelectorAll('.accordion-button');
      updateStyles(buttons, {
        backgroundColor: isLightTheme ? '#e6e0d4' : '#3a3a3a',
        color: isLightTheme ? '#000000' : '#ffffff'
      });

      const bodies = item.querySelectorAll('.accordion-body');
      updateStyles(bodies, {
        backgroundColor: isLightTheme ? '#f8f9fa' : '#343a40',
        color: isLightTheme ? '#000000' : '#ffffff'
      });
    });
  }

  // Update services section and cards (services)
  if (servicesSection) {
    updateStyles([servicesSection], {
      backgroundColor: isLightTheme ? '#f8f9fa' : '#343a40',
      color: isLightTheme ? '#212529' : '#ffffff'
    });
  }

  if (serviceCards) {
    serviceCards.forEach(card => {
      updateStyles([card], {
        backgroundColor: isLightTheme ? '#ffffff' : '#333333',
        color: isLightTheme ? '#2b2b2b' : '#f5f5f5',
        boxShadow: isLightTheme ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.3)'
      });

      const cardLinks = card.querySelectorAll('a, i');
      updateStyles(cardLinks, {
        color: isLightTheme ? '#000000' : '#ffffff'
      });
    });
  }

  if (featuresIcons) {
    updateStyles(featuresIcons, {
      color: isLightTheme ? '#000000' : '#000000'
    });
  }
};

// Theme toggle logic
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    applyTheme();
  });
}

// Initial theme application
applyTheme();