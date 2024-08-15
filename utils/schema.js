import { pgTable, serial, text, varchar  } from "drizzle-orm/pg-core";

 const MockInterview=pgTable("mockinter",{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition', { length: 256 }).notNull(),
    jobDesc:varchar('jobDesc', { length: 256 }).notNull(),
    jobExperiance:varchar('jobExperiance', { length: 256 }).notNull(),
    createdBy:varchar('createdBy', { length: 256 }).notNull(),
    createdAt:varchar('createdAt', { length: 256 }).notNull(),
    mockId:varchar('mockId', { length: 256 }).notNull()
})

export const userans=pgTable("userans",{
    id:serial("id").primaryKey(),
    mockIdRef:varchar("mockId", { length: 256 }).notNull(),
    correctAns:varchar("correctAns").notNull(),
    question:varchar("question").notNull(),
    userAns:text("userAns"),
    feedback:text("feedback"),
    rating:varchar("rating", { length: 256 }),
    userEmail:varchar("userEmail", { length: 256 }),
    createdAt:varchar("createdAt", { length: 256 })
})
export default MockInterview;