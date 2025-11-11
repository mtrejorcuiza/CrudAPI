import { MateriaRoutes } from "./modules/materia/routes/materia.routes";
import { AreaRoutes } from "./modules/area/routes/area.routes";
import { UsuarioRoutes } from "./modules/usuario/routes/usuario.routes";

export class Routes {

    private usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();
    private areaRoutes: AreaRoutes = new AreaRoutes();
    private materiaRoutes: MateriaRoutes= new MateriaRoutes();

    public routes(app): void {
        this.usuarioRoutes.routes(app);
        this.areaRoutes.routes(app);
        this.materiaRoutes.routes(app);
    }
}