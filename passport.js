import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://google-authen.onrender.com/auth/google/callback",
      //https://google-authen.onrender.com
      //https://google-authen.onrender.com/auth/google/callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // let user = await User.findOne({ googleId: profile.id });

        // if (!user) {
        //   user = new User({
        //     googleId: profile.id,
        //     name: profile.displayName,
        //     email: profile.emails[0].value,
        //     photo: profile.photos[0].value,
        //   });
        //   await user.save();
        // }

        done(null, profile);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
