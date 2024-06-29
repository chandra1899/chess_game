import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { connectMongoDB } from '@/config/mongoose' 
import User from '@/models/user'
import bcrypt from 'bcryptjs'
import { AuthOptions } from 'next-auth'

interface Credentials {
    username: string;
    password: string;
  }

export const authOptions:AuthOptions={
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{},

            async authorize(credentials){
                const {email,password}:any =credentials
                console.log('email',email);
                // console.log('pass',password);
                
                try {
                    await connectMongoDB()
                    let user=await User.findOne({email})
                    if(!user) return null
                    const passwordmatch=await bcrypt.compare(password,user.password)
                    if(!passwordmatch) return null
                    // console.log(user);
                    
                    return user
                    
                } catch (error) {
                    console.log(error);
                    return null
                }
            }
        }),
        GoogleProvider({
              clientId: process.env.GOOGLE_CLIENID as string,
              clientSecret: process.env.GOOGLE_CLIENTSECRET as string,
        }) 
    ],
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/login'
    },
    callbacks: {
        async signIn({ user, account }:any) {
            // console.log('userdfg',user);
            // console.log('acctdf',account);
            // return user
            
          if (account.provider === "google") {
            // console.log('google');
            await connectMongoDB()
            let email=user.email
            let candidate=await User.findOne({email});
            if(candidate) return candidate;
            try {
                let newpass=await bcrypt.hash('jkdfg54345#$@%^#415335',12) 
                let person=await User.create({
                    name:user.name,
                    email:user.email,
                    password:newpass
                })
                // signUpMail.signUp(person.email)
                return person;
            } catch (err) {
                console.log("error in  creating user google passport",err);
                return null;
            }
            return null;
          }
          if (account.provider === "credentials") {
            // console.log('credentials');
            await connectMongoDB()
            return user
          }
        },
      }
}

const handler=NextAuth(authOptions)

export {handler as GET ,handler as POST}