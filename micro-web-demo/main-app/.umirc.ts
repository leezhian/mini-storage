import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  qiankun: {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:3000'
        },
        {
          name: 'app2',
          entry: '//localhost:8080',
        },
      ],
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
});
