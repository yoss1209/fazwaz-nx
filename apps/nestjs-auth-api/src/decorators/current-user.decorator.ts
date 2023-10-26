import { User } from '@fazwaz-nx/nestjs-shared/utils/database';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext): User => {
     return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) =>
     getCurrentUserByContext(context),
);
