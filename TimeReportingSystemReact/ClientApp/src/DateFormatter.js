const DateToYYYYMM = (date) => {
    const mm   = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = String(date.getFullYear())

    return `${yyyy}-${mm}`
}

const DateToYYYYMMDD = (date) => {
    const dd   = String(date.getDate()).padStart(2, '0')
    const mm   = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = String(date.getFullYear())

    return `${yyyy}-${mm}-${dd}`
}

export {
    DateToYYYYMM,
    DateToYYYYMMDD
};