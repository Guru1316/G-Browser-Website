// ===== SCREENSHOT CAROUSEL =====
const thumbnails = document.querySelectorAll('.thumbnail');
const screenshotImages = document.querySelectorAll('.screenshot-img');
const screenshotDescription = document.getElementById('screenshotDescription');

// Screenshot data with descriptions
const screenshotData = [
  {
    id: 1,
    title: "Clean & Modern Interface",
    description: "Experience browsing with our intuitive interface that puts content first. Minimal design with tab management, URL bar, and quick access buttons.",
    features: ["Tab management", "URL bar with search", "Quick action buttons", "Clean layout"]
  },
  {
    id: 2,
    title: "Smart Bookmarks Sidebar",
    description: "Organize and access your favorite websites instantly. The slide-out sidebar includes search, folder support, and favicon display.",
    features: ["Quick search", "Folder organization", "Favicon support", "Easy management"]
  },
  {
    id: 3,
    title: "Complete Settings Panel",
    description: "Customize every aspect of G-Browser. Choose search engines, toggle ad-blocker, set homepage, and configure privacy settings.",
    features: ["4 search engines", "Ad-block toggle", "Homepage setting", "Privacy controls"]
  },
  {
    id: 4,
    title: "Browsing History Timeline",
    description: "Keep track of your browsing with detailed history. Search through visited sites and clear history with one click.",
    features: ["Searchable history", "Timeline view", "One-click clear", "Privacy focused"]
  }
];

// Initialize screenshot carousel
function initScreenshotCarousel() {
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      // Remove active class from all thumbnails and images
      thumbnails.forEach(t => t.classList.remove('active'));
      screenshotImages.forEach(img => img.classList.remove('active'));
      
      // Add active class to clicked thumbnail
      thumbnail.classList.add('active');
      
      // Show corresponding screenshot
      const imageId = thumbnail.getAttribute('data-image');
      const targetImage = document.querySelector(`.screenshot-img[data-id="${imageId}"]`);
      
      if (targetImage) {
        targetImage.classList.add('active');
      }
      
      // Update description
      updateScreenshotDescription(imageId);
    });
  });
  
  // Auto-rotate screenshots every 5 seconds
  let currentSlide = 0;
  function rotateScreenshots() {
    thumbnails.forEach(t => t.classList.remove('active'));
    screenshotImages.forEach(img => img.classList.remove('active'));
    
    currentSlide = (currentSlide + 1) % thumbnails.length;
    
    thumbnails[currentSlide].classList.add('active');
    screenshotImages[currentSlide].classList.add('active');
    updateScreenshotDescription(currentSlide + 1);
  }
  
  // Start auto-rotation (optional - uncomment if you want auto-slide)
  // setInterval(rotateScreenshots, 5000);
}

// Update screenshot description
function updateScreenshotDescription(imageId) {
  const data = screenshotData.find(item => item.id == imageId);
  if (data && screenshotDescription) {
    screenshotDescription.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <div class="screenshot-features">
        ${data.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
      </div>
    `;
  }
}

// Add CSS for feature tags
const featureTagStyle = document.createElement('style');
featureTagStyle.textContent = `
  .screenshot-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 15px;
  }
  
  .feature-tag {
    padding: 4px 12px;
    background: rgba(0, 170, 255, 0.1);
    border-radius: 15px;
    font-size: 0.85rem;
    color: var(--primary);
  }
`;
document.head.appendChild(featureTagStyle);

// ===== ANIMATE PROGRESS CIRCLES =====
function animateProgressCircles() {
  const progressCircles = document.querySelectorAll('.circle-progress');
  
  progressCircles.forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    
    // Animate from 0 to target percentage
    let currentPercent = 0;
    const targetPercent = parseInt(percent);
    const animationSpeed = 2; // Percentage per frame
    
    const animate = () => {
      if (currentPercent < targetPercent) {
        currentPercent += animationSpeed;
        circle.style.setProperty('--percent', `${currentPercent}%`);
        
        // Update percentage text
        const percentText = circle.querySelector('.percent');
        if (percentText) {
          percentText.textContent = `${Math.min(currentPercent, targetPercent)}%`;
        }
        
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(circle);
  });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  
  menuBtn?.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    
    // Animate hamburger to X
    const spans = menuBtn.querySelectorAll('span');
    if (!isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Initialize screenshot carousel
  initScreenshotCarousel();
  
  // Animate progress circles
  animateProgressCircles();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
          const spans = menuBtn.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  });
  
  // Add particles to hero background
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    createParticles(particlesContainer);
  }
});

// ===== PARTICLE BACKGROUND =====
function createParticles(container) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = i % 3 === 0 ? 'rgba(0, 170, 255, 0.5)' : 
                               i % 3 === 1 ? 'rgba(255, 51, 102, 0.3)' : 
                               'rgba(255, 255, 255, 0.2)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s infinite linear`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
  
  // Add particle animation CSS
  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
  `;
  document.head.appendChild(particleStyle);
}

// Simple FAQ toggle (add this if you have existing script.js)
function initSimpleFAQ() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          activeItem.querySelector('.faq-toggle').textContent = '+';
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        question.querySelector('.faq-toggle').textContent = '+';
      } else {
        item.classList.add('active');
        question.querySelector('.faq-toggle').textContent = '−';
      }
    });
  });
}

// Call it when DOM is loaded
document.addEventListener('DOMContentLoaded', initSimpleFAQ);