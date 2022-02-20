mp.events.add("entityDestroyed", entity => {
    if(entity.isVehicle()){
        setTimeout(() => {
            entity.destroy();
        }, 20000);
    }
  });