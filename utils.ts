// Used when storing in localStorage
export const KEY = 'streak'

export interface Streak {
  currentCount: number,
  startDate: string,
  lastLoginDate: string
}

export function formattedDate(date: Date) {
  // return date as 09/11/2022
  // other times it returns 08/11/2022, 12:00:00 AM
  // which is why we call the .split at the end
  date.setHours(1, 0, 0, 0);
  return date.toLocaleDateString('en-US')
}

export function buildStreak(date: Date, overrideDefaults?: Partial<Streak>): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date)
  }

  return {
    ...defaultStreak,
    ...overrideDefaults
  }
}

export function updateStreak(storage: Storage, streak: Streak): void {
  storage.setItem(KEY, JSON.stringify(streak))
}