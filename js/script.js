document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Navigation Logic ---
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
      if (getComputedStyle(document.documentElement).getPropertyValue('--bg-dark')) {
         // Using CSS variable if available or fallback
         navbar.style.background = 'rgba(10, 10, 11, 0.8)';
      }
      navbar.style.backdropFilter = 'blur(16px)';
      navbar.style.padding = '0.5rem 1.5rem';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.background = 'var(--bg-glass, rgba(23, 23, 23, 0.6))';
      navbar.style.padding = '0.75rem 1.5rem';
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close menu when clicking a link
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
      });
    });
  }


  // --- 2. Intersection Observer for Animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });


  // --- 3. API Demo Simulation ---
  const fetchBtn = document.getElementById('btn-fetch');
  const apiResult = document.getElementById('api-result');

  if (fetchBtn && apiResult) {
      fetchBtn.addEventListener('click', async () => {
        // UI Loading State
        const originalText = fetchBtn.innerHTML;
        fetchBtn.disabled = true;
        fetchBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Fetching...';
        apiResult.innerHTML = '<div class="d-flex align-center justify-center h-100"><div class="loading-spinner"></div></div>'; // Ensure flexbox classes exist or use inline styles if needed

        // Simulate Network Delay (1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock Data
        const mockData = [
          { type: 'push', title: "feat: Implement Neon Design System", repo: "web-frontend-demo", time: "2m ago" },
          { type: 'merge', title: "fix: Mobile navigation z-index bug", repo: "Pulse Music Player", time: "1h ago" },
          { type: 'star', title: "docs: Update API Reference", repo: "AI Note Assistant", time: "3h ago" }
        ];

        // Render Result
        apiResult.innerHTML = '';
        mockData.forEach((item, index) => {
          const colorClass = item.type === 'push' ? '#00f260' : (item.type === 'merge' ? '#0575e6' : '#f5576c');
          const iconClass = item.type === 'push' ? 'fa-code-branch' : (item.type === 'merge' ? 'fa-code-merge' : 'fa-star');

          const itemHtml = `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--border-glass, rgba(255,255,255,0.1)); opacity: 0; animation: fadeInUp 0.5s ease forwards ${index * 0.1}s;">
              <div style="color: ${colorClass}; min-width: 24px;">
                <i class="fas ${iconClass}"></i>
              </div>
              <div style="flex-grow: 1;">
                <div style="font-weight: 600; color: #fff;">${item.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary, #aaa);">${item.repo}</div>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted, #888);">${item.time}</div>
            </div>
          `;
          apiResult.innerHTML += itemHtml;
        });

        // Restore Button
        fetchBtn.disabled = false;
        fetchBtn.innerHTML = originalText;
      });
  }


  // --- 4. Contact Form Handler ---
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = 'Sending...';

        // Simulate send
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
          btn.style.background = 'var(--gradient-primary, linear-gradient(to right, #00f260, #0575e6))';

          setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            contactForm.reset();
            // Reset background if needed, though usually class handles it
            btn.style.background = '';
          }, 3000);
        }, 1500);
      });
  }

  // --- 5. Glass Card Hover Effect (Bonus) ---
  const cards = document.querySelectorAll('.glass-card');
  if (cards.length > 0) {
      document.body.addEventListener('mousemove', (e) => {
          cards.forEach(card => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);
          });
      });
  }
});
