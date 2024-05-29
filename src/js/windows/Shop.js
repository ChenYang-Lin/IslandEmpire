


export default class Shop {
    constructor(scene) {
        this.scene = scene;

        this.isOpen = false;
        this.inAction = false;

        this.init();
    }

    init() {
        this.shopContainer = document.getElementById("shop-container");
    }

    openWindow() {
        if(this.inAction) 
            return
        this.isOpen = true;
        this.shopContainer.style.display = "block";
    }

    closeWindow() {
        if(this.inAction) 
            return
        this.isOpen = false;
        this.shopContainer.style.display = "none";
    }
}