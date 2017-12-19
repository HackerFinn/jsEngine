var GameObject = function (name, position, sprite) {
    this.name = name;
    this.position = position;
    var img = new Image;
    img.src = sprite;
    this.sprite = img;
};