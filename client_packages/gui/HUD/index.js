var Admin = false;
const player = mp.local.player

mp.events.add("Change:Admin:Value:On:Client", (state) => {
   Admin = state;
});