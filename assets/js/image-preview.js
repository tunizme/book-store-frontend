document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("product-image");
  const imagePreview = document.getElementById("image-preview");

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = "#";
      imagePreview.style.display = "none";
    }
  });
});
