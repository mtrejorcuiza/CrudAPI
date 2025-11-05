
import { ROLES } from '../../../config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IArea extends mongoose.Document {     
    area: string;   
 }

 const AreaSchema = new Schema(
    {        
        area: {
            type: String,
            unique: true,
            required: [true, 'area required']
        }
    }
    
 );

const Area = mongoose.model<IArea>("Area", AreaSchema);
export default Area;