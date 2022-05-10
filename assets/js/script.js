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

                    let textContainer = document.createElement("div");
                    textContainer.classList.add("textContainer");
                    let title = document.createElement("h2");
                    title.appendChild(document.createTextNode(data.data[i].title));
                    textContainer.appendChild(title);
                    let user = document.createElement("h3");
                    user.appendChild(document.createTextNode("uploaded by" + data.data[i].username));
                    textContainer.appendChild(user);
                    let date = document.createElement("h4");
                    date.appendChild(document.createTextNode("on " + data.data[i].import_datetime));
                    textContainer.appendChild(date);
                    gif.appendChild(textContainer);

                    let img = document.createElement("img");
                    let iconContainer = document.createElement("div");
                    iconContainer.classList.add("iconContainer");
                    img.src = data.data[i].images.preview_webp.url;
                    img.alt = data.data[i].title;
                    gif.appendChild(img);

                    let copyContainer = document.createElement("div");
                    copyContainer.classList.add("copyContainer");
                    let link = document.createElement("img");

                    let modal = document.createElement("div");
                    modal.classList.add("modal");
                    modal.classList.add("hidden");
                    modal.appendChild(document.createTextNode("L'agg copiat"));
                    copyContainer.appendChild(modal);

                    link.addEventListener("click", function (e) { 
                        e.preventDefault();
                        let text = data.data[i].url;
                        navigator.clipboard.writeText(text);
                        modal.classList.remove("hidden");
                        modal.classList.add("fadeIn");
                        setTimeout(function () {
                            modal.classList.add("fadeOut");
                            setTimeout(function () {
                                modal.classList.add("hidden");
                                modal.classList.remove("fadeIn");
                                modal.classList.remove("fadeOut");
                            }, 2000);
                        }, 2000);
                        
                        
                    });
                    link.src = "./assets/img/link.png";
                    copyContainer.appendChild(link);

                    let codeLink = document.createElement("a");
                    codeLink.href = data.data[i].url; 
                    codeLink.target = "_blank";
                    let codeContainer = document.createElement("div");
                    codeContainer.classList.add("codeContainer");
                    let code = document.createElement("img");
                    code.src = "./assets/img/code.png";
                    codeLink.appendChild(code);
                    codeContainer.appendChild(codeLink);

                    iconContainer.appendChild(copyContainer);
                    iconContainer.appendChild(codeContainer);
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