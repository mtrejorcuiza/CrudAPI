
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IMateria extends mongoose.Document {     
    materia: string;   
    creditos: number;
 }

 const MateriaSchema = new Schema(
    {        
        materia: {
            type: String,
            unique: true,
            required: [true, 'materia required']

        },
        creditos: {
            type: Number,
            required: [true,'creditos required']
        }
    }
    
 );

const Materia = mongoose.model<IMateria>("Materia", MateriaSchema);
export default Materia;