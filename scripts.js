
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

listaTag.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemovida = evento.target.parentElement;
        listaTag.removeChild(tagRemovida);
    }
})

const tags = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificarTags(tagTexto) {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve(tags.includes(tagTexto));
        }, 1000)
    })

}

inputTag.addEventListener("keypress", async (evento) => {
    if (evento.key == "Enter") {
        evento.preventDefault();
        const tagTexto = inputTag.value.trim();
        if (tagTexto != "") {
            try {
                const tagExiste = await verificarTags(tagTexto);
                if (tagExiste) {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = ` <p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTag.appendChild(newTag);
                    inputTag.value = "";
                } else {
                    alert("Tag não encontrada");
                }
            } catch (error) {
                console.error("Erro ao verificar a tag");
                alert("Erro ao verificar a existência tag");
            }
        }
    }
})



// ------------ Armazenar e Enviar Dados ---------------------

const botaoPubblicar = document.querySelector(".botao-publicar");



async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado")
            }
            else {
                reject("Projeto não publicado")
            }
        }, 2000)
    })

}

botaoPubblicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeProjeto = document.getElementById("nome").value;
    const descricaoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTag.querySelectorAll("p")).map((tag) => tag.textContent);

    try{
        const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu certo");
    }catch(error){
        console.log("Deu errado:", error);
        alert("Deu errado");
    }

})

//------------- Descartar dados ----------

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento)=>{

    //resetar o formulario 
    const formulario = document.querySelector("form");
    formulario.reset;

    //resetar a imagem
    imagemPrincipal.src = "./img/imagem1.png";
    nomeImagem.textContent = "imagem_projeto.png";

    //resetar tags
    listaTag.innerHTML = "";
})