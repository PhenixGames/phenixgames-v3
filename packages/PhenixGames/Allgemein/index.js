mp.events.add("entityDestroyed", entity => {
    if(entity.isAVehicle()){
        entity.destroy();
    }else {
        console.log("kein Fahrzeug");
    }
  });