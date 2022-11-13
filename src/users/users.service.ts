import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OnModuleInit } from '@nestjs/common';

import { UserEntity } from '@users/user.entity';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';

@QueryService(UserEntity)
export class UsersService
  extends TypeOrmQueryService<UserEntity>
  implements OnModuleInit
{
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    super(repo);
  }

  async onModuleInit() {
    const [user] = await this.query({
      filter: { email: { eq: 'super.admin@tryadvocate.com' } },
      paging: { limit: 1 },
    });

    if (!user) {
      await this.createOne({
        email: 'super.admin@tryadvocate.com',
        password: 'Advocate@123',
        firstName: 'Super',
        lastName: 'Admin',
      });
      console.info('Admin just created!!!!');
    }
  }
}
