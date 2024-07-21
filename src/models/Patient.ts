import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
    // title: string;
    // description: string;
    // completed: boolean;
    // userId: string;
    fullName: string;
    doctorId: string;
}

const patientSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
});

export const Patient = mongoose.model<IPatient>('Patient', patientSchema);

// Personal Information:

// Full name
// Date of birth
// Gender
// Contact information (phone number, email address)
// Medical Information:

// Medical history (existing conditions, past surgeries, allergies)
// Current medications
// Known allergies
// Primary care physician (if applicable)
// Insurance Information:

// Insurance provider
// Policy number
// Group number (if applicable)
// Emergency Contacts:

// Name
// Relationship
// Contact information
// Additional Details:

// Address (for demographic purposes and possibly for emergency services)
// Preferred language
// Ethnicity (for demographic purposes)
// Consent and Authorization:

// Agreement to terms of service and privacy policy
// Consent to receive communications (if applicable)
// Authorization for data usage as per legal requirements (e.g., HIPAA compliance)
// Security Information:

// Username
// Password (preferably secure and encrypted)
// Security questions (for password recovery)
// Optional Information:

// Occupation
// Height, weight (for BMI calculations)
// Lifestyle information (smoking status, exercise habits)
