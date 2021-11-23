import passport from 'passport';
import { config } from 'dotenv';
import { User } from '../db/models';

// var GoogleTokenStrategy = require('passport-google-token').Strategy;

config()


const getProfile = (googleId) => {

    const id = googleId.payload.sub;
    const displayName = googleId.payload.name;
    const email = googleId.payload.email;
    const provider = 'google';
    if (email?.length) { // equals to =>> if (email && email.length)
        return {
            googleId: id,
            name: displayName,
            email,
            provider
        }


    }

    return null
}
// passport.use(new GoogleTokenStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,

// }, async (parsedToken, googleId, profile, done) => {


//     console.log("isi profile", profile)
//     try {
//         const existingGoogleAccount = await User.findOne({
//             where: { googleId: profile.id },
//         });

//         if (!existingGoogleAccount) {

//             const existingEmailAccount = await User.findOne({
//                 where: { email: getProfile(profile).email }
//             })


//             if (!existingEmailAccount) {

//                 const newAccount = await User.create(getProfile(profile))
//                 return done(null, newAccount)
//             }


//             return done(null, existingEmailAccount)
//         }

//         return done(null, existingGoogleAccount)

//     } catch (error) {
//         throw new Error(error)
//     }

// }))

var GoogleTokenStrategy = require('passport-google-id-token');
 
passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  async (googleId, profile, done) => {

        try {
            console.log("peler", googleId)
            const existingGoogleAccount = await User.findOne({
                where: { googleId: profile },
            });
    
            if (!existingGoogleAccount) {
    
                const existingEmailAccount = await User.findOne({
                    where: { email: getProfile(googleId).email }
                })
    
    
                if (!existingEmailAccount) {
    
                    const newAccount = await User.create(getProfile(googleId))
                    return done(null, newAccount)
                }
    
    
                return done(null, existingEmailAccount)
            }
    
            return done(null, existingGoogleAccount)
    
        } catch (error) {
            throw new Error(error)
        }
    
    }));


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user, done) =>{
    User.findByPk(id).then((user)=> {
        done(null, user);
    }).catch((error) => done(error))

})