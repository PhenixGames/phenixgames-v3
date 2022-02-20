mp.events.add("entityDestroyed", entity => {
    if(entity.isAVehicle()){
        console.log("destroyed")
        entity.destroy();
    }else {
        console.log("kein Fahrzeug");
    }
  });
