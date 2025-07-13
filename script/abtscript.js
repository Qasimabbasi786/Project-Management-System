
    const themeToggle = document.getElementById('themeToggle');
    const navbar = document.querySelector('.navbar');
    const footer = document.getElementById('footer');
    
    
    // Apply theme to reviews, timeline, and other elements
    const applyTheme = () => {
        const isLightTheme = document.body.classList.contains('light-theme');
        const timelineContents = document.querySelectorAll('.timeline-item-content');
        const timelinePointers = document.querySelectorAll('.timeline-pointer');
    
    
        // Update timeline
        timelineContents.forEach(content => {
            content.style.backgroundColor = isLightTheme ? '#f8f9fa' : '#2c2f33';
            content.style.color = isLightTheme ? '#212529' : '#ffffff';
        });
    
        timelinePointers.forEach(pointer => {
            pointer.style.borderColor = isLightTheme ? '#ffffff' : '#f1f1f1';
        });
    
        // Update navbar and footer
        if (navbar) {
            navbar.className = isLightTheme
                ? 'navbar navbar-expand-lg navbar-light bg-light'
                : 'navbar navbar-expand-lg navbar-dark';
        }
    
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
    };
    
    // Theme toggle logic
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        applyTheme();
    });
    
    // Initial load
    loadReviews();
    applyTheme();

    