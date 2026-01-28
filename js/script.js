// [教學] DOMContentLoaded 事件：
// 確保 HTML 結構都已經載入完成了，才開始執行 JS。
// 如果不加這個，JS 可能會找不到還沒出生的 HTML 元素。
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 滑鼠跟隨的光暈效果 (Glassmorphism Hover Effect)
    // ==========================================
    const cards = document.querySelectorAll('.glass-card');
    
    if (cards.length > 0) {
        // 監聽整個網頁的滑鼠移動
        document.body.addEventListener('mousemove', (e) => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect(); // 取得這張卡片的位置與大小
                const x = e.clientX - rect.left; // 計算滑鼠相對於卡片左上角的 X 座標
                const y = e.clientY - rect.top;  // 計算滑鼠相對於卡片左上角的 Y 座標
                
                // 將計算結果存入 CSS 變數 (--mouse-x, --mouse-y)
                // 這樣 CSS 裡的 radial-gradient 就能讀到滑鼠位置了！
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // ==========================================
    // 2. 導覽列滾動變色 (Navbar Scroll Effect)
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        // window.scrollY 代表使用者往下滾動了多少像素
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // 加上 .scrolled class (變深色背景)
        } else {
            navbar.classList.remove('scrolled'); // 移除 (變回透明背景)
        }
    }
    
    // 監聽滾動事件
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // 一開始先執行一次，防止重新整理時狀態不對

    // ==========================================
    // 3. 數字跑動動畫 (Number Counter Animation)
    // ==========================================
    let counted = false; //用來確保動畫只執行一次
    const statsBox = document.querySelector('.hero-stats-box');
    
    if (statsBox) {
        window.addEventListener('scroll', () => {
            // 計算是否滾動到統計區塊的位置
            const oTop = statsBox.offsetTop - window.innerHeight;
            if (!counted && window.scrollY > oTop) {
                const counters = document.querySelectorAll('.counter');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target')); // 讀取 HTML 裡的 data-target="500"
                    let count = 0;
                    const duration = 2000; // 動畫總時間 2000ms (2秒)
                    const interval = 20;   // 每 20ms 更新一次
                    const step = target / (duration / interval); // 計算每次加多少
                    
                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            counter.innerText = target + "+";
                            clearInterval(timer); // 停止計時器
                        } else {
                            counter.innerText = Math.ceil(count); // Math.ceil 無條件進位
                        }
                    }, interval);
                });
                counted = true;
            }
        });
    }

    // ==========================================
    // 4. 作品集篩選功能 (Portfolio Filter)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btns .btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 取得按鈕上的 data-filter 屬性 (all, app, tool)
            const filter = btn.getAttribute('data-filter');
            
            // 處理按鈕樣式：移除所有 active，只給當前按鈕加上 active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 處理卡片顯示/隱藏
            portfolioItems.forEach(item => {
                // 找到最近的 .bento-item 父元素 (因為我們要隱藏整個格子)
                const parent = item.closest('.bento-item');
                const target = parent || item;

                if (filter === 'all' || item.classList.contains(filter)) {
                    // 顯示元素
                    target.style.display = ''; 
                    
                    // 簡單的進場動畫
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(10px)';
                    target.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // 隱藏元素
                    target.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 5. 模擬 API 資料同步 (Mock API Fetch)
    // ==========================================
    const fetchBtn = document.getElementById('btn-fetch');
    if (fetchBtn) {
        fetchBtn.addEventListener('click', () => {
            const icon = document.getElementById('fetch-icon');
            const text = document.getElementById('btn-text');
            const result = document.getElementById('api-result');

            // 鎖定按鈕，防止重複點擊
            fetchBtn.disabled = true;
            icon.classList.add('fa-spin'); // 讓圖示旋轉
            text.innerText = 'Syncing...';
            
            // setTimeout 模擬網路延遲 (1秒)
            setTimeout(() => {
                // 假資料 (Mock Data)
                const mockData = [
                    { type: 'push', title: "feat: Added Bento Grid Layout", repo: "Portfolio", time: "Just now" },
                    { type: 'merge', title: "fix: Mobile responsive issues", repo: "Pulse Player", time: "2h ago" },
                    { type: 'star', title: "docs: Updated README.md", repo: "DevOps Core", time: "5h ago" }
                ];

                // 清空舊內容
                result.innerHTML = '';
                
                // 將資料動態產生 HTML 塞回去
                mockData.forEach((item, index) => {
                    const iconClass = item.type === 'push' ? 'fa-code-branch' : (item.type === 'merge' ? 'fa-code-merge' : 'fa-file-alt');
                    const colorClass = item.type === 'push' ? 'text-success' : (item.type === 'merge' ? 'text-primary' : 'text-info');
                    
                    const div = document.createElement('div');
                    // 使用 Bootstrap class 加上自定義動畫 class
                    div.className = 'd-flex align-items-center mb-3 p-3 rounded-3 animate__animated animate__fadeInRight';
                    div.style.background = 'rgba(255,255,255,0.03)';
                    div.style.border = '1px solid var(--border-color)';
                    div.style.animationDelay = `${index * 0.1}s`; // 讓動畫依序出現
                    
                    // 樣板字串 (Template Literals) `${}` 讓我們能方便地插入變數
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

                // 恢復按鈕狀態
                fetchBtn.disabled = false;
                icon.classList.remove('fa-spin');
                text.innerText = 'Sync Activity';
            }, 1000);
        });
    }

    // ==========================================
    // 6. 表單驗證與發送模擬 (Contact Form)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // 阻止瀏覽器預設的表單送出行為 (避免換頁)
            
            // checkValidity() 是 HTML5 內建的驗證方法
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
            } else {
                const btn = document.getElementById('submit-btn');
                const originalText = btn.innerText;
                
                // 改變按鈕狀態，給使用者回饋
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // 模擬發送請求 (1.5秒後成功)
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent';
                    btn.style.background = '#4ade80';
                    btn.style.color = '#000';
                    
                    // 3秒後重置表單
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
            
            // 加上這行會讓 CSS 顯示驗證錯誤樣式 (紅色外框等)
            contactForm.classList.add('was-validated');
        });
    }
});
