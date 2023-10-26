import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit, UnitStatusEnum } from '@fazwaz-nx/nestjs-shared/utils/database';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}
  async getData(): Promise<{ units: Unit[] }> {
    const units: Unit[] = await this.unitRepository.find({
      select: ['clean_name', 'coordinates', 'unit_id', 'temps'],
      where: {
        status: UnitStatusEnum.ACTIVE,
      },
      take: 100,
    });
    return { units };
  }
}
