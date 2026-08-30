const platformMap = {
    fa: { 
        iconHTML: `<i class="fa-solid fa-paw"></i>`, 
        label: "FurAffinity" 
    },
    e621: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1.15em" height="1.15em"><defs><mask id="e621-mask-item"><path fill="white" d="M 11 4.5 L 17.5 8.5 L 17.5 10 Q 21 9 23 8 Q 21 13 17.5 14.5 L 17.5 16.5 L 11 20.5 L 4.5 16.5 L 4.5 8.5 Q 5 5 7 1.5 Q 8.5 4 9.5 5.5 L 11 4.5 Z"/><path fill="black" d="M 11 18 C 7.5 18 5 15.5 5 12 C 5 8.5 7.5 6 11 6 C 14.5 6 17 8.5 17 12 C 17 12.5 17 13 17 13 L 7 13 C 7.5 15 9 16 11 16 C 12.5 16 13.5 15.5 14.5 14 L 16.5 15 C 15 17 13.5 18 11 18 Z"/><path fill="white" d="M 15 11.5 C 14.5 9 13 8 11 8 C 9 8 7.5 9 7.2 11.5 Z"/></mask></defs><rect width="24" height="24" fill="currentColor" mask="url(#e621-mask-item)" /></svg>`, 
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
        iconHTML: `<i class="fa-brands fa-pixiv"></i>`, 
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
