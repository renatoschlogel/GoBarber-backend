import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
