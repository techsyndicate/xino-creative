
const algoget = ()=>{
    fetch("https://xino-creative.herokuapp.com/").then(async (data) => {
        data = await data.json();
        console.log(data)
        let [x,y,z] = data
        var i = `
        Your optimal electricty usage is Mains to Lights - ${x} units <br>
        Mains to Thermal Regulators - ${y} units <br>
        Mains to Cooking Appliances - ${z} units <br>
        Solar to Lights = (${10-x}) <br>
        Solar to Thermal = (${20-y}) <br>
        Solar to Cooking = (${15-z})<br>
        `
        document.querySelector('.optimize-info').innerHTML = i;
    });
};
