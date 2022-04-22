import mongoose from 'mongoose';
import config from '../../config';




  async function connectDB() {
		await mongoose.connect("mongodb://admin:QY22PZEPOTRXFVZY@dono-03.danbot.host:1792/?authSource=admin")
		 mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
		 mongoose.connection.once('open', function() {
		 	console.log('Connected to MongoDB');
		 });
}

export default connectDB;