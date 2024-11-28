import { Module, Provider } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const uuidProvider: Provider = {
  provide: 'UUID',
  useValue: uuid,
};

@Module({
  providers: [uuidProvider],
  exports: [uuidProvider],
})
export class CommonModule {}
