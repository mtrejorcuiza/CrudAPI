
import { ROLES } from '../../../config';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IArea extends mongoose.Document {     
    area: number;   
 }

 const AreaSchema = new Schema(
    {        
        area: {
            type: Number,
            unique: true,
            required: [true, 'area required']
        }
    }
    
 );

const Area = mongoose.model<IArea>("Area", AreaSchema);
export default Area;