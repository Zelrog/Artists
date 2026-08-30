const platformMap = {
    fa: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><circle cx="6" cy="9.5" r="2.5"/><circle cx="10" cy="5" r="2.5"/><circle cx="15.5" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M11.2 10.5C6 10.5 2 13 2 17C2 20.5 6.5 23 11.2 23L11.2 20L7.5 20L7.5 17.5L11.2 17.5L11.2 15.5L7.5 15.5L7.5 12.5L11.2 12.5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.8 10.5C18 10.5 22 13 22 17C22 20.5 17.5 23 12.8 23L12.8 20L14 20L15.5 16.5L18.5 16.5L20 20L21.5 20C21.5 17 19 13.5 17 12.5L12.8 12.5ZM17 13.5L16 15.5L18 15.5Z"/></svg>`, 
        label: "FurAffinity" 
    },
    e621: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22L19.5 13L18 8.5L22 2L14.5 5.5L12 4L9.5 5.5L2 2L6 8.5L4.5 13ZM12 17.5L16 12L14 9.5L10 9.5L8 12Z"/></svg>`, 
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
        iconHTML: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M18.8 4.67a7.02 7.02 0 0 0-11.45 2.1c-.74 2.47-.09 5.25 1.71 7.03.95.95 2.22 1.5 3.55 1.57v8.63h4.63v-9.15a6.97 6.97 0 0 0 3.22-1.92 7.06 7.06 0 0 0 1.69-7.04c-.49-1.63-1.66-2.93-3.35-3.22zm-2.82 8.35a4.7 4.7 0 0 1-4.25.75v-8.98a4.7 4.7 0 0 1 4.25.74 4.74 4.74 0 0 1 1.72 3.75 4.74 4.74 0 0 1-1.72 3.74z"/></svg>`, 
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
