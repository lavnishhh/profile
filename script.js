const languages = ['JavaScript', 'C', 'Python', 'C#', 'Dart', 'SQL']
const frameworks = ['React.js', 'Node.js', 'Flutter', 'JQuery', 'Firebase', 'Cloudera']
const software = ['Power BI', 'VSCode', 'Excel', 'Word', 'Postman', 'Unity', 'Blender']

let full = [].concat(languages, frameworks, software)

let current = {};

function setRandomText(child, index){
    let text = full[Math.floor(Math.random()*full.length)];
    while(Object.values(current).includes(text)){
        text = full[Math.floor(Math.random()*full.length)];
    }
    current[index] = text
    child.innerHTML = text
    child.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, 82.7%, 76.3%)`;

}

Array.from(document.querySelectorAll('.squares > div > div')).forEach(async (child, index) => {
    setRandomText(child, index)
    await new Promise((res)=>{setTimeout(res, index*3000/9)})
    setRandomText(child, index)
    setInterval(()=>{
        setRandomText(child, index)
        // child.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, 72.7%, 50.6%)`;
    }, 3000)
});

// document.getElementById().style.backgroundColor = 'hsv()'

let scrollPos = window.scrollY

window.addEventListener('scroll', (event)=>{
    document.querySelector('.scroll-hint').classList.toggle('hidden', true)
})


setInterval(()=>{
    if(window.scrollY == scrollPos){
        document.querySelector('.scroll-hint').classList.toggle('hidden', false)
    }
    scrollPos = window.scrollY
}, 2000)