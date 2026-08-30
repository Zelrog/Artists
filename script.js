// --- 1. YOUR ARTIST DATABASE ---
// Add your artists here. The script expects the image inside the /images/ folder 
// to match the exact name provided here (e.g., "KitsuneDraws.jpg"). 
const artists = [
    {
        name: "Chronobyte",
        aliases: ["oekanuki"],
        imageExt: "png",
        socials: {
            fa: "https://www.furaffinity.net/user/~chronobyte",
            bluesky: "https://bsky.app/profile/oekanuki.bsky.social"
        }
    },
    {
        name: "ArtistTwo",
        aliases: ["Test1", "Test2"],
        imageExt: "png", 
        socials: {
            fa: "https://furaffinity.net/user/artisttwo",
            telegram: "https://t.me/artisttwo_art"
        }
    }
];

// Map platforms to their FontAwesome icons and display names
const platformMap = {
    twitter: { icon: "fa-brands fa-x-twitter", label: "Twitter / X" },
    bluesky: { icon: "fa-brands fa-bluesky", label: "Bluesky" },
    pixiv:   { icon: "fa-solid fa-palette", label: "Pixiv" },
    fa:      { icon: "fa-solid fa-paw", label: "FurAffinity" },
    telegram:{ icon: "fa-brands fa-telegram", label: "Telegram" }
};

// --- 2. RENDERING LOGIC ---
const grid = document.getElementById('artistGrid');
const filters = document.querySelectorAll('.filter-btn');
const sidePanel = document.getElementById('sidePanel');
const panelOverlay = document.getElementById('panelOverlay');
const closePanelBtn = document.getElementById('closePanel');
const panelContent = document.getElementById('panelContent');

function renderArtists(filterPlatform) {
    grid.innerHTML = ""; // Clear grid
    
    artists.forEach(artist => {
        // Check if artist matches the current filter
        if (filterPlatform !== "all" && !artist.socials[filterPlatform]) {
            return; 
        }

        // Build the preview icons for the card
        let previewIconsHTML = "";
        for (let platform in artist.socials) {
            if (platformMap[platform]) {
                previewIconsHTML += `<i class="${platformMap[platform].icon}"></i>`;
            }
        }

        // Create the card
        const card = document.createElement('div');
        card.className = "artist-card";
        card.innerHTML = `
            <h3>${artist.name}</h3>
            <div class="preview-icons">${previewIconsHTML}</div>
        `;
        
        // Setup click event to open the panel
        card.addEventListener('click', () => openSidePanel(artist));
        grid.appendChild(card);
    });
}

// --- 3. FILTER LOGIC ---
filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filters.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.currentTarget.classList.add('active');
        
        // Re-render
        renderArtists(e.currentTarget.dataset.platform);
    });
});

// --- 4. SLIDING PANEL LOGIC ---
function openSidePanel(artist) {
    // Generate the links HTML
    let linksHTML = "";
    for (let [platform, url] of Object.entries(artist.socials)) {
        if(platformMap[platform]) {
            linksHTML += `
                <a href="${url}" target="_blank" class="social-link">
                    <i class="${platformMap[platform].icon}"></i> 
                    ${platformMap[platform].label}
                </a>
            `;
        }
    }

    // Combine Aliases
    const aliasesHTML = artist.aliases.length > 0 
        ? `<div class="aliases">Also known as: ${artist.aliases.join(', ')}</div>` 
        : "";

    // Image path matching exact name (removes spaces just in case)
    const imgName = artist.name.replace(/\s+/g, '');
    const imgSrc = `images/${imgName}.${artist.imageExt || 'jpg'}`;

    // Populate panel
    panelContent.innerHTML = `
        <img src="${imgSrc}" alt="${artist.name}" class="panel-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        <h2 class="title-font">${artist.name}</h2>
        ${aliasesHTML}
        <div class="social-links">
            ${linksHTML}
        </div>
    `;

    // Slide in
    sidePanel.classList.add('open');
    panelOverlay.classList.add('active');
}

function closeSidePanel() {
    sidePanel.classList.remove('open');
    panelOverlay.classList.remove('active');
}

closePanelBtn.addEventListener('click', closeSidePanel);
panelOverlay.addEventListener('click', closeSidePanel);

// Init rendering all on page load
renderArtists("all");
