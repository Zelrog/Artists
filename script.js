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
    fa:      { iconHTML: '<i class="fa-solid fa-paw"></i>', label: "FurAffinity" },
    e621:    { iconHTML: '<span style="font-family: sans-serif; font-weight: 900; font-size: 0.75em;">e621</span>', label: "e621" },
    bluesky: { 
        iconHTML: '<svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M111.8 62.2C170.2 105.9 233.3 194.7 256 242.4c22.7-47.7 85.8-136.5 144.2-180.2c41.6-31.6 108.3-48.2 111.8-6.1c.1 1.6 0 3.3 0 5c-5.1 82.6-23.7 190.5-28.7 212.1c-11.8 51.1-55.8 64.1-99.7 55.9c-32.6-6-77-23.3-106.9-37.1c89.4 59.8 82.5 138.2 13.3 172.7c-59.8 29.8-103.4-16-116.7-41.6c-10.4-20-16.6-58.1-16.6-58.1s-6.2 38.1-16.6 58.1c-13.3 25.6-56.9 71.4-116.7 41.6c-69.2-34.5-76.1-112.9 13.3-172.7c-29.9 13.8-74.3 31.1-106.9 37.1c-43.9 8.2-87.9-4.8-99.7-55.9c-5-21.6-23.6-129.5-28.7-212.1c0-1.7-.1-3.4 0-5c3.5-42.1 70.2-25.5 111.8 6.1z"/></svg>', 
        label: "Bluesky" 
    },
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
