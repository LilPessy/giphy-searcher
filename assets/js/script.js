let apiKey = "3KOEdGnS1P9ecAloVxqd4K3NBK5ht394";

let originalUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=";

let btn = document.querySelector(".btn");

btn.addEventListener("click", function(e){
    e.preventDefault();
    let input = document.querySelector(".form input[name=search]").value;
    let container = document.querySelector(".gifContainer");
    container.innerHTML = "";
    input.trim();
    if(input){
        let url = originalUrl + input;
        fetch(url).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            if(data.data.length > 0){
                for(let i = 0; i < data.data.length; i++){
                    let gif = document.createElement("div");
                    gif.classList.add("gif");
                    let img = document.createElement("img");
                    let iconContainer = document.createElement("div");
                    iconContainer.classList.add("iconContainer");
                    img.src = data.data[i].images.preview_webp.url;
                    gif.appendChild(img);
                    let link = document.createElement("img");
                    link.src = "./assets/img/link.png";
                    let code = document.createElement("img");
                    code.src = "./assets/img/code.png";
                    iconContainer.appendChild(link);
                    iconContainer.appendChild(code);
                    gif.appendChild(iconContainer);
                    container.appendChild(gif);
                }
            }else{
                let p = document.createElement("p");
                p.classList.add("error");
                p.innerHTML = "No results found";
                container.appendChild(p);
            }
        });
    }
})