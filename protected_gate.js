/**
 * ========================================================
 * Protected Drive Vault - Two-Factor Security Gate
 * Password: Om@1919# -> Thereafter PIN: 1919
 * Target: https://drive.google.com/drive/folders/1Oy5R4jPU0cURaML56XtarmWEQ1s9eMtB?usp=sharing
 * ========================================================
 */

(function () {
    const MASTER_PASS = "Om@1919#";
    const SECURITY_PIN = "1919";
    const VAULT_URL = "https://drive.google.com/drive/folders/1Oy5R4jPU0cURaML56XtarmWEQ1s9eMtB?usp=sharing";

    let step1Passed = false;

    // Inject Floating Button if not present
    function injectCornerButton() {
        if (!document.getElementById('protectedCornerBtn')) {
            const btn = document.createElement('button');
            btn.id = 'protectedCornerBtn';
            btn.className = 'protected-corner-btn';
            btn.setAttribute('type', 'button');
            btn.setAttribute('aria-label', 'Open Protected Drive Vault');
            btn.innerHTML = `
                <span class="shield-icon"><i class="fa-solid fa-shield-halved"></i></span>
                <span class="btn-text">Protected</span>
                <span class="pulse-ring"></span>
            `;
            document.body.appendChild(btn);

            btn.addEventListener('click', openModal);
        }
    }

    // Inject Modal if not present
    function injectModal() {
        if (!document.getElementById('protectedVaultModal')) {
            const modal = document.createElement('div');
            modal.id = 'protectedVaultModal';
            modal.className = 'protected-modal-overlay';
            modal.innerHTML = `
                <div class="protected-modal-card" id="protectedModalCard">
                    <button class="protected-modal-close" id="protectedCloseBtn" aria-label="Close Modal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="protected-header">
                        <div class="protected-vault-icon" id="protectedVaultIcon">
                            <i class="fa-solid fa-lock"></i>
                        </div>
                        <h2 class="protected-title">Protected Drive Vault</h2>
                        <p class="protected-subtitle">Restricted Repository for Om Raj. Complete two-factor authentication to access.</p>
                    </div>

                    <!-- Steps Progress -->
                    <div class="protected-steps">
                        <span class="protected-step-pill active" id="pillStep1"><i class="fa-solid fa-key"></i> 1. Password</span>
                        <span class="protected-step-divider"></span>
                        <span class="protected-step-pill" id="pillStep2"><i class="fa-solid fa-hashtag"></i> 2. PIN</span>
                    </div>

                    <!-- Step 1: Master Password Form -->
                    <form id="protectedStep1Form" class="protected-step-view active" autocomplete="off">
                        <div class="protected-field-group">
                            <label class="protected-label" for="protectedPasswordInput">Step 1: Enter Master Password</label>
                            <div class="protected-input-wrapper">
                                <i class="fa-solid fa-lock protected-input-icon"></i>
                                <input type="password" id="protectedPasswordInput" class="protected-input" placeholder="Enter Master Password" required autofocus autocomplete="new-password">
                            </div>
                            <div class="protected-error-text" id="protectedPassError">
                                <i class="fa-solid fa-circle-exclamation"></i> Incorrect Master Password. Please try again.
                            </div>
                        </div>
                        <button type="submit" class="protected-btn" id="protectedStep1Btn">
                            <span>Verify Password</span> <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>

                    <!-- Step 2: PIN Form -->
                    <form id="protectedStep2Form" class="protected-step-view" autocomplete="off">
                        <div class="protected-field-group">
                            <label class="protected-label" for="protectedPinInput">Step 2: Enter Security PIN</label>
                            <div class="protected-input-wrapper">
                                <i class="fa-solid fa-hashtag protected-input-icon"></i>
                                <input type="password" id="protectedPinInput" class="protected-input" placeholder="••••" maxlength="8" required autocomplete="off">
                            </div>
                            <div class="protected-error-text" id="protectedPinError">
                                <i class="fa-solid fa-circle-exclamation"></i> Invalid Security PIN. Access denied.
                            </div>
                        </div>
                        <button type="submit" class="protected-btn" id="protectedStep2Btn">
                            <span>Unlock & Open Drive</span> <i class="fa-solid fa-unlock"></i>
                        </button>
                    </form>

                    <!-- Success State -->
                    <div class="protected-success-view" id="protectedSuccessView">
                        <div class="protected-success-icon">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <h3 style="font-size: 1.35rem; color: #BEF264; margin-bottom: 0.5rem;">Access Granted!</h3>
                        <p style="color: #E2E8F0; font-size: 0.92rem; margin-bottom: 1rem;">Redirecting to your protected Google Drive folder...</p>
                        <a href="${VAULT_URL}" target="_blank" class="protected-redirect-link" id="protectedDirectLink">
                            <i class="fa-brands fa-google-drive"></i> Open Folder Directly
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Bind events
            document.getElementById('protectedCloseBtn').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Step 1 Form Handler
            document.getElementById('protectedStep1Form').addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('protectedPasswordInput');
                const err = document.getElementById('protectedPassError');
                
                if (input.value === MASTER_PASS) {
                    step1Passed = true;
                    input.classList.remove('error');
                    err.classList.remove('visible');

                    // Advance to Step 2
                    document.getElementById('pillStep1').classList.remove('active');
                    document.getElementById('pillStep1').classList.add('completed');
                    document.getElementById('pillStep1').innerHTML = '<i class="fa-solid fa-check"></i> 1. Verified';

                    document.getElementById('pillStep2').classList.add('active');

                    document.getElementById('protectedStep1Form').classList.remove('active');
                    document.getElementById('protectedStep2Form').classList.add('active');

                    const pinInput = document.getElementById('protectedPinInput');
                    pinInput.focus();
                } else {
                    input.classList.add('error');
                    err.classList.add('visible');
                    input.focus();
                    input.select();
                }
            });

            // Step 2 Form Handler
            document.getElementById('protectedStep2Form').addEventListener('submit', (e) => {
                e.preventDefault();
                const pinInput = document.getElementById('protectedPinInput');
                const pinErr = document.getElementById('protectedPinError');

                if (pinInput.value === SECURITY_PIN) {
                    pinInput.classList.remove('error');
                    pinErr.classList.remove('visible');

                    // Mark complete
                    document.getElementById('pillStep2').classList.remove('active');
                    document.getElementById('pillStep2').classList.add('completed');
                    document.getElementById('pillStep2').innerHTML = '<i class="fa-solid fa-check"></i> 2. Verified';

                    document.getElementById('protectedModalCard').classList.add('unlocked');
                    document.getElementById('protectedVaultIcon').innerHTML = '<i class="fa-solid fa-lock-open"></i>';

                    document.getElementById('protectedStep2Form').classList.remove('active');
                    document.getElementById('protectedSuccessView').classList.add('active');

                    sessionStorage.setItem('drive_vault_unlocked', 'true');

                    // Open Vault
                    setTimeout(() => {
                        window.open(VAULT_URL, '_blank');
                    }, 800);
                } else {
                    pinInput.classList.add('error');
                    pinErr.classList.add('visible');
                    pinInput.focus();
                    pinInput.select();
                }
            });

            // Keydown Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeModal();
            });
        }
    }

    function openModal() {
        const modal = document.getElementById('protectedVaultModal');
        if (!modal) return;

        // If already authenticated this session, direct open
        if (sessionStorage.getItem('drive_vault_unlocked') === 'true') {
            const confirmed = window.confirm("Protected Drive Vault is currently unlocked. Open Google Drive folder now?");
            if (confirmed) {
                window.open(VAULT_URL, '_blank');
                return;
            }
        }

        modal.classList.add('active');

        // Focus appropriate input
        setTimeout(() => {
            if (!step1Passed) {
                const passInput = document.getElementById('protectedPasswordInput');
                if (passInput) passInput.focus();
            } else {
                const pinInput = document.getElementById('protectedPinInput');
                if (pinInput) pinInput.focus();
            }
        }, 150);
    }

    function closeModal() {
        const modal = document.getElementById('protectedVaultModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Expose API globally
    window.openProtectedVault = openModal;
    window.closeProtectedVault = closeModal;

    // Initialize when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectCornerButton();
            injectModal();
        });
    } else {
        injectCornerButton();
        injectModal();
    }
})();
