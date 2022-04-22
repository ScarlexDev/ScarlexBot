module.exports = (scarlex: any, node: any): void => {
    scarlex.logger.Logger(`Node "${node.options.identifier}" connected.`, "ready");
}