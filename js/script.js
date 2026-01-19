document.addEventListener('DOMContentLoaded', () => {
    
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

    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    let counted = false;
    const statsBox = document.querySelector('.hero-stats-box');
    
    if (statsBox) {
        window.addEventListener('scroll', () => {
            const oTop = statsBox.offsetTop - window.innerHeight;
            if (!counted && window.scrollY > oTop) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000;
                    const interval = 20;
                    const step = target / (duration / interval);
                    
                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            counter.innerText = target + "+";
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.ceil(count);
                        }
                    }, interval);
                });
                counted = true;
            }
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btns .btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                const parent = item.closest('.bento-item');
                const target = parent || item;

                if (filter === 'all' || item.classList.contains(filter)) {
                    target.style.display = ''; 
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(10px)';
                    target.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    target.style.display = 'none';
                }
            });
        });
    });

    const fetchBtn = document.getElementById('btn-fetch');
    if (fetchBtn) {
        fetchBtn.addEventListener('click', () => {
            const icon = document.getElementById('fetch-icon');
            const text = document.getElementById('btn-text');
            const result = document.getElementById('api-result');

            fetchBtn.disabled = true;
            icon.classList.add('fa-spin');
            text.innerText = 'Syncing...';
            
            setTimeout(() => {
                const mockData = [
                    { type: 'push', title: "feat: Added Bento Grid Layout", repo: "Portfolio", time: "Just now" },
                    { type: 'merge', title: "fix: Mobile responsive issues", repo: "Pulse Player", time: "2h ago" },
                    { type: 'star', title: "docs: Updated README.md", repo: "DevOps Core", time: "5h ago" }
                ];

                result.innerHTML = '';
                mockData.forEach((item, index) => {
                    const iconClass = item.type === 'push' ? 'fa-code-branch' : (item.type === 'merge' ? 'fa-code-merge' : 'fa-file-alt');
                    const colorClass = item.type === 'push' ? 'text-success' : (item.type === 'merge' ? 'text-primary' : 'text-info');
                    
                    const div = document.createElement('div');
                    div.className = 'd-flex align-items-center mb-3 p-3 rounded-3 animate__animated animate__fadeInRight';
                    div.style.background = 'rgba(255,255,255,0.03)';
                    div.style.border = '1px solid var(--border-color)';
                    div.style.animationDelay = `${index * 0.1}s`;
                    
                    div.innerHTML = `
                        <div class="me-3 ${colorClass}">
                            <i class="fas ${iconClass} fa-lg"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-0 fw-bold text-white">${item.title}</h6>
                            <small class="text-muted">${item.repo}</small>
                        </div>
                        <small class="text-muted">${item.time}</small>
                    `;
                    result.appendChild(div);
                });

                fetchBtn.disabled = false;
                icon.classList.remove('fa-spin');
                text.innerText = 'Sync Activity';
            }, 1000);
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
            } else {
                const btn = document.getElementById('submit-btn');
                const originalText = btn.innerText;
                
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent';
                    btn.style.background = '#4ade80';
                    btn.style.color = '#000';
                    
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerText = originalText;
                        btn.style.background = '';
                        btn.style.color = '';
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                    }, 3000);
                }, 1500);
            }
            
            contactForm.classList.add('was-validated');
        });
    }
});
