const input = document.getElementById("upload");
const output = document.getElementById("ascii");

const chars = "@#W$9876543210?!abc;:+=-,._ ";

input.addEventListener("change", function () {

    const file = input.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const width = 150;
        const height = (img.height / img.width) * width;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const data = ctx.getImageData(0, 0, width, height).data;

        let ascii = "";

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                const i = (y * width + x) * 4;

                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const brightness = (r + g + b) / 3;

                const charIndex = Math.floor(
                    (brightness / 255) * (chars.length - 1)
                );

                ascii += chars[charIndex];
            }
            ascii += "\n";
        }

        output.textContent = ascii;
    };
});
