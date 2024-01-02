let filters = document.querySelectorAll("ul li input");
let staurate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload  = document.getElementById("upload");  
let download = document.getElementById("download");
let img = document.getElementById("img");
let reset = document.querySelector("span");
let imgBox = document.querySelector("#img-box");

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")



function resetValues(){
    img.style.filter = "none"
    staurate.value = "100";
    contrast.value = "100"
    brightness.value = "100"
    sepia.value = "0"
    grayscale.value = "0"
    blur.value = "0"
    hueRotate.value = "0"
}
window.onload = ()=>{
    download.style.display = "none"
    reset.style.display = "none"
    imgBox.style.display = "none"
}
upload.onchange = ()=>{
    resetValues()
    download.style.display = "block"
    reset.style.display = "block"
    imgBox.style.display = "block";
    let photo = new FileReader();
    photo.readAsDataURL(upload.files[0]);
    photo.onload = ()=>{
        img.src = photo.result;
    }
    img.onload  = ()=>{ 
        canvas.width = img.width;
        canvas.height = img.height
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display = "none"
    }
}
filters.forEach((filter)=>{
    filter.addEventListener("input",()=>{
        ctx.filter = `
            saturate(${staurate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);

    })
})
download.onclick = ()=>{
    download.href = canvas.toDataURL()
}