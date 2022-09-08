import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointment-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("should be able to create an appointment", async () => {
    const appointmentsRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: startsAt,
        endsAt: endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const appointmentsRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
