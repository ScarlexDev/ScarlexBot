module.exports = async (player: any, payload: any) => {

	if (payload.byRemote == true) {
        player.destroy();
    }

    console.log(`Socket has been closed because ${payload.reason} in [${player.guild}]`, "error");

}