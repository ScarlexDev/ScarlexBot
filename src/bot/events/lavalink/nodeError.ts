module.exports = async (scarlex: any, node: any, error: any) => {

	scarlex.logger.Logger(`Node "${node.options.identifier}" encountered an error: ${error.message}.`, "error");

}