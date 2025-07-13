// Select elements
const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const footer = document.getElementById('footer');
const faqHeader = document.querySelector('header.text-center');
const faqAccordion = document.querySelectorAll('.accordion-item');

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

    // Update FAQ accordion items
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
