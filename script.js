const upload = document.getElementById("upload");
const ascii = document.getElementById("ascii");
const contrastSlider = document.getElementById("contrast");
const sizeSlider = document.getElementById("size");

const chars = " .,:;i1tfLCG08@";

let image = new Image();

upload.addEventListener("change", e => {
    const file = e.target.files[0];
    image.src = URL.createObjectURL(file);
});

image.onload = generate;

contrastSlider.oninput = generate;
sizeSlider.oninput = generate;

function generate() {

    if (!image.src) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = sizeSlider.value;
    const height = image.height / image.width * width * 0.55;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    const data = ctx.getImageData(0, 0, width, height).data;

    let result = "";

    const contrast = contrastSlider.value;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const i = (y * width + x) * 4;

            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];

            let gray = (0.299*r + 0.587*g + 0.114*b);

            gray = ((gray - 128) * contrast) + 128;

            gray = Math.max(0, Math.min(255, gray));

            const index = Math.floor(
                (gray / 255) * (chars.length - 1)
            );

            result += chars[index];
        }
        result += "\n";
    }

    ascii.textContent = result;
}
