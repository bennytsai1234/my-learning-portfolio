$(document).ready(function() {
    
    // 1. Navbar Scroll Effect (導航列滾動特效)
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').css('background', 'rgba(15, 23, 42, 0.95)');
            $('.navbar').css('padding', '0.5rem 0');
        } else {
            $('.navbar').css('background', 'rgba(15, 23, 42, 0.8)');
            $('.navbar').css('padding', '1rem 0');
        }
    });

    // 2. Counter Animation (數字跑馬燈)
    var counted = false;
    $(window).scroll(function() {
        var oTop = $('.hero-stats-box').offset().top - window.innerHeight;
        if (counted == false && $(window).scrollTop() > oTop) {
            $('.counter').each(function() {
                var $this = $(this);
                var target = parseInt($this.data('target'));
                $({ countNum: $this.text() }).animate({
                    countNum: target
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum + "+");
                    }
                });
            });
            counted = true;
        }
    });

    // 3. Portfolio Filter (作品集過濾)
    $('.filter-btns .btn').click(function() {
        var filter = $(this).data('filter');
        
        // Update Active UI
        $('.filter-btns .btn').removeClass('active');
        $(this).addClass('active');

        if (filter === 'all') {
            $('.portfolio-item').fadeIn(400);
        } else {
            $('.portfolio-item').each(function() {
                if ($(this).hasClass(filter)) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(400);
                }
            });
        }
    });

    // Mobile Filter
    $('#mobile-filter').change(function() {
        var filter = $(this).val();
        if (filter === 'all') {
            $('.portfolio-item').fadeIn(400);
        } else {
            $('.portfolio-item').each(function() {
                if ($(this).hasClass(filter)) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(400);
                }
            });
        }
    });

    // 4. Mock API Fetch (模擬數據抓取)
    $('#btn-fetch').click(function() {
        var $btn = $(this);
        var $icon = $('#fetch-icon');
        var $text = $('#btn-text');
        var $result = $('#api-result');

        // UI Loading State
        $btn.prop('disabled', true);
        $icon.addClass('fa-spin');
        $text.text('Syncing...');
        
        // Simulate Network Delay
        setTimeout(function() {
            var mockData = [
                { type: 'push', title: "feat: 新增歌詞同步顯示功能", repo: "Pulse Music Player", time: "2小時前" },
                { type: 'merge', title: "fix: 修復 Shorts 隱藏失效的問題", repo: "YouTube Cleaner", time: "昨天" },
                { type: 'star', title: "docs: 更新 API 整合文件", repo: "AI Note Assistant", time: "3天前" }
            ];

            $result.empty();
            mockData.forEach(function(item, index) {
                var iconClass = item.type === 'push' ? 'fa-code-branch' : (item.type === 'merge' ? 'fa-code-merge' : 'fa-file-alt');
                var colorClass = item.type === 'push' ? 'text-success' : (item.type === 'merge' ? 'text-primary' : 'text-info');
                
                var html = `
                    <div class="d-flex align-items-center mb-3 p-3 rounded-3 animate__animated animate__fadeInRight" style="background: rgba(255,255,255,0.08); animation-delay: ${index * 0.1}s">
                        <div class="me-3 ${colorClass}">
                            <i class="fas ${iconClass} fa-lg"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-0 fw-bold text-white">${item.title}</h6>
                            <small class="text-muted">${item.repo}</small>
                        </div>
                        <small class="text-muted">${item.time}</small>
                    </div>
                `;
                $result.append(html);
            });

            // Restore UI
            $btn.prop('disabled', false);
            $icon.removeClass('fa-spin');
            $text.text('再次同步');
        }, 1200);
    });

    // 5. Contact Form Validation
    $('#contact-form').on('submit', function(event) {
        var form = this;
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            var $btn = $('#submit-btn');
            var originalText = $btn.text();
            
            $btn.prop('disabled', true).text('Sending...');
            
            setTimeout(function() {
                $btn.text('Message Sent!').addClass('btn-success').removeClass('btn-primary-glow');
                setTimeout(() => {
                    $btn.prop('disabled', false).text(originalText).removeClass('btn-success').addClass('btn-primary-glow');
                    form.reset();
                    $(form).removeClass('was-validated');
                }, 3000);
            }, 1500);
        }
        $(form).addClass('was-validated');
    });

    // Input Validation Feedback
    $('#contact-form input, #contact-form textarea').on('input', function() {
        if (this.checkValidity()) {
            $(this).addClass('is-valid').removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid').removeClass('is-valid');
        }
    });

});