document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    // Initial check
    updateNavbar();

    // 2. Counter Animation
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

    // 3. Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btns .btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update Active UI
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = ''; // Reset display to CSS default (e.g., block/flex)
                    // Add fade-in animation logic if desired, or simpler CSS transition
                    item.style.opacity = '0';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Mobile Filter
    const mobileFilter = document.getElementById('mobile-filter');
    if (mobileFilter) {
        mobileFilter.addEventListener('change', (e) => {
            const filter = e.target.value;
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 4. Mock API Fetch
    const fetchBtn = document.getElementById('btn-fetch');
    if (fetchBtn) {
        fetchBtn.addEventListener('click', () => {
            const icon = document.getElementById('fetch-icon');
            const text = document.getElementById('btn-text');
            const result = document.getElementById('api-result');

            // UI Loading State
            fetchBtn.disabled = true;
            icon.classList.add('fa-spin');
            text.innerText = 'Syncing...';
            
            // Simulate Network Delay
            setTimeout(() => {
                const mockData = [
                    { type: 'push', title: "feat: 新增歌詞同步顯示功能", repo: "Pulse Music Player", time: "2小時前" },
                    { type: 'merge', title: "fix: 修復 Shorts 隱藏失效的問題", repo: "YouTube Cleaner", time: "昨天" },
                    { type: 'star', title: "docs: 更新 API 整合文件", repo: "AI Note Assistant", time: "3天前" }
                ];

                result.innerHTML = '';
                mockData.forEach((item, index) => {
                    const iconClass = item.type === 'push' ? 'fa-code-branch' : (item.type === 'merge' ? 'fa-code-merge' : 'fa-file-alt');
                    const colorClass = item.type === 'push' ? 'text-success' : (item.type === 'merge' ? 'text-primary' : 'text-info');
                    
                    const div = document.createElement('div');
                    div.className = 'd-flex align-items-center mb-3 p-3 rounded-3 animate__animated animate__fadeInRight';
                    div.style.background = 'rgba(255,255,255,0.08)';
                    div.style.animationDelay = `${index * 0.1}s`;
                    
                    // Note: Bootstrap classes d-flex, align-items-center etc need to be present or defined in CSS
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

                // Restore UI
                fetchBtn.disabled = false;
                icon.classList.remove('fa-spin');
                text.innerText = '再次同步';
            }, 1200);
        });
    }

    // 5. Contact Form Validation
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
                btn.innerText = 'Sending...';
                
                setTimeout(() => {
                    btn.innerText = 'Message Sent!';
                    btn.classList.add('btn-success');
                    btn.classList.remove('btn-primary-glow');
                    
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerText = originalText;
                        btn.classList.remove('btn-success');
                        btn.classList.add('btn-primary-glow');
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                    }, 3000);
                }, 1500);
            }
            
            contactForm.classList.add('was-validated');
        });

        // Input Validation Feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                }
            });
        });
    }
});
