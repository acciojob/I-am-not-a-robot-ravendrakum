//your code here
document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    const h3 = document.getElementById('h');

    let state = 1;
    let selectedImages = [];

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function renderImages() {
      const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
      const repeatedClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];

      imageClasses.push(repeatedClass);

      shuffleArray(imageClasses);

      imageContainer.innerHTML = imageClasses.map((className) => {
        return `<img class="${className}" src="styles.css" onclick="handleImageClick('${className}')">`;
      }).join('');
    }

    function handleImageClick(className) {
      if (state === 1) {
        selectedImages = [className];
        state = 2;
        resetButton.classList.remove('hidden');
      } else if (state === 2) {
        if (!selectedImages.includes(className)) {
          selectedImages.push(className);
          state = 3;
          verifyButton.classList.remove('hidden');
        }
      }

      const clickedImages = document.querySelectorAll('.selected');
      clickedImages.forEach((img) => img.classList.remove('selected'));

      document.querySelector(`.${className}`).classList.add('selected');
    }

    function handleResetClick() {
      state = 1;
      selectedImages = [];
      resetButton.classList.add('hidden');
      verifyButton.classList.add('hidden');
      para.classList.add('hidden');
      const clickedImages = document.querySelectorAll('.selected');
      clickedImages.forEach((img) => img.classList.remove('selected'));
      renderImages();
    }

    function handleVerifyClick() {
      if (selectedImages[0] === selectedImages[1]) {
        para.innerHTML = 'You are a human. Congratulations!';
      } else {
        para.innerHTML = 'We can\'t verify you as a human. You selected the non-identical tiles.';
      }

      state = 4;
      verifyButton.classList.add('hidden');
      para.classList.remove('hidden');
    }

    renderImages();

    resetButton.addEventListener('click', handleResetClick);
    verifyButton.addEventListener('click', handleVerifyClick);
  });
