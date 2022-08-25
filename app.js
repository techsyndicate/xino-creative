const algoget = ()=>{
    fetch("https://xino-creative.herokuapp.com/").then(async (data) => {
        data = await data.json();
        console.log(data)
        let [x,y,z] = data
        var i = `
        Your optimal electricty usage is Mains to Lights - ${x} units 
        Mains to Thermal Regulators - ${y} units 
        Mains to Cooking Appliances - ${z} units 
        Solar to Lights = (${10-x}) 
        Solar to Thermal = (${20-y}) 
        Solar to Cooking = (${15-z})
        `
        document.querySelector('.opitmize-info').innerText = i
    });
};
