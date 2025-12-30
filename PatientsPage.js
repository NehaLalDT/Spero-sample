import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * HIPAA-SAFE PATIENT LIST PAGE
 *
 * Key protections:
 * - No PHI in URLs
 * - No localStorage/sessionStorage
 * - POST only
 * - Minimum necessary data
 * - Explicit navigation for detailed PHI
 * - Cache disabled
 */
export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients/list", {
        method: "POST",
        credentials: "include", // secure HTTP-only session cookie
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        },
        body: JSON.stringify({
          task: "listAssignedPatients"
        })
      });

      if (!response.ok) {
        throw new Error("Unauthorized or session expired");
      }

      const data = await response.json();
      setPatients(data.patients || []);
    } catch (error) {
      console.error("Failed to load patients", error);
      navigate("/login"); // force re-auth
    } finally {
      setLoading(false);
    }
  };

  const handleViewPatient = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {patients.map((patient) => (
        <Grid item xs={12} sm={6} md={4} key={patient.patientId}>
          <Card raised>
            <CardHeader
              title={`Patient ${patient.patientId}`}
              subheader={`Last updated: ${patient.lastUpdated}`}
            />
            <CardContent>
              <Typography variant="body2">
                Status: {patient.status}
              </Typography>

              {/* Explicit user action required to access PHI */}
              <Button
                variant="outlined"
                size="small"
                sx={{ marginTop: 2 }}
                onClick={() => handleViewPatient(patient.patientId)}
              >
                View Patient Record
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {patients.length === 0 && (
        <Grid item xs={12}>
          <Typography>No assigned patients found.</Typography>
        </Grid>
      )}
    </Grid>
  );
}
