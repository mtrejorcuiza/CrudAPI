
import { ROLES } from '../../../config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICicloEscolar extends mongoose.Document {     
    cicloEscolar: string;   
 }

 const CicloEscolarSchema = new Schema(
    {        
        cicloEscolar: {
            type: String,
            unique: true,
            required: [true, 'cicloEscolar required']
        }
    }
    
 );

const CicloEscolar = mongoose.model<ICicloEscolar>("CicloEscolar", CicloEscolarSchema);
export default CicloEscolar;