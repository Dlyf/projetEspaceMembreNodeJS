import { Router } from 'express';
import HomeController from '../controllers/home.js';
import registerController, { PostRegisterController } from '../controllers/register.js';
import LoginController, {LogoutController, PostLoginController} from '../controllers/login.js';
import { authGuard, setTemplateVars } from '../middlewares/sessions.js';

const appRouter = Router()

appRouter.use(setTemplateVars)

appRouter.get('/dashboard', HomeController);
appRouter.get('/register', registerController);
appRouter.post('/register', PostRegisterController);
appRouter.get('/login', LoginController)
appRouter.post('/login', PostLoginController);
appRouter.get('/logout', LogoutController);
export default appRouter;
