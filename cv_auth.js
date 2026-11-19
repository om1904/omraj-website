// ========================================================
// Curriculum Vitae Security Gate (PIN: 1919)
// ========================================================
(function() {
    const CV_PIN = "1919";

    function isAuthorized() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('auth') === CV_PIN || params.get('export') === 'true') {
            return true;
        }
        return sessionStorage.getItem('cv_unlocked_pin') === CV_PIN;
    }

    function initSecurityGate() {
        if (isAuthorized()) {
            unlockCvView(false);
            return;
        }

        // Lock the page
        document.documentElement.classList.add('cv-locked-init');
        document.body.classList.add('cv-locked');

        // Check if overlay already exists
        if (!document.getElementById('cv-lock-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'cv-lock-overlay';
            overlay.className = 'cv-lock-overlay';
            overlay.innerHTML = `
                <div class="cv-lock-card">
                    <div class="cv-lock-icon" id="cv-lock-icon-el">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <h2 class="cv-lock-title">Protected Curriculum Vitae</h2>
                    <p class="cv-lock-subtitle">This document contains verified academic and research credentials for Om Raj. Please enter the access password (PIN) to view and print.</p>
                    <form id="cv-password-form" class="cv-lock-form">
                        <div class="cv-input-wrapper">
                            <i class="fa-solid fa-key cv-input-icon"></i>
                            <input type="password" id="cv-password-input" class="cv-password-input" placeholder="••••" maxlength="10" autofocus required autocomplete="off">
                        </div>
                        <button type="submit" id="cv-unlock-btn" class="cv-unlock-btn">
                            <span>Unlock Document</span> <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <div id="cv-error-msg" class="cv-error-msg">Incorrect password. Please enter the valid PIN to view.</div>
                    </form>
                    <div class="cv-lock-footer">
                        <a href="index.html" class="cv-back-link"><i class="fa-solid fa-house"></i> Return to Portfolio</a>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            const form = document.getElementById('cv-password-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleUnlockAttempt();
            });
        }

        const input = document.getElementById('cv-password-input');
        if (input) {
            setTimeout(() => input.focus(), 150);
        }
    }

    function handleUnlockAttempt() {
        const input = document.getElementById('cv-password-input');
        const errorMsg = document.getElementById('cv-error-msg');
        const lockIcon = document.getElementById('cv-lock-icon-el');
        const unlockBtn = document.getElementById('cv-unlock-btn');

        if (!input) return;

        if (input.value.trim() === CV_PIN) {
            if (errorMsg) errorMsg.style.display = 'none';
            input.classList.remove('input-error');
            if (lockIcon) {
                lockIcon.innerHTML = '<i class="fa-solid fa-lock-open"></i>';
                lockIcon.style.background = 'linear-gradient(135deg, rgba(5, 150, 105, 0.25) 0%, rgba(16, 185, 129, 0.4) 100%)';
                lockIcon.style.color = '#059669';
            }
            if (unlockBtn) {
                unlockBtn.innerHTML = '<span>Access Granted!</span> <i class="fa-solid fa-check"></i>';
                unlockBtn.style.background = '#059669';
            }
            sessionStorage.setItem('cv_unlocked_pin', CV_PIN);
            setTimeout(() => {
                unlockCvView(true);
            }, 300);
        } else {
            if (errorMsg) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Incorrect password. Please enter the valid PIN.';
            }
            input.classList.add('input-error');
            input.value = '';
            input.focus();
            setTimeout(() => {
                input.classList.remove('input-error');
            }, 800);
        }
    }

    function unlockCvView(animated) {
        document.documentElement.classList.remove('cv-locked-init');
        document.body.classList.remove('cv-locked');
        const overlay = document.getElementById('cv-lock-overlay');
        if (overlay) {
            overlay.classList.add('unlocked');
            if (animated) {
                setTimeout(() => overlay.remove(), 400);
            } else {
                overlay.remove();
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurityGate);
    } else {
        initSecurityGate();
    }
})();
