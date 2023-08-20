import { DocumentBuilder } from '@nestjs/swagger';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Template } from 'src/modules/template/entity/template.entity';
import { SwaggerTheme } from 'swagger-themes';
const theme = new SwaggerTheme('v3');

export const ApiTokenOptions = {
  swaggerOptions: {},
  explorer: true,
  customCss: theme.getBuffer('dark'),
};

export const ApiSwaggerOptions = new DocumentBuilder()
  .setTitle('Template API')
  .setDescription('Template API documantation')
  .setVersion('1.0')
  .addBearerAuth(
    {
      name: 'defaultBearerAuth',
      description: 'Default',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'auth-token',
  )
  .build();

export const ApiDocModules = {
  include: [Admin, Template],
};
