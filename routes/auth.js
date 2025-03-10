import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req.user);
    const token = jwt.sign({ id: req.user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.redirect(`https://www.vevekseetharaman.com/dashboard?email=${req.user.emails[0].value}`);
    // res.json({email: req.user.email})
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("https://www.vevekseetharaman.com/"));
});

export default router;
