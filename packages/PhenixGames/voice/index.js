const debug = require('../../../_assets/json/debug/debug.json').voice;

mp.events.add("add_voice_listener", (player, target) =>
{
	if(target)
	{
		player.enableVoiceTo(target);
	}
});

mp.events.add("remove_voice_listener", (player, target) =>
{
	if(target)
	{
		player.disableVoiceTo(target);
	}
});