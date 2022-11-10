import {formattedDate} from "./utils";

interface Streak {
  currentCount: number,
  startDate: string,
  lastLoginDate: string
}

// Used when storing in localStorage
const KEY = 'streak'

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime())
  const differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return differenceInDays
}

function shouldIncrementOrResetStreakCount(currentDate: Date, lastLoginDate: string): 'increment' | 'reset' | 'none' {
  let nextDate = new Date(lastLoginDate)
  nextDate.setHours(1, 0, 0, 0);
  //const difference = differenceInDays(currentDate, nextDate)
  const difference = currentDate.getDate() - parseInt(lastLoginDate.split("/")[1])
  // Same-day login, do nothing
  if (difference === 0) {
    return 'none'
  }
  // This means they logged in the day after the currentDate
  if (difference === 1) {
    return 'increment'
  }
  // Otherwise they logged in after a day, which would
  // break the streak
  return 'reset'
}

export function streakCounter(storage: Storage, date: Date): Streak {
  const streakInLocalStorage = storage.getItem(KEY)
  if (streakInLocalStorage) {
    try {
      const streakSaved: Streak = JSON.parse(streakInLocalStorage || "")
      const state = shouldIncrementOrResetStreakCount(date, streakSaved.lastLoginDate)
      const SHOULD_INCREMENT = state === "increment"
      const SHOULD_RESET = state === "reset"

      if (SHOULD_INCREMENT) {
        const updatedStreak: Streak = {
          ...streakSaved,
          currentCount: streakSaved.currentCount + 1,
          lastLoginDate: formattedDate(date)
        }
        storage.setItem(KEY, JSON.stringify(updatedStreak))
        return updatedStreak
      }

      if (SHOULD_RESET) {
        const updatedStreak: Streak = {
          currentCount: 1,
          startDate: formattedDate(date),
          lastLoginDate: formattedDate(date)
        }
        storage.setItem(KEY, JSON.stringify(updatedStreak))
        return updatedStreak
      }
    }
    catch (error) {
      console.error("Failed to parse streak from localStorage")
    }
  }

  let streak: Streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date)
  }
  storage.setItem(KEY, JSON.stringify(streak))

  return streak
}