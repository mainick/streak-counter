# `@mainick/ts-streak-counter` - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser 
(uses `localStorage`). 

## Install

```shell
npm add @mainick/ts-streak-counter
```

## Usage

[![Edit streak-counter (ts-course) (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/streak-counter-ts-course-forked-li3jq9?fontsize=14&hidenavigation=1&theme=dark)

```javascript
import {streakCounter} from "@mainick/ts-streak-counter"

const today = new Date();
const streak = streakCounter(localStorage, today);
// streak returns an object: 
// {
//    currentCount: 1.
//    startDate: "11/10/2022",
//    lastLoginDate: "11/10/2022"
// }
```