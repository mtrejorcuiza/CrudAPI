
import { ROLES } from '../../../config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICarrera extends mongoose.Document {     
    carrera: string;   
 }

 const CarreraSchema = new Schema(
    {        
        carrera: {
            type: String,
            unique: true,
            required: [true, 'carrera required']
        }
    }
    
 );

const Carrera = mongoose.model<ICarrera>("Carrera", CarreraSchema);
export default Carrera;