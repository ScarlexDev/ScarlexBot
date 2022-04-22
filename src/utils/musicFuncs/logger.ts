import chalk from 'chalk';
const Logger = ( content , type) => {
		const date = Date.now()

		if( type = "log") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgBlue(type.toUpperCase())}] ${content}`);
		}else
		if( type = "warn") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgYellow(type.toUpperCase())}] ${content}`);
		}else
		if( type = "error") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgRed(type.toUpperCase())}] ${content}`);
		}else
		if( type = "debug") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgGreen(type.toUpperCase())}] ${content}`);
		}else
		if( type = "cmd") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgWhite(type.toUpperCase())}] ${content}`);
		} else
		if( type = "event") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgWhite(type.toUpperCase())}] ${content}`);
		} else if( type = "ready") {
			return console.log(`[${chalk.gray(date)}]: [${chalk.black.bgBlueBright(type.toUpperCase())}] ${content}`);
		} //else if (type )
		//default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
	}

	module.exports = {
		Logger
	}