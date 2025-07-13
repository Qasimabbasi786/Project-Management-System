// Select elements
const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const footer = document.getElementById('footer');
const contactForm = document.getElementById('contactForm');
const contactDetailsBox = document.querySelector('.contact-details-box'); // Updated to use the correct class selector

// Utility function to update styles
const updateStyles = (elements, styles) => {
    elements.forEach(element => {
        if (element) {
            Object.assign(element.style, styles);
        }
    });
};

// Apply theme to all components
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

        // Update footer links and text
        const footerLinks = footer.querySelectorAll('a, i');
        updateStyles(footerLinks, {
            color: isLightTheme ? '#000000' : '#ffffff'
        });

        const footerText = footer.querySelectorAll('p, h5, li');
        updateStyles(footerText, {
            color: isLightTheme ? '#000000' : '#ffffff'
        });

        const footerHrs = footer.querySelectorAll('hr');
        updateStyles(footerHrs, {
            borderColor: isLightTheme ? '#000000' : '#ffffff'
        });
    }

    // Update contact form
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

    // Update contact details box
    if (contactDetailsBox) {
        contactDetailsBox.style.backgroundColor = isLightTheme ? '#ffffff' : '#343a40';
        contactDetailsBox.style.color = isLightTheme ? '#212529' : '#e4e6eb';
    }
};

// Theme toggle logic
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        applyTheme();
    });
}

// Initial load
applyTheme();
