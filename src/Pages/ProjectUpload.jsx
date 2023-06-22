import React, { useEffect } from "react";
import { useState } from "react";
import * as apiservice from "../services/apiservice";
import { useAppContext } from "../components/AppContext";
import { DashboardLayout } from "../layouts/dashboard";
import { useLoggedIn, useProtectionCondition } from "../hooks/useProtected";
import { useNavigate } from "react-router-dom";
import { constants } from "../utils";

export default function ProjectUpload() {
  useLoggedIn();

  const [appState] = useAppContext();

  const navigate = useNavigate();
  // allow only lecturers
  useProtectionCondition(
    (state) => state.userType !== constants.userTypes.lecturer,
    () => navigate(constants.routes.index)
  );

  return (
    <DashboardLayout title="View Uploaded Files">
      <div>
        <table>
          <thead>
            <tr>
              <th>Uploaded Project Files</th>
            </tr>
          </thead>
        </table>
      </div>
    </DashboardLayout>
  );
}
