import {JSDOM} from "jsdom"
import {formattedDate} from "../utils"
import {streakCounter} from "../index";

describe("with a pre-populated streak", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", {url: "https://localhost"});
    mockLocalStorage = mockJSDom.window.localStorage;

    //const date = new Date("11/09/2022")
    let previous = new Date()
    previous.setDate(previous.getDate() - 1)
    formattedDate(previous)
    streakCounter(mockLocalStorage, previous)
  })
  afterEach(() => {
    mockLocalStorage.clear()
  })

  it("should store the streak in localStorage", () => {
    const today = new Date()
    formattedDate(today)
    const streak = streakCounter(mockLocalStorage, today)

    let previous = new Date()
    previous.setDate(today.getDate() - 1)
    const previousFormatted = formattedDate(previous)
    expect(streak.startDate).toBe(previousFormatted)
  })

  it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
    const today = new Date()
    formattedDate(today)
    const streak = streakCounter(mockLocalStorage, today)

    expect(streak.hasOwnProperty('currentCount')).toBe(true)
    expect(streak.hasOwnProperty('startDate')).toBe(true)
    expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
  })

  it("should store the streak in localStorage", () => {
    const today = new Date()
    formattedDate(today)
    const key = 'streak'
    streakCounter(mockLocalStorage, today)

    const streakAsString = mockLocalStorage.getItem(key)
    expect(streakAsString).not.toBeNull()
  })

  it("should increment the streak", () => {
    const today = new Date()
    const dateFormatted = formattedDate(today)
    const streak = streakCounter(mockLocalStorage, today)

    expect(streak.currentCount).toBe(2)
    expect(streak.lastLoginDate).toBe(dateFormatted)
  })

  it("should not increment the streak when login days not consecutive", () => {
    const today = new Date("12/31/2022")
    const dateFormatted = formattedDate(today)
    const streak = streakCounter(mockLocalStorage, today)

    expect(streak.currentCount).toBe(1)
    expect(streak.lastLoginDate).toBe(dateFormatted)
  })

  it("save the increment streak to localStorage", () => {
    const key = 'streak'
    const today = new Date()
    formattedDate(today)
    streakCounter(mockLocalStorage, today)

    const streakAsString = mockLocalStorage.getItem(key)
    const streak = JSON.parse(streakAsString || "")

    expect(streak.currentCount).toBe(2)
  })

  it("should reset if not consecutive", () => {
    const today = new Date()
    formattedDate(today)
    const streak = streakCounter(mockLocalStorage, today)

    expect(streak.currentCount).toBe(2)

    const dateUpdated = new Date("12/31/2022")
    formattedDate(dateUpdated)
    const streakUpdated = streakCounter(mockLocalStorage, dateUpdated)

    expect(streakUpdated.currentCount).toBe(1)
  })

  it("should save the reset streak to localStorage", () => {
    const key = 'streak'
    const date = new Date("12/13/2022")
    formattedDate(date)
    streakCounter(mockLocalStorage, date)

    // Skip a day and break the streak
    const dateUpdated = new Date("12/15/2022")
    formattedDate(dateUpdated)
    streakCounter(mockLocalStorage, dateUpdated)

    const streakAsString = mockLocalStorage.getItem(key)
    const strask = JSON.parse(streakAsString || "")

    expect(strask.currentCount).toBe(1)
  })

  it("should not reset the streak for same-day login", () => {
    const date = new Date()
    formattedDate(date)
    streakCounter(mockLocalStorage, date)

    // Simulate same-day login
    const dateUpdated = new Date()
    formattedDate(dateUpdated)
    const streakUpdated = streakCounter(mockLocalStorage, dateUpdated)

    expect(streakUpdated.currentCount).toBe(1)
  })

})