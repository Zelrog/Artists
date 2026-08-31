const platformMap = {
    fa: { 
        iconHTML: `<i class="fa-solid fa-paw"></i>`, 
        label: "FurAffinity" 
    },
    e621: { 
        iconHTML: `<svg viewBox="0 0 24 24" width="1.15em" height="1.15em" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.2 2L17.8 2L23.5 12L17.8 22L6.2 22L0.5 12ZM17.2 9.4C17.2 7.5 15.9 6.2 12.7 6.2C9.4 6.2 6.8 8.8 6.8 12C6.8 15.9 9.4 17.9 12.7 17.9C15.3 17.9 17.2 16.6 17.2 14.6H14.6C14.6 15.3 14 15.9 12.7 15.9C10.7 15.9 9.4 14.6 9.4 12.7H17.2V9.4ZM9.4 10.7C9.4 9.4 10.7 8.1 12.7 8.1C14.6 8.1 14.6 9.4 14.6 10.7H9.4Z" /></svg>`, 
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

    const sortedArtists = [...artists].sort((a, b) => 
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );

    sortedArtists.forEach(artist => {
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
    let mainLinksHTML = "";
    let altLinksHTML = "";

    for (let [platform, urlData] of Object.entries(artist.socials)) {
        if (platformMap[platform]) {
            const urls = Array.isArray(urlData) ? urlData : [urlData];
            
            urls.forEach((url, index) => {
                const label = index === 0 ? platformMap[platform].label : `${platformMap[platform].label} (Alt)`;
                const linkHTML = `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
                        <span class="icon-wrap">${platformMap[platform].iconHTML}</span> 
                        <span>${label}</span>
                    </a>
                `;
                
                if (index === 0) {
                    mainLinksHTML += linkHTML;
                } else {
                    altLinksHTML += linkHTML;
                }
            });
        }
    }

    const aliasesHTML = artist.aliases && artist.aliases.length > 0 
        ? `<div class="aliases">Also known as: ${artist.aliases.join(', ')}</div>` 
        : "";

    // Info section processing: Convert \n back into HTML line breaks
    const infoHTML = artist.info 
        ? `<div class="artist-info">${artist.info.replace(/\n/g, '<br>')}</div>`
        : "";

    const imgName = artist.name.replace(/\s+/g, '');
    const imgSrc = `images/${imgName}.${artist.imageExt || 'png'}`;

    let alternateSection = "";
    if (altLinksHTML !== "") {
        alternateSection = `
            <hr class="alt-divider">
            <h3 class="alt-title">Alternate Accounts:</h3>
            <div class="social-links">
                ${altLinksHTML}
            </div>
        `;
    }

    // Safely replace the image with a styled Rat emoji div if it fails to load
    const fallbackHTML = `<div class=&quot;panel-image fallback-rat&quot;>🐀</div>`;

    panelContent.innerHTML = `
        <img src="${imgSrc}" alt="${artist.name}" class="panel-image" onerror="this.outerHTML='${fallbackHTML}';">
        <h2 class="title-font">${artist.name}</h2>
        ${aliasesHTML}
        ${infoHTML}
        <div class="social-links">
            ${mainLinksHTML}
        </div>
        ${alternateSection}
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
