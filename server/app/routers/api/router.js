const express = require("express");

const router = express.Router();
const {  verifyToken } = require("../../services/auth");
/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

/* ************************************************************************* */
// route exemple avec item, salut jordan !
const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

/* ************************************************************************* */

const newsletterRouter = require("./newsletter/newsletterRouter");

router.use("/newsletter", newsletterRouter);

/* ************************************************************************* */

const adminRouter = require("./admin/adminRouter");

router.use("/admin", adminRouter);

/* ************************************************************************* */

const commentaireRouter = require("./commentaire/commentaireRouter");

router.use("/commentaire", commentaireRouter);

/* ************************************************************************* */

const userRouter = require("./user/userRouter");

router.use("/user", userRouter);

/* ************************************************************************* */

const dogRouter = require("./dog/dogRouter");

router.use("/dog", dogRouter);

/* ************************************************************************* */

const appointmentRequestRouter = require("./appointmentRequest/appointmentRequestRouter");

router.use("/appointmentRequest", appointmentRequestRouter);

/* ************************************************************************* */

const serviceRouter = require("./service/serviceRouter");

router.use("/service", serviceRouter);

/* ************************************************************************* */

const newsletterUserRouter = require("./newsletterUser/newsletterUserRouter");

router.use("/newsletterUser", newsletterUserRouter);

/* ************************************************************************* */

const seanceRouter = require("./seance/seanceRouter");

router.use("/seance", seanceRouter);

/* ************************************************************************* */

const calendarRouter = require("./calendar/calendarRouter");

router.use("/calendar", calendarRouter);

/* ************************************************************************* */

const seanceReportRouter = require("./seanceReport/seanceReportRouter");

router.use("/seanceReport", seanceReportRouter);

/* ************************************************************************* */

const authRouter = require("./auth/authRouter");

router.use("/login", authRouter);

/* ************************************************************************* */

const contactRouter = require("./contact/contactRouter");

router.use("/contact", contactRouter);

/* ************************************************************************* */

router.use(verifyToken);

module.exports = router;
