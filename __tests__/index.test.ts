import {JSDOM} from "jsdom"
import {formattedDate} from "../utils"
import {streakCounter} from "../index";

describe("with a pre-populated streak", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", {url: "https://localhost"});
    mockLocalStorage = mockJSDom.window.localStorage;

    const date = new Date("11/09/2022")
    formattedDate(date)
    streakCounter(mockLocalStorage, date)
  })
  afterEach(() => {
    mockLocalStorage.clear()
  })

  it("should store the streak in localStorage", () => {
    const today = new Date()
    formattedDate(today)
    const streak = streakCounter(mockLocalStorage, today)

    expect(streak.startDate).toBe("11/9/2022")
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
    const dateFormatted = formattedDate(today)
    streakCounter(mockLocalStorage, today)

    const streakAsString = mockLocalStorage.getItem(key)
    const streak = JSON.parse(streakAsString || "")

    expect(streak.currentCount).toBe(2)
  })

})