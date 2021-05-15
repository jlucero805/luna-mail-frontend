import parse from "../utils/dates"

test('parseTime', () => {
    expect(parse.parseTime("2021-04-30T07:18:41.247+00:00")).toEqual("Apr. 30 2021")
})

test('parseTitle', () => {
    expect(parse.parseTitle('hello')).toEqual('hello')
})