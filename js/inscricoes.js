const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos(){
    try{
        const busca = await fetch("http://localhost:3000/inscritos");
        const videos = await busca.json();

            videos.forEach((video)=> {
                if(video.categoria == ""){
                    throw new Error('Vídeo não tem categoria');
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                <img class = ".videos__item" src = "${video.url}>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              ${video.titulo}
                            </button>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                            <div class="accordion-body">
                             ${video.descricao}
                            </div>
                          </div>
                        
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
            })
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}


buscarEMostrarVideos();


const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item");

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    } else {
        for(let video of videos){
            video.style.display = "block";
        }
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}

function reiniciaPagina(){
  window.location.reload();
}

const logo_Img = document.querySelector(".logo__item")
logo_Img.addEventListener("click" , () => reiniciaPagina());

const btnInicio = document.getElementById("botaoInicio")
btnInicio.addEventListener("click", () => reiniciaPagina());


const darkMode = document.querySelector(".cabecalho__switch-input");

darkMode.addEventListener("change", () => {
    document.documentElement.classList.toggle("light");
});

const botaoAvatar = document.querySelector(".cabecalho__avatar");
const offcanvas = document.querySelector(".offcanvas");
const botaoFechar = document.querySelector(".btn-close");

botaoAvatar.addEventListener("click", (event) => {
    event.preventDefault(); 
    
    
    offcanvas.classList.toggle("show");
    offcanvas.classList.toggle("offcanvas-end");
});


botaoFechar.addEventListener("click", () => {
    offcanvas.classList.remove("show"); 
});
