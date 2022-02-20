mp.events.add("vehicleDeath", (vehicle) => {
    setTimeout(() =>{
        vehicle.destroy()
    },10000);
    
});