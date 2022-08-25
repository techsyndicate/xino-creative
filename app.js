document.querySelector('#submit').addEventListener('click',()=>{
    fetch('https://xino-creative.herokuapp.com/')
    .then((data) => {
        console.log(data);
    });
})