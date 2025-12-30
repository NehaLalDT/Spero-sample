# HIPAA-Compliant Patient Management Frontend

This repository contains a **HIPAA-aligned React frontend** for a clinical patient management system. The application is designed to comply with the **HIPAA Security Rule technical safeguards** when deployed with a properly configured backend and infrastructure.

> ⚠️ **Important**  
> HIPAA compliance is **system-wide**. This frontend implements required client-side protections but **must be paired with a HIPAA-compliant backend, hosting environment, and legal agreements**.

---

## 🔐 HIPAA Compliance Scope

This application follows HIPAA best practices for:

- Access control
- Minimum necessary data exposure
- Secure session handling
- PHI transmission safeguards
- Audit-readiness (frontend support)

The frontend **does not store or persist PHI** and relies on secure server-side enforcement.

---

## ✅ Implemented HIPAA Safeguards

### 1. Access Control
- No user identifiers stored in `localStorage` or `sessionStorage`
- Authentication handled via **HTTP-only secure cookies**
- Identity and role validation enforced server-side

### 2. Minimum Necessary Rule
- Patient list view displays **non-PHI metadata only**
- Clinical data accessed only through protected routes
- Explicit user action required to view patient records

### 3. Secure Data Transmission
- All API requests use `POST`
- No PHI transmitted via URLs or query parameters
- Caching disabled for sensitive requests

### 4. PHI Leakage Prevention
- Browser caching disabled
- No PHI written to logs or client storage
- No automatic preloading of sensitive data

### 5. Audit Support
- Explicit navigation required to access patient records
- Backend can log:
  - User ID
  - Patient ID
  - Timestamp
  - Action performed

---

## 🧱 Architecture Overview

```
React Frontend
   |
   |  HTTPS (POST only)
   |
HIPAA-Compliant API
   |
Encrypted Database
```

The frontend is treated as an **untrusted client**. All authorization and filtering are enforced server-side.

---

## 📁 Key Files

| File | Description |
|------|------------|
| `PatientsPage.js` | HIPAA-aligned patient list view |
| `PatientDetailsPage.js` | Protected PHI view |
| `api/` | Backend services (external) |

---

## 📄 Required API Contract

### List Assigned Patients

**Endpoint**
```
POST /api/patients/list
```

**Request**
```json
{
  "task": "listAssignedPatients"
}
```

**Response**
```json
{
  "patients": [
    {
      "patientId": "PAT-10291",
      "status": "Active",
      "lastUpdated": "2025-01-12T18:45:00Z"
    }
  ]
}
```

> ❗ Backend **must not return PHI** for list views.

---

## 🔧 Required Backend & Infrastructure Controls

This frontend assumes the following are in place:

- HIPAA-compliant authentication provider
- Business Associate Agreement (BAA)
- Encrypted database and backups
- TLS encryption
- Role-Based Access Control (RBAC)
- Immutable audit logs
- Automatic session expiration
- Incident response plan

---

## 🚫 What This App Does NOT Do

- Store PHI locally
- Trust client-provided user IDs
- Fetch all patient records
- Expose PHI in URLs
- Cache sensitive data

---

## ⚠️ Legal Disclaimer

This software is provided as a **technical implementation example**. HIPAA compliance depends on organizational, legal, and operational controls in addition to software.

Consult legal and compliance professionals before production use.

---

**Status:** HIPAA-aligned frontend  
**Intended Use:** Regulated healthcare applications
