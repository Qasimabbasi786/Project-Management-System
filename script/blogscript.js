// Select elements
const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const footer = document.getElementById('footer');
const blogCards = document.querySelectorAll('.blog-card');
const blogHeader = document.querySelector('.blog-header');

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

    // Update blog cards
    if (blogCards) {
        blogCards.forEach(card => {
            updateStyles([card], {
                border: isLightTheme ? '2px solid #d0d0d0' : '2px solid #555555',
            });
        });
    }

    // Update blog header
    if (blogHeader) {
        updateStyles([blogHeader], {
            background: isLightTheme
                ? 'linear-gradient(to right, #f4ede4, #d6d6d6)'
                : '#343a40',
            color: isLightTheme ? '#212529' : '#ffffff'
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
