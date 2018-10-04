
const API_URL = 'https://rallycoding.herokuapp.com/api/music_albums';

const main = document.getElementById('root');

const articleDataHTML = (data) => {
  return `
    <div class="album">
        <img class="logo-image" src="${data.thumbnail_image}" />
        <h2>${data.title}</h2>
        <p>${data.artist}</p>
        <img src="${data.image}"" />
    </div>
  `;
};

const loadAlbums = async () => {
  try {
    const response = await fetch(API_URL);
    const characters = await response.json();

    main.innerHTML = characters.map(articleDataHTML).join('\n');
  } catch (err) {
    console.error(err);
  }
};

loadAlbums();
