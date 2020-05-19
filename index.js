class Gallery {
  constructor() {
    this.photos = null;
    this.page = { start: 0, limit: 15 };
    this.addListeners();
    this.fetchPhotos();
  }
  async fetchPhotos() {
    let photos = await axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_start=${this.page.start}&_limit=${this.page.limit}`
      )
      .then((x) => x.data)
      .catch(function (error) {
        alert("Что-то сломалось");
      });
    this.appendPhotos(photos);
    this.photos = photos;
  }
  appendPhotos(photos) {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    photos.map(function (x, index) {
      let div = document.createElement("div");
      let src = `url(${x.thumbnailUrl})`;
      div.style.backgroundImage = src;
      div.id = index;
      div.className = "gallery-card";
      gallery.appendChild(div);
    });
  }
  changePage(x) {
    switch (x) {
      case "next":
        this.page.start += 10;
        this.fetchPhotos();
        break;
      case "prev":
        if (this.page.start === 0) return;
        this.page.start -= 10;
        this.fetchPhotos();
      default:
        break;
    }
  }
  openModal(index) {
    document.getElementById("commentTxt").innerHTML = "";
    document.getElementById("commentsInput").value = "";
    document.getElementById("lightbox").classList.toggle("isVisible");
    document.getElementById(
      "lightbox-img"
    ).style.backgroundImage = `url(${this.photos[index].url})`;
    document.getElementById("likeBtn").className = "lightbox-likeBtn-inactive";
  }
  addListeners() {
    let likebtn = document.getElementById("likeBtn");
    document.getElementById("prevBtn").onclick = () => this.changePage("prev");
    document.getElementById("nextBtn").onclick = () => this.changePage("next");
    document.getElementById("gallery").onclick = (e) => {
      this.openModal(e.target.id);
    };
    likebtn.onclick = function () {
      likebtn.classList.toggle("lightbox-likeBtn-active");
      likebtn.classList.toggle("lightbox-likeBtn-inactive");
    };
    document.getElementById("closeBtn").onclick = () =>
      document.getElementById("lightbox").classList.toggle("isVisible");
    document.getElementById("changeComment").onclick = function () {
      let txt = document.getElementById("commentsInput").value;
      document.getElementById("commentTxt").innerHTML = txt;
    };
  }
}
let gallery = new Gallery();
