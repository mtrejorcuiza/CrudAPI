import { Request, Response } from 'express';
import * as _ from 'lodash';
import Area from '../models/area.model';
import { DEFAULT_PASSWORD } from '../../../config';

export class AreaController {
    crearArea = (req: Request, res: Response) => {        
        const nuevaArea = new Area(
            {               
                area: req.body.area               
            }
        );
        nuevaArea.save()
        .then(areaCreada => {
            res.status(201).json(
                {
                    ok: true,
                    area: areaCreada,
                    message: 'Área creada'
                }
            );
        })
        .catch(error => {
           res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    obtenerAreas = (req: Request, res: Response) => { 
        Area.find()
        .then(areas => {
            res.status(200).json(
                {
                    ok: true,
                    areas: areas
                }
            );
        })
        .catch(error => {
            return res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    actualizarArea = (req: Request, res: Response) => { 
        const area = _.pick(req.body, 'area');        
        Area.findByIdAndUpdate(req.params.id, area)
        .then(async areaActualizada => {                                   
            res.status(200).json({
                ok: true,
                area: areaActualizada,                    
                message: 'Área Actualizada'
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        });
    }

    eliminarArea = (req: Request, res: Response) => {
        Area.findByIdAndDelete(req.params.id)
        .then(areaEliminada => {
            res.status(200).json({
                ok: true,                                 
                message: 'Área Eliminada'
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                error: error.name,
                message: error.message
            });
        })
    }    
}