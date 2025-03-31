export default interface Expense{
    _id: string,
    image: string,
    value: number,
    description: number,
    user: {
        _id: string,
        name: string
    },
    date: string,
    type: string,
}