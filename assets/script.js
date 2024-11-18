async function loadData() {
    const response = await fetch("./assets/data.json");
    const data = await response.json();
    const {
        collection_elle,
        collection_fouta,
        collection_home,
        collection_tout_doux_sacoches,
        collection_tout_doux_sac_polochon
    } = data;

    createPhotoGallery("galerie_container_elle", collection_elle);
    createPhotoGallery("galerie_container_fouta", collection_fouta);
    createPhotoGallery("galerie_container_home", collection_home);
    createPhotoGallery("galerie_container_tout_doux_sacoches", collection_tout_doux_sacoches);
    createPhotoGallery("galerie_container_tout_doux_sac_polochon", collection_tout_doux_sac_polochon);

    setupModal();
}

function createPhotoGallery(containerId, items) {
    const container = document.getElementById(containerId);

    if (!container || items.length === 0) return;

    const galleryWrapper = document.createElement("div");
    galleryWrapper.classList.add("gallery-wrapper");

    items.forEach(item => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.label;
        img.classList.add("gallery-image");

        img.addEventListener("click", () => openModal(item.image, item.title));

        const title = document.createElement("h3");
        title.innerText = item.title;

        const price = document.createElement("p");
        price.innerText = item.price;

        galleryItem.appendChild(img);
        galleryItem.appendChild(title);
        galleryItem.appendChild(price);
        galleryWrapper.appendChild(galleryItem);
    });

    container.appendChild(galleryWrapper);
}

function setupModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img class="modal-image" src="" alt="Image en grand">
            <h3 class="modal-title"></h3>
        </div>
    `;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".close-button");
    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function openModal(imageSrc, imageTitle) {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");

    modalImage.src = imageSrc;
    modalTitle.innerText = imageTitle;

    modal.classList.add("open");
}

function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("open");
}

// Initialize the script
loadData();
