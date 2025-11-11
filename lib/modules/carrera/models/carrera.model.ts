
import { ROLES } from '../../../config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICarrera extends mongoose.Document {     
    carrera: string;
    duracion: number;
 }

 const CarreraSchema = new Schema(
    {        
        carrera: {
            type: String,
            unique: true,
            required: [true, 'carrera required']
        },
        duracion: {
            type: Number,            
            required: [true, 'duracion required']
        }
    }
    
 );

const Carrera = mongoose.model<ICarrera>("Carrera", CarreraSchema);
export default Carrera;