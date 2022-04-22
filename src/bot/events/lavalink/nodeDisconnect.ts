module.exports = async (scarlex: any, node: any, reason: any) => {

	scarlex.logger.Logger(`Node "${node.options.identifier}" disconnect because ${reason}.`, "warn");

}