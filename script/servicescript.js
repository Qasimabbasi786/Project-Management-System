// Select elements
const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const footer = document.getElementById('footer');
const servicesSection = document.getElementById('services');
const serviceCards = document.querySelectorAll('.service-card');
const cta = document.querySelector('.cta');
const featuresIcons = document.querySelectorAll('.features .icon');

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
        // Update footer background and text color
        footer.style.backgroundColor = isLightTheme ? '#f8f9fa' : '#343a40';
        footer.style.color = isLightTheme ? '#212529' : '#ffffff';

        // Update links inside the footer
        const footerLinks = footer.querySelectorAll('i');
        footerLinks.forEach(link => {
            link.style.color = isLightTheme ? '#000000' : '#ffffff'; // Light theme uses a blue color for links
        });

        const footerA = footer.querySelectorAll('a');
        footerA.forEach(link => {
            link.style.color = isLightTheme ? '#000000' : '#ffffff'; // Dark color for light theme, light color for dark theme
        });

        const footerText = footer.querySelectorAll('p,h5,li');
        footerText.forEach(link => {
            link.style.color = isLightTheme ? '#000000' : '#ffffff'; // Light theme uses a blue color for links
        });

        // Update icons inside the footer
        const footerIcons = footer.querySelectorAll('.icon-class'); // Replace '.icon-class' with the actual class of your icons
        footerIcons.forEach(icon => {
            icon.style.color = isLightTheme ? '#000000' : '#ffffff';
        });

        // Update horizontal rules (<hr>) inside the footer
        const footerHrs = footer.querySelectorAll('hr');
        footerHrs.forEach(hr => {
            hr.style.borderColor = isLightTheme ? '#000000' : '#ffffff'; // Light theme uses a light gray for borders
        });
    }

    // Update services section
    if (servicesSection) {
        updateStyles([servicesSection], {
            backgroundColor: isLightTheme ? '#f8f9fa' : '#343a40',
            color: isLightTheme ? '#212529' : '#ffffff'
        });
    }

    // Update service cards
    if (serviceCards) {
        serviceCards.forEach(card => {
            updateStyles([card], {
                backgroundColor: isLightTheme ? '#ffffff' : '#333333',
                color: isLightTheme ? '#2b2b2b' : '#f5f5f5',
                boxShadow: isLightTheme 
                    ? '0 4px 8px rgba(0, 0, 0, 0.1)'
                    : '0 4px 8px rgba(0, 0, 0, 0.3)'
            });

            const cardLinks = card.querySelectorAll('a, i');
            updateStyles(cardLinks, {
                color: isLightTheme ? '#000000' : '#ffffff'
            });

            // const cardButton = card.querySelector('.btn');
            // if (cardButton) {
            //     updateStyles([cardButton], {
            //         backgroundColor: isLightTheme ? '#e6e0d4' : '#8c7851',
            //         color: isLightTheme ? '#8c7851' : '#ffffff'
            //     });
            // }
        });
    }

    // Update features icons
    if (featuresIcons) {
        updateStyles(featuresIcons, {
            color: isLightTheme ? '#000000' : '#000000'
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
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        applyTheme();
    });
}

// Initial load
applyTheme();
