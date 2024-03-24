let mode = 'static'

//block random text
const languages = ['JavaScript', 'C', 'Python', 'C#', 'Dart', 'SQL']
const frameworks = ['React.js', 'Node.js', 'Flutter', 'JQuery', 'Firebase', 'Cloudera']
const software = ['Power BI', 'VSCode', 'Excel', 'Word', 'Postman', 'Unity', 'Blender']

let full = [].concat(languages, frameworks, software)

let current = {};

function setRandomText(child, index) {
    let text = full[Math.floor(Math.random() * full.length)];
    while (Object.values(current).includes(text)) {
        text = full[Math.floor(Math.random() * full.length)];
    }
    current[index] = text
    child.innerHTML = text
    child.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, 82.7%, 76.3%)`;

}

//assign block text

Array.from(document.querySelectorAll('.squares > div > div')).forEach(async (child, index) => {
    setRandomText(child, index)
    await new Promise((res) => { setTimeout(res, index * 3000 / 9) })
    setRandomText(child, index)
    setInterval(() => {
        setRandomText(child, index)
    }, 3000)
});


//scroll hint
let scrollPos = window.scrollY
window.addEventListener('scroll', (event) => {
    document.querySelector('.scroll-hint').classList.toggle('hidden', true)
})


setInterval(() => {
    if (window.scrollY == scrollPos) {
        if(mode == 'interactive'){
            return
        }
        document.querySelector('.scroll-hint').classList.toggle('hidden', false)
    }
    scrollPos = window.scrollY
}, 2000)

document.querySelector('.scroll-hint').firstElementChild.addEventListener('click', ()=>{
    window.scrollBy(0, 600)
})

//unity
document.querySelector('#button-interactive').addEventListener('click', () => {
    runUnity()
})

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
}

function runUnity() {
    document.querySelector('.scroll-hint').classList.toggle('hidden', true)
    mode = 'interactive'
    document.getElementById("canvas-holder").classList.remove('hidden')
    document.body.style.overflowY = 'hidden'
    // document.querySelector(".intro-description").style.visibility = 'hidden'
    document.getElementById("canvas-holder").style.zIndex = 1;
    unityInstance = createUnityInstance(document.querySelector("#graphic"), {
        dataUrl: "unity/Build/unity.data",
        frameworkUrl: "unity/Build/unity.framework.js",
        codeUrl: "unity/Build/unity.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "My project",
        productVersion: "0.1",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    });
}

function exitGame() {
    mode = 'static'
    unityInstance = null;
    document.getElementById("canvas-holder").classList.add('hidden')
    //reset context 3D -> 2D
    document.body.style.overflowY = 'scroll'
}

//pre start game
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('interactive') == "true") {
    runUnity()
};


//projects
ignore = ['profile-new', 'tshirt-qr-url', 'neonite']

document.querySelector('#button-projects-extra').addEventListener('click', ()=>{
    document.querySelector('#project-list-extra').parentElement.classList.toggle('hidden')
    document.querySelector('#button-projects-extra').parentElement.scrollIntoView()
})

const githubToken = 'API_KEY_PLACEHOLDER';

fetch('https://api.github.com/users/lavnishhh/repos?sort="created"', {
    headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36",
        "Authorization":`token ${githubToken}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching projects');
        }
        console.log(response)
        return response.json();
    })
    .then(data => {
        count = 0;
        let project_list = '#project-list'
        Array.from(data).forEach((project, index)=>{

            if(ignore.includes(project)){
                return
            }

            count ++
            let element_string = '<div class=" justify-between flex flex-col text-center aspect-square bg-white text-black p-5 w-1/3 border-2 border-black"></div>'
            
            if(count>9){
                project_list = '#project-list-extra'
                element_string = '<div class=" justify-between flex flex-col text-center aspect-square bg-white text-black p-5 w-1/3 md:w-1/5 border-2 border-black"></div>'
            }
            

            projectElement = fromHTML(element_string)
            projectElement.innerHTML = `<div>${project.name}</div><div class=" bg-red-500 rounded-full" style="font-size:0.7rem; background-color: hsl(${Math.floor(Math.random() * 255)}, 82.7%, 76.3%)">${project.language}</div>`
            // const languageElements = fromHTML('<div class="flex flex-wrap"></div>')
            // projectElement.appendChild(languageElements)

            document.querySelector(project_list).appendChild(projectElement)

            // fetch(project.languages_url,{
            //     headers: {
            //         'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36",
            //         "Authorization":"token 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"
            //     }
            // }).then(response => {
            //     if(!response.ok){
            //         throw new Error("Error fetching language")
            //     }
                
            //     response.json().then(data => {
            //         Object.entries(data).forEach(entry=>{
            //             const [language, lines] = entry;
            //             languageElements.appendChild(fromHTML(`<div>${language}</div>`))
            //         })
            //     })
            // })
        })
    })
    .catch(error => {
        console.error('Error fetching projects:', error);
    });

    
function fromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}