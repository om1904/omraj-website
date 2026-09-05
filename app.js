// Theme Toggle & Multi-Page Active Link Handler
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Default to 'light' theme
    const savedTheme = localStorage.getItem('omraj-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('omraj-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }

    // Highlight current active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.toggle('active');
}

// Copy Citation Helper
function copyCitation(citationId) {
    const citationElem = document.getElementById(citationId);
    if (!citationElem) return;

    const textToCopy = citationElem.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Citation copied to clipboard!\n\n' + textToCopy);
    }).catch(err => {
        console.error('Failed to copy citation:', err);
    });
}

// Interactive Water Quality & BOD/COD Calculator
function calculateWQI() {
    const pHInput = document.getElementById('pHVal');
    if (!pHInput) return;

    const pH = parseFloat(pHInput.value) || 7.0;
    const DO = parseFloat(document.getElementById('doVal').value) || 6.0;
    const BOD = parseFloat(document.getElementById('bodVal').value) || 10;
    const COD = parseFloat(document.getElementById('codVal').value) || 30;
    const TDS = parseFloat(document.getElementById('tdsVal').value) || 300;

    // Calculate BOD/COD Ratio
    const ratio = (COD > 0) ? (BOD / COD).toFixed(2) : 0;
    document.getElementById('resRatio').innerText = ratio;

    // Evaluate Biodegradability
    let bioStatus = "";
    if (ratio > 0.5) {
        bioStatus = "Highly Biodegradable (Untreated Waste / Raw Domestic Sewage)";
    } else if (ratio >= 0.2 && ratio <= 0.5) {
        bioStatus = "Moderately Biodegradable (Treated / Mixed Effluent)";
    } else {
        bioStatus = "Non-Biodegradable / Recalcitrant Industrial Waste";
    }
    document.getElementById('resBio').innerText = bioStatus;

    // Assess CPCB Ganga Compliance
    let cpcbStatus = "";
    let statusClass = "text-success";
    if (pH >= 6.5 && pH <= 8.5 && DO >= 5.0 && BOD <= 3.0) {
        cpcbStatus = "Class A - Drinking Water Source without conventional treatment";
        statusClass = "text-success";
    } else if (pH >= 6.5 && pH <= 8.5 && DO >= 4.0 && BOD <= 6.0) {
        cpcbStatus = "Class B/C - Outdoor Bathing & Conventional Treatment Compliance";
        statusClass = "text-success";
    } else if (DO >= 4.0 && BOD <= 30) {
        cpcbStatus = "Class D/E - Fish Culture & Controlled Industrial Discharge";
        statusClass = "text-warning";
    } else {
        cpcbStatus = "Non-Compliant (Requires Advanced CETP/ETP Biological Treatment)";
        statusClass = "text-accent";
    }

    const resStatusElem = document.getElementById('resStatus');
    resStatusElem.innerText = cpcbStatus;
    resStatusElem.className = `res-value ${statusClass}`;

    document.getElementById('resDesc').innerHTML = `
        <strong>Analysis Summary:</strong> Sample pH (${pH}), DO (${DO} mg/L), BOD (${BOD} mg/L), COD (${COD} mg/L), TDS (${TDS} mg/L). 
        BOD/COD Ratio of <strong>${ratio}</strong> indicates <em>${bioStatus}</em>.
    `;
}

// SNIFF DOI Research Gap Simulator
function runSniffSim() {
    const queryInput = document.getElementById('searchQuery');
    if (!queryInput) return;

    const query = queryInput.value || 'Biochar wastewater';
    const cslFormat = document.getElementById('cslFormat').value;

    const formattedCitElem = document.getElementById('formattedCit');

    let citationText = "";
    if (cslFormat === 'APA 7th') {
        citationText = `Raj, O., Dhada, I., & Mustafa, M. (2026). Multi-parameter assessment of ${query}. Environmental Science & Technology, 60(4), 1420-1435.`;
    } else if (cslFormat === 'IEEE') {
        citationText = `[1] O. Raj, I. Dhada, and M. Mustafa, "Multi-parameter assessment of ${query}," Environ. Sci. Technol., vol. 60, no. 4, pp. 1420-1435, 2026.`;
    } else if (cslFormat === 'Harvard') {
        citationText = `Raj, O., Dhada, I. and Mustafa, M., 2026. Multi-parameter assessment of ${query}. Environmental Science & Technology, 60(4), pp.1420-1435.`;
    } else {
        citationText = `@article{raj2026sniff,\n  author = {Raj, Om and Dhada, Indramani and Mustafa, Mohammad},\n  title = {Multi-parameter assessment of ${query}},\n  journal = {Environmental Science & Technology},\n  year = {2026}\n}`;
    }

    formattedCitElem.innerText = citationText;
}

// Laboratory Skills Search & Category Filter
function filterSkills() {
    const searchInput = document.getElementById('skillSearch');
    if (!searchInput) return;
    const input = searchInput.value.toLowerCase();
    const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

    skillCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCategory(category, btnElement) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const skillCards = document.querySelectorAll('#skillsGrid .skill-card');
    skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact Modal & Direct Email Redirect Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.add('active');
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('active');
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('msgSubject').value;
    const content = document.getElementById('msgContent').value;

    const mailtoUrl = `mailto:omraj.student@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nInquiry Message:\n" + content)}`;
    
    window.location.href = mailtoUrl;
    closeContactModal();
}
