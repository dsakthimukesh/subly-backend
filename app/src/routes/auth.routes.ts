import { Router } from "express";
import { login, signup } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { createCustomer, getCustomers } from "../controller/customers.controller";
import { createPlan, getPlans } from "../controller/plans.controller";
import { createSubscription, getSubscriptions } from "../controller/subscriptions.controller";
import { getInvoices, payInvoice } from "../controller/invoices.controller";
import { getDashboard } from "../controller/dashboard.controller";
import { generateApiKey, getSettings, updateSettings } from "../controller/settings.controller";
import { apiKeyMiddleware } from "../middleware/apiKey.middleware";
import { getCustomerSubscription } from "../controller/external.controller";

const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);

router.get("/customers", authMiddleware, getCustomers);
router.post("/customers/create", authMiddleware, createCustomer);

router.post("/plans/create", authMiddleware, createPlan);
router.get("/plans", authMiddleware, getPlans);

router.post("/subscriptions/create", authMiddleware, createSubscription);
router.get("/subscriptions", authMiddleware, getSubscriptions);

router.get("/invoices", authMiddleware, getInvoices);
router.put("/invoices/manage/:id", authMiddleware, payInvoice);

router.get("/dashboard", authMiddleware, getDashboard);

router.get("/company", authMiddleware, getSettings);
router.put("/company/manage", authMiddleware, updateSettings);
router.post("/api-key", authMiddleware, generateApiKey);

router.get("/customer-subscription", apiKeyMiddleware, getCustomerSubscription);

export default router;