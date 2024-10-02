
//----------Upload de imagem------------
const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

const imagemPrincipal = document.querySelector('.main-imagem')
const nomeImagem = document.querySelector('.container-imagem-nome')

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})


inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeImagem.textContent = conteudoDoArquivo.nome;
        }
        catch (erro) {
            console.error('Erro na leitura do arquivo');
        }
    }
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });// deu certo a leitura
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`); // deu erro a leitura
        }

        leitor.readAsDataURL(arquivo);


    })
}

//--------Adicionar e Remover Tag-----------

const inputTag = document.getElementById("input-tag")
const listaTag = document.querySelector(".lista-tags")


inputTag.addEventListener("keypress", (evento) => {
    if (evento.key == "Enter") {
        evento.preventDefault();
        const textoTag = inputTag.value.trim();
        if (textoTag != "") {
            const newTag = document.createElement("li");
            newTag.innerHTML = ` <p>${textoTag}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTag.appendChild(newTag);
            inputTag.value = "";
        }
    }
})

listaTag.addEventListener("click", (evento) =>{
    if(evento.target.classList.contains("remove-tag")){
        const tagRemovida = evento.target.parentElement;
        listaTag.removeChild(tagRemovida);
    }
})

const tags = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificarTags(tagTexto) {

    return Promise((resolve)=>{

        setTimeout(()=>{
            resolve(tags.includes(tagTexto));
        }, 1000)
    })
    
}








