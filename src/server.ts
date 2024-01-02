import { App } from '@/app';
import { AuthRoute } from '@/features/auth/auth.routes';
import { ValidateEnv } from '@/core/utils/validate-env';
import { BudgetRoute } from '@/features/budget/budget.routes';
import { HealthRoutes } from './features/health/health.routes';

ValidateEnv();

const app = new App([new AuthRoute(), new BudgetRoute(), new HealthRoutes()]);

app.listen();
