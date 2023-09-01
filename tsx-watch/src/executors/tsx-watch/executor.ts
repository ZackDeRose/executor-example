import { ExecutorContext } from '@nx/devkit';
import { TsxWatchExecutorSchema } from './schema';
import { execSync } from 'child_process';
import { join } from 'path';

export default async function runExecutor(
  options: TsxWatchExecutorSchema,
  ctx: ExecutorContext
) {
  console.log(JSON.stringify(ctx.projectsConfigurations, null, 2));

  execSync(`npx tsx ${options.fileName}`, {
    cwd: join(ctx.projectsConfigurations.projects[ctx.projectName].root, 'src'),
    stdio: 'inherit',
  });
  execSync(
    `nx watch --projects=${ctx.projectName} -- npx tsx ${options.fileName}`,
    {
      cwd: join(
        ctx.projectsConfigurations.projects[ctx.projectName].root,
        'src'
      ),
      stdio: 'inherit',
    }
  );
  return {
    success: true,
  };
}
