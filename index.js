window.onload = function() {
    Particles.init(options);
};

const options = {
    selector: '.background',
    speed: 0.2,
    maxParticles: 100,
    connectParticles: true,
    sizeVariations: 0,
    minDistance: 150,
    breakpoint: 768,
    color: ["#ffffff","#ffffff"],
    responsive: [{
        breakpoint: 700,
        options: {
            maxParticles: 80,
            minDistance: 130
        }
    },{
        breakpoint: 600,
        options: {
            maxParticles: 60,
            minDistance: 120
        }
    }, {
        breakpoint: 425,
        options: {
            maxParticles: 50,
            minDistance: 100
        }
    }, {
        breakpoint: 320,
        options: {
            maxParticles: 40,
            minDistance: 70
        }
    }]
};


