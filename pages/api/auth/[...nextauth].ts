import NextAuth from "next-auth"
import authOptions from '@/cognito-auth'

export default NextAuth(authOptions)
