mp.events.add("entityDestroyed", entity => {
    if(entity.isAVehicle()){
        setTimeout(() => {
            entity.destroy();
        }, 20000);
    }
  });