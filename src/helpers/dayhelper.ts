interface DayToDate {
    error: boolean,
    date?: Date
}

export function dayToDate(day: number): DayToDate {
    const firstDay = 1624060800000
    const today = new Date()
    let date = new Date(firstDay)
    date.setDate(date.getDate() + (day))
    if (date > today){
        return { error: true }
    }
    else {
        return { error: false, date: date }
    }
}

export type { DayToDate }

