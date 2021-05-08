const parseTime = (time) => {
    const newTime = time.split('T')[0].split('-')
    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
    let res = ''
    res += month[Number(newTime[1]) - 1]
    res += ` ${newTime[2]} `
    res += newTime[0]
    return res
}

const parseTitle = title => {
    if (title.length > 15) {
        let newTitle = title.slice(0, 12)
        if (newTitle[newTitle.length - 1] === ' ') {
            newTitle = title.slice(0, 11)
        }
        return newTitle + "..."
    } else {
        return title
    }
}

export default {parseTime, parseTitle}