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
    const token = jwt.sign({ id: req.user._id }, "your_jwt_secret", { expiresIn: "1h" });
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("http://localhost:5173/"));
});

export default router;
