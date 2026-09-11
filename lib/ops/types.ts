export type EmbassyHoliday = {
  date: string; // YYYY-MM-DD
  label: string;
  createdAt: string;
  createdBy: string;
};

export type AppointmentDayDensity = {
  date: string;
  count: number;
  isHoliday: boolean;
  holidayLabel?: string;
};
