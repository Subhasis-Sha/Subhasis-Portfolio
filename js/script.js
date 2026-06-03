/**
 * Subhasis Sha - Portfolio Interactive Engine
 * 
 * Features:
 * 1. Dynamic Dark/Light Mode Theme Switcher with local persistence.
 * 2. Responsive Vanta.js Net background mesh syncing with current theme values.
 * 3. Collapsible vertical dashboard sidebars with navigation state preservation.
 */

let vantaEffect;

/**
 * Initializes or updates the Vanta.js dynamic net canvas background.
 * Matches mesh and background colors to current theme configuration.
 */
function initVanta() {
    if (typeof VANTA !== "undefined" && document.getElementById("vantajs")) {
        const isLight = document.documentElement.getAttribute("data-bs-theme") === "light";
        if (vantaEffect) vantaEffect.destroy();
        vantaEffect = VANTA.NET({
            el: "#vantajs",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: isLight ? 0x0066cc : 0x00ffff,
            backgroundColor: isLight ? 0xf8fafc : 0x050816,
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00
        });
    }
}

/**
 * Sets the website theme configuration globally and stores preference.
 * @param {string} theme - 'dark' | 'light'
 */
function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute("data-bs-theme", theme);
    
    const icon = document.getElementById("themeIcon");
    if (icon) {
        if (theme === "light") {
            icon.classList.replace("fa-toggle-off", "fa-toggle-on");
        } else {
            icon.classList.replace("fa-toggle-on", "fa-toggle-off");
        }
    }
    
    localStorage.setItem("portfolio-theme", theme);
    initVanta();
}

// Initialise Theme State
const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

// Theme Toggle Click Handler
const btn = document.getElementById("themeBtn");
if (btn) {
    btn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });
}

/**
 * Handles toggling, layout resizing, and caching sidebar collapsed state.
 * @param {boolean} isCollapsed 
 */
function applySidebarState(isCollapsed) {
    if (isCollapsed) {
        document.body.classList.add("sidebar-collapsed");
    } else {
        document.body.classList.remove("sidebar-collapsed");
    }
    const toggleIcon = document.getElementById("toggleIcon");
    if (toggleIcon) {
        toggleIcon.className = isCollapsed ? "fa-solid fa-angle-right" : "fa-solid fa-angle-left";
    }
    localStorage.setItem("portfolio-sidebar-collapsed", isCollapsed);
}

// Initialise Sidebar State
const savedSidebarState = localStorage.getItem("portfolio-sidebar-collapsed") === "true";
applySidebarState(savedSidebarState);

// Sidebar Collapse Click Handler
const toggleBtn = document.getElementById("sidebarToggle");
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        const isCollapsed = !document.body.classList.contains("sidebar-collapsed");
        applySidebarState(isCollapsed);
    });
}
