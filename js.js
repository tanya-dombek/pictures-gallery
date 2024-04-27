const startBtn = document.querySelector(".start-btn");
const wrap = document.querySelector(".wrap");

const url = "https://api.thecatapi.com/v1/images/search?limit=10";

const fetchData = async () => {
    try {
        showLoader();
        let data = await fetch(url);
        let response = await data.json();
        if (response) {
            startLoadingImages(response);
        }
    } catch (error) {
        console.error(error.message);
    } finally {
        hideLoader();
    }
};

function createIcon() {
    const iconElement = document.createElement('i');
    iconElement.classList.add('fa', 'fa-circle-o-notch', 'fa-spin');
    startBtn.appendChild(iconElement);
}

function showLoader() {
    startBtn.innerText = 'Loading';
    createIcon();
}
  
function hideLoader() {
    startBtn.textContent = 'Click to load pictures';
}

function startLoadingImages(data) {
    let i = 0;
    const chunkSize = 50;
  
    function insertImagesChunk() {
      let end = Math.min(i + chunkSize, data.length);
      do {
        let elem = `<img src=${data[i].url}></img>`;
        wrap.innerHTML += elem;
        i++;
      } while (i < end);
  
      if (i < data.length) {
        setTimeout(insertImagesChunk, 0);
      }
    }
  
    insertImagesChunk();
}

startBtn.addEventListener("click", fetchData);


