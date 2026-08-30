// --- 1. YOUR ARTIST DATABASE ---
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

// Map platforms to their raw HTML icons and display names
const platformMap = {
    fa:      { iconHTML: '<span class="icon-fa"></span>', label: "FurAffinity" },
    e621:    { iconHTML: '<span class="icon-e621"></span>', label: "e621" },
    bluesky: { iconHTML: '<span class="icon-bluesky"></span>', label: "Bluesky" },
    twitter: { iconHTML: '<i class="fa-brands fa-twitter"></i>', label: "Twitter" },
    pixiv:   { iconHTML: '<span class="icon-pixiv"></span>', label: "Pixiv" }
};

// --- 2. RENDERING LOGIC ---
const grid = document.getElementById('artistGrid');
const filters = document.querySelectorAll('.filter-btn');
const sidePanel = document.getElementById('sidePanel');
const panelOverlay = document.getElementById('panelOverlay');
const closePanelBtn = document.getElementById('closePanel');
const panelContent = document.getElementById('panelContent');

function renderArtists(filterPlatform) {
    grid.innerHTML = ""; 
    
    artists.forEach(artist => {
        if (filterPlatform !== "all" && !artist.socials[filterPlatform]) {
            return; 
        }

        // Build the preview icons for the card (using iconHTML now)
        let previewIconsHTML = "";
        for (let platform in artist.socials) {
            if (platformMap[platform]) {
                previewIconsHTML += platformMap[platform].iconHTML;
            }
        }

        const card = document.createElement('div');
        card.className = "artist-card";
        card.innerHTML = `
            <h3>${artist.name}</h3>
            <div class="preview-icons">${previewIconsHTML}</div>
        `;
        
        card.addEventListener('click', () => openSidePanel(artist));
        grid.appendChild(card);
    });
}

// --- 3. FILTER LOGIC ---
filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filters.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderArtists(e.currentTarget.dataset.platform);
    });
});

// --- 4. SLIDING PANEL LOGIC ---
function openSidePanel(artist) {
    let linksHTML = "";
    for (let [platform, url] of Object.entries(artist.socials)) {
        if(platformMap[platform]) {
            linksHTML += `
                <a href="${url}" target="_blank" class="social-link">
                    ${platformMap[platform].iconHTML} 
                    ${platformMap[platform].label}
                </a>
            `;
        }
    }

    const aliasesHTML = artist.aliases.length > 0 
        ? `<div class="aliases">Also known as: ${artist.aliases.join(', ')}</div>` 
        : "";

    const imgName = artist.name.replace(/\s+/g, '');
    const imgSrc = `images/${imgName}.${artist.imageExt || 'jpg'}`;

    panelContent.innerHTML = `
        <img src="${imgSrc}" alt="${artist.name}" class="panel-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        <h2 class="title-font">${artist.name}</h2>
        ${aliasesHTML}
        <div class="social-links">
            ${linksHTML}
        </div>
    `;

    sidePanel.classList.add('open');
    panelOverlay.classList.add('active');
}

function closeSidePanel() {
    sidePanel.classList.remove('open');
    panelOverlay.classList.remove('active');
}

closePanelBtn.addEventListener('click', closeSidePanel);
panelOverlay.addEventListener('click', closeSidePanel);

// Init
renderArtists("all");
