const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const footer = document.getElementById('footer');
const cta = document.querySelector('.cta');

// Utility function to update styles safely
const updateStyles = (elements, styles) => {
  elements.forEach(element => {
    if (element) {
      Object.assign(element.style, styles);
    }
  });
};

// Apply theme to timeline, navbar, footer, and cta
const applyTheme = () => {
  const isLightTheme = document.body.classList.contains('light-theme');
  const timelineContents = document.querySelectorAll('.timeline-item-content');
  const timelinePointers = document.querySelectorAll('.timeline-pointer');

  // Update timeline
  updateStyles(timelineContents, {
    backgroundColor: isLightTheme ? '#f8f9fa' : '#2c2f33',
    color: isLightTheme ? '#212529' : '#ffffff'
  });

  updateStyles(timelinePointers, {
    borderColor: isLightTheme ? '#ffffff' : '#f1f1f1'
  });

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
};

// Theme toggle logic
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  applyTheme();
});

// Initial theme application
applyTheme();