const platformMap = {
    fa: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M4.688 7.854c-1.39 1.488-.95 3.73.98 5.006 1.93 1.277 4.61.948 6-.54 1.39-1.488.95-3.73-.98-5.007-1.93-1.276-4.61-.947-6 .541zm11.75 3.328c-.897.961-.613 2.408.632 3.232 1.246.824 2.976.612 3.873-.349.897-.96.613-2.407-.632-3.231-1.246-.824-2.976-.612-3.873.348zm-2.49-5.114c-.958 1.026-.654 2.57.675 3.45 1.33.88 3.178.653 4.136-.372.958-1.026.654-2.571-.675-3.451-1.33-.88-3.177-.654-4.136.373zm-5.61-4.195c-.886.949-.606 2.378.625 3.192 1.23.814 2.938.604 3.824-.345.886-.948.605-2.377-.626-3.191-1.23-.814-2.938-.605-3.823.344zM2.84 21.034c2.81 2.308 7.373 2.766 10.428-.507 2.05-2.196 2.324-5.32 1.139-7.794-.962-2.01-2.906-3.328-5.048-3.493-2.73-.21-5.466 1.054-7.07 3.398-1.897 2.772-1.815 6.438.551 8.396z"/></svg>`, 
        label: "FurAffinity" 
    },
    e621: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1.15em" height="1.15em"><defs><mask id="e6-mask-item"><rect width="24" height="24" fill="white" /><text x="12" y="14.6" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="6.8" text-anchor="middle" letter-spacing="-0.5" fill="black">e621</text></mask></defs><path d="M12 1L21.5 6.5v11L12 23 2.5 17.5v-11L12 1z" fill="currentColor" mask="url(#e6-mask-item)" /></svg>`, 
        label: "e621" 
    },
    bluesky: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.381.953 3.268 2.81 9.57 7.823 4.381 4.557-5.073 1.082-6.498-2.83-7.078-.139-.016-.277-.034-.415-.056.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>`, 
        label: "Bluesky" 
    },
    twitter: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/></svg>`, 
        label: "Twitter" 
    },
    pixiv: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M7.483 0C3.35 0 0 3.35 0 7.483v9.034C0 20.65 3.35 24 7.483 24h9.034C20.65 24 24 20.65 24 16.517V7.483C24 3.35 20.65 0 16.517 0zm6.91 3.52c2.81 0 5.166 1.83 5.926 4.385.76 2.556.096 5.418-1.745 7.26a7.28 7.28 0 0 1-7.26 1.746 7.284 7.284 0 0 1-4.384-5.926c-.76-2.556-.096-5.418 1.745-7.26a7.284 7.284 0 0 1 5.718-2.205zm-3.23 11.238a4.896 4.896 0 0 0 4.39-.77 4.9 4.9 0 0 0 1.776-3.87 4.896 4.896 0 0 0-1.776-3.87 4.9 4.9 0 0 0-4.39-.77v9.28z"/></svg>`, 
        label: "Pixiv" 
    }
};

const grid = document.getElementById('artistGrid');
const filters = document.querySelectorAll('.filter-btn');
const sidePanel = document.getElementById('sidePanel');
const panelOverlay = document.getElementById('panelOverlay');
const closePanelBtn = document.getElementById('closePanel');
const panelContent = document.getElementById('panelContent');

function renderArtists(filterPlatform = "all") {
    grid.innerHTML = ""; 
    
    if (typeof artists === "undefined" || !artists.length) {
        grid.innerHTML = `<p style="text-align:center; color:#888;">No artists found. Add some inside artists.js!</p>`;
        return;
    }

    artists.forEach(artist => {
        if (filterPlatform !== "all" && !artist.socials[filterPlatform]) {
            return; 
        }
        
        let previewIconsHTML = "";
        for (let platform in artist.socials) {
            if (platformMap[platform]) {
                previewIconsHTML += `<span class="icon-wrap">${platformMap[platform].iconHTML}</span>`;
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

filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filters.forEach(b => b.classList.remove('active'));
        const targetBtn = e.currentTarget;
        targetBtn.classList.add('active');
        renderArtists(targetBtn.dataset.platform);
    });
});

function openSidePanel(artist) {
    let linksHTML = "";
    for (let [platform, url] of Object.entries(artist.socials)) {
        if (platformMap[platform]) {
            linksHTML += `
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
                    <span class="icon-wrap">${platformMap[platform].iconHTML}</span> 
                    <span>${platformMap[platform].label}</span>
                </a>
            `;
        }
    }

    const aliasesHTML = artist.aliases && artist.aliases.length > 0 
        ? `<div class="aliases">Also known as: ${artist.aliases.join(', ')}</div>` 
        : "";

    const imgName = artist.name.replace(/\s+/g, '');
    const imgSrc = `images/${imgName}.${artist.imageExt || 'png'}`;

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

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidePanel.classList.contains('open')) {
        closeSidePanel();
    }
});

// Initial Render
renderArtists("all");
