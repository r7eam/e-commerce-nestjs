
  import { SetMetadata } from '@nestjs/common';
  import { UserRole } from '../../users/entites/user.entity';
  
  export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);