const gallery = document.querySelectorAll('img.popout'); // yea I based this off of our worksheet

for (let index = 0; index < gallery.length; index++) {
    const element = gallery[index];
    element.addEventListener('click', expand);
}

function expand(event) {
    console.log("Clicked!"); // make sure it's actually registering
    const smallImage = event.currentTarget; // get current element clicked

    if (smallImage.classList.contains('big')) { // if the image is already big, shrink it
        console.log("Shrinking image:", smallImage);
        smallImage.classList.remove('big');
        smallImage.classList.add('small');
    } else {
        const bigImage = document.querySelector(".big"); // get the currently big image
        if (bigImage) {
            bigImage.classList.remove('big'); // remove the big class from it
            bigImage.classList.add('small'); // and add the small class
        }
        smallImage.classList.remove('small'); // remove the small class
        smallImage.classList.add('big'); // and add the big class
    }

    const generatedText = smallImage.nextElementSibling.querySelector('.generated'); // tldr: if it has the generated class reveal the hidden text of the image selected
    if (generatedText) {
        generatedText.hidden = !generatedText.hidden; // make it not hidden anymore :)
    }
}
