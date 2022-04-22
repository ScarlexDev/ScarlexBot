module.exports = async (scarlex: any, node: any, error: any) => {
    scarlex.logger.Logger(`Node "${node.options.identifier}" reconnected.`, "log");
}