const inglesinaGallery = () => {
  Fancybox.bind("[data-gallery] a", {
    groupAll: true,
  })
}

document.addEventListener('DOMContentLoaded', function () {
  inglesinaGallery()
})
