languages = ['JavaScript', 'C', 'Python', 'C#', 'Dart', 'SQL']
frameworks = ['React.js', 'Node.js', 'Flutter', 'JQuery', 'Firebase', 'Cloudera']
software = ['Power BI', 'VSCode', 'Excel', 'Word', 'Postman', 'Unity', 'Blender']

full = [].concat(languages, frameworks, software)

Array.from(document.querySelectorAll('.squares > div > div')).forEach(async (child, index) => {
    child.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, 82.7%, 76.3%)`;
    child.textContent = full[Math.ceil(Math.random()*full.length)]
    await new Promise((res)=>{setTimeout(res, index*3000/9)})
    setInterval(()=>{
        child.textContent = full[Math.round(Math.random()*full.length)]
        child.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, 82.7%, 76.3%)`;
        // child.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, 72.7%, 50.6%)`;
    }, 3000)
});

// document.getElementById().style.backgroundColor = 'hsv()'
