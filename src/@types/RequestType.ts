import Expense from "./Expense";
import User from "./User";

export default interface RequestType{
    _id: string
    code: string
    title: string
    status: string
    isOverLimit: boolean
    expenses: Expense[]
    user: {
        _id: string
        name: string
    }
    project: {
        _id: string
        code: string
        title: string
        limit: number
    }
}