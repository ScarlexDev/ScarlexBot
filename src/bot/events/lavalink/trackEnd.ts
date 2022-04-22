module.exports = async (scarlex: any, player: any, track: any, playload: any) => {

    const autoplay: any = player.get("autoplay")
    if (autoplay === true) {
        const requester: any = player.get("requester");
        const oldidentifier: any = player.get("identifier");
        const identifier: any = player.queue.current.identifier;
        const search: string = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
        const res: any = await player.search(search, requester);
		player.queue.add(res.tracks[2]);
    }
	
}